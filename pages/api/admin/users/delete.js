import { connectToDatabase } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
import fs from 'fs';
export default async function deleteUser(req, res) {
  try {
    const { db } = await connectToDatabase();

    const id = ObjectId(req.body.id);
    const clean = await db.collection('users').findOne({ _id: id });
    const oldFile = `${process.cwd()}/public${clean.img}`;
    if (fs.existsSync(oldFile)) {
      fs.unlinkSync(oldFile);
    }
    const data = await db.collection('users').deleteOne({ _id: id });
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log('error', error);
    res.status(404).json({ status: 'error' });
  }
}
