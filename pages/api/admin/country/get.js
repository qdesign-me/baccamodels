import { connectToDatabase, buildQuery } from 'hooks/useMongodb';

export default async function countryGet(req, res) {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection('regions').findOne({ _id: req.body.id });
    return res.status(200).json({ status: 'ok', data });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
