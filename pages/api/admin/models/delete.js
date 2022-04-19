import { connectToDatabase, client } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
export default async function deleteModel(req, res) {
  try {
    const { db } = await connectToDatabase();
    const id = req.body.id;
    await db.collection('models').deleteOne({ _id: ObjectId(id) });
    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
