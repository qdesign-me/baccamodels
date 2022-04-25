import { connectToDatabase } from 'hooks/useMongodb';

export default async function add(req, res, prefix) {
  try {
    const { db } = await connectToDatabase();

    const data = await db.collection('modelnotes').find({ model: req.body.id }).sort({ added: -1 }).toArray();

    res.status(200).json({ status: 'ok', data });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
