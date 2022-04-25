import { connectToDatabase } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
export default async function modelsAPI(req, res) {
  try {
    const [countrySlug, requestType] = req.query.slug;

    const { db } = await connectToDatabase();

    let country;
    let data;

    switch (requestType) {
      case 'home':
        country = await db.collection('regions').findOne({ _id: countrySlug }, {});
        return res.status(200).json({
          status: 'ok',
          data: {
            ...country,
          },
        });
      case 'become':
        data = await db.collection('regions').findOne({ _id: countrySlug }, { projection: { info: 1, 'pages.become': 1 } });
        return res.status(200).json({
          status: 'ok',
          data,
        });
      case 'about':
        data = await db.collection('regions').findOne({ _id: countrySlug }, { projection: { info: 1, 'pages.about': 1 } });
        return res.status(200).json({
          status: 'ok',
          data,
        });
      case 'contacts':
        data = await db.collection('regions').findOne({ _id: countrySlug }, { projection: { info: 1, 'pages.contacts': 1 } });

        return res.status(200).json({
          status: 'ok',
          data,
        });
      case 'women':
      case 'development':
      case 'talent':
      case 'boys':
      case 'girls':
        country = await db.collection('regions').findOne({ _id: countrySlug }, { projection: { info: 1, [`pages.${requestType}`]: 1 } });
        console.log({ region: countrySlug, category: requestType, status: 'Active' });
        const all = await db
          .collection('models')
          .find({ region: countrySlug, category: requestType, status: 'Active' }, { projection: { profile: 0, private: 0 } })
          .sort({ name: 1 })
          .limit(1000)
          .toArray();
        return res.status(200).json({
          status: 'ok',
          data: {
            page: country.pages[requestType],
            info: country.info,
            models: all,
          },
        });
      case 'info':
        data = await db.collection('regions').findOne(
          { _id: countrySlug },
          {
            projection: { info: 1, 'pages.home': 1 }, //aggregate: [{ $lookup: { from: 'models', localField: 'modelId', foreignField: '_id', as: 'myCustomResut' } }]
          }
        );
        const temp = await db.collection('modelevents').find({ country: countrySlug, status: 'Active' }).limit(1000).toArray();

        const events = await Promise.all(
          temp.map(async (event) => {
            const findModel = async (id) => {
              const model = await db.collection('models').findOne({ status: 'Active', _id: ObjectId(id) }, { projection: { profile: 0, private: 0 } });

              return model;
            };
            event.modelData = await findModel(event.model);
            return event;
          })
        );

        data.events = events;
        const models = await db
          .collection('models')
          .find({ region: countrySlug, status: 'Active', featured: 'Yes' }, { projection: { profile: 0, private: 0 } })
          .sort({ name: 1 })
          .limit(1000)
          .toArray();

        data.featured = models;
        return res.status(200).json({
          status: 'ok',
          data,
        });
    }
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
