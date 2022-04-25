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
        const adjastResults = async (collection, results) => {
          return await Promise.all(
            results.map(async (result) => {
              const findModel = async (id) => {
                const model = await db.collection('models').findOne({ status: 'Active', _id: ObjectId(id) }, { projection: { profile: 0, private: 0 } });

                return model.name;
              };
              result.name = await findModel(result.model);
              return result;
            })
          );
          return results;
        };
        const data = await buildQuery(db, 'modelevents', req.body, ['title', 'country', 'status', 'added', 'name'], adjastResults);

        return res.status(200).json({ status: 'ok', data });
      }
    }
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
