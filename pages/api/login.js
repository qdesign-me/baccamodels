import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const { db } = await connectToDatabase();
    const found = await db.collection('users').findOne({ email: credentials.username });

    if (!found) return res.status(200).json({ status: 'error', message: 'Wrong password or email' });

    if (!comparePassword(password, found.password)) return res.status(200).json({ status: 'error', message: 'Wrong password or email' });

    const user = { id: found._id.toString(), email: found.email, name: found.name, img: found.img, region: found.region, role: found.role, status: found.status };\

    var token = jwt.sign(user, process.env.SECRET);

    console.log(token)


    // Set Cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('mytoken', token, {
        httpOnly: false,
        secure: false,//process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })
    );

    res.status(200).json({ user});
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
