import { connectToDatabase } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
export default async function add(req, res, prefix) {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection('modelnotes').deleteOne({ _id: ObjectId(req.body.id) });
    res.status(200).json({ status: 'ok', message: 'Note was removed' });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
