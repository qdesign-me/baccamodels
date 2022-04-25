import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';

export default async function Get(req, res) {
  try {
    const { db } = await connectToDatabase();
    const requestType = req.body.requestType;
    switch (requestType) {
      case 'one': {
        const data = await db.collection('modelevents').findOne({ _id: ObjectId(req.body.id) });

        return res.status(200).json({ status: 'ok', data });
      }
      default: {
        const data = await buildQuery(db, 'modelevents', req.body, ['model', 'country', 'status', 'img']);
        return res.status(200).json({ status: 'ok', data });
      }
    }
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
