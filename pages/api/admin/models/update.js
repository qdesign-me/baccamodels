import { connectToDatabase } from 'hooks/useMongodb';
export default async function updateModel(req, res) {
  try {
    const { db } = await connectToDatabase();
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
