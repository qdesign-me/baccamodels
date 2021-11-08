import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
export default async function deleteUser(req, res) {
  try {
    const { db } = await connectToDatabase();

    const data = await db.collection('users').deleteOne({ _id: ObjectId(req.body.id) });
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
