import { connectToDatabase } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';
export default async function add(req, res, prefix) {
  try {
    const { db } = await connectToDatabase();
    const session = await getToken({
      req,
      secret: process.env.SECRET,
    });

    if (!session) throw new Exception('User not found');
    const userId = session.user.id;
    const found = await db.collection('users').findOne({ _id: ObjectId(userId) });
    const newData = {
      name: found.name,
      avatar: found.img,
      comment: req.body.comment,
      added: Date.now(),
      model: req.body.id,
    };
    db.collection('modelnotes').insertOne(newData);

    res.status(200).json({ status: 'ok', message: 'Note was added' });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
