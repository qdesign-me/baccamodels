import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

export default async function modelsAPI(req, res) {
  try {
    const { db } = await connectToDatabase();
    const requestType = req.body.requestType;

    switch (requestType) {
      case 'one': {
        const data = await db.collection('users').findOne({ _id: ObjectId(req.body.id) });
        return res.status(200).json({ status: 'ok', data });
      }
      default: {
        const data = await buildQuery(db, 'users', req.body, ['name', 'role', 'region', 'status', 'email', 'phone']);
        return res.status(200).json({ status: 'ok', data });
      }
    }
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
