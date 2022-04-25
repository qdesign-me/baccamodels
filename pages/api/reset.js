import { connectToDatabase } from 'hooks/useMongodb';
import sendEmail from 'hooks/useMail';
import { createPassword } from 'hooks/auth';
export default async function deleteUser(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.body.action === 'send') {
      const user = await db.collection('users').findOne({ email: req.body.email });

      if (user && user.status !== 'Active') {
        return res.status(200).json({ status: 'error', message: 'User is disabled' });
      }
      if (!user) {
        return res.status(200).json({ status: 'error', message: 'User not found' });
      }

      const resetToken = Date.now();

      user.resetToken = resetToken;

      const newData = {
        resetToken,
      };

      await db.collection('users').updateOne({ email: req.body.email }, { $set: newData });

      const origin = process.env.HOST;

      const resetUrl = `${origin}/auth/reset?token=${resetToken}`;

      const html = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;

      await sendEmail(`${process.env.MAIL_USERNAME} Password Recovery`, html);

      return res.status(200).json({ status: 'ok', message: `Email was successfully sent` });
    }
    if (req.body.action === 'reset') {
      const resetToken = +req.body.token;
      const user = await db.collection('users').findOne({ resetToken: resetToken });
      if (!user) {
        return res.status(200).json({ status: 'error', message: 'Token not found, try to reset your password again' });
      }
      const password = createPassword(req.body.password);
      const newData = {
        password,
        resetToken: '',
      };

      await db.collection('users').updateOne({ resetToken: resetToken }, { $set: newData });
      return res.status(200).json({ status: 'ok', message: `Email was successfully sent` });
    }
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
