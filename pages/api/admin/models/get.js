import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
export default async function getModel(req, res) {
  try {
    const { db } = await connectToDatabase();
    const requestType = req.body.requestType;

    switch (requestType) {
      case 'one': {
        const data = await db.collection('models').findOne({ name: 'Adele Ruboneka' });
        console.log(req.body.id, data, requestType);
        return res.status(200).json({ status: 'ok', data });
      }
      default: {
        const data = await buildQuery(db, 'models', req.body, ['name', 'region', 'category']);
        return res.status(200).json({ status: 'ok', data });
      }
    }
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
