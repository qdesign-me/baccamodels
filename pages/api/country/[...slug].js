import { connectToDatabase } from 'hooks/useMongodb';

export default async function modelsAPI(req, res) {
  try {
    const [countrySlug, requestType] = req.query.slug;

    const { db } = await connectToDatabase();

    let country;
    let data;

    switch (requestType) {
      case 'home':
        country = await db.collection('regions').findOne({ _id: countrySlug }, { projection: { info: 1 } });
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
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
        country = await db.collection('regions').findOne({ _id: countrySlug }, { projection: { info: 1 } });
        const all = await db
          .collection('models')
          .find({ country: countrySlug, category: requestType, active: true }, { projection: { profile: 0 } })
          .limit(1000)
          .toArray();
        return res.status(200).json({
          status: 'ok',
          data: {
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
        const countrymodels = await db
          .collection('models')
          .find({ region: countrySlug, active: true }, { projection: { profile: 0 } })
          .limit(1000)
          .toArray();

        data.pages.home.latest.map((latest) => {
          const model = countrymodels.find((model) => model._id == latest._id);
          if (!model) return {};
          latest.name = model.name;
          latest.slug = model.slug;
        });
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
