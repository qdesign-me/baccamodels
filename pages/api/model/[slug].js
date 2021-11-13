import { connectToDatabase, buildQuery } from 'hooks/useMongodb';

export default async function modelsAPI(req, res) {
  try {
    const { db } = await connectToDatabase();
    const requestType = req.query.slug;

    switch (requestType) {
      case 'all': {
        const data = await buildQuery(db, 'models', req.body, ['name', 'region', 'category']);

        return res.status(200).json({ status: 'ok', data });
      }
      case 'profile': {
        const { country, grid, profile } = req.body;
        const slug = `/${country}/${grid}/${profile}`;
        const model = await db.collection('models').findOne({ slug, status: 'Active' });

        const info = (await db.collection('regions').findOne({ _id: country }, { projection: { info: true } })).info;
        if (model.profile?.cover) {
          if (model.profile.cover.startsWith('/images')) model.profile.img = model.profile.cover;
          if (model.profile.cover.startsWith('/video')) model.profile.video = model.profile.cover;
        }

        return res.status(200).json({ status: 'ok', data: { model, info } });
      }
      case 'byids': {
        const { ids, country } = req.body;

        const all = [...data[country].models['women'], ...data[country].models['development'], ...data[country].models['talent']];
        const models = all
          .filter((model) => ids.includes(model.id))
          .map((model) => {
            return { slug: model.slug, name: model.name, img: model.img };
          });
        return res.status(200).json({ status: 'ok', data: { models } });
      }
      case 'byname': {
        const { search, country } = req.body;

        const all = [...data[country].models['women'], ...data[country].models['development'], ...data[country].models['talent']];
        const models = all
          .filter((model) => model.name.toLowerCase().includes(search.toLowerCase()))
          .map((model) => {
            return { slug: model.slug, name: model.name, img: model.img };
          });
        return res.status(200).json({ status: 'ok', data: { models } });
      }
    }
  } catch (error) {
    console.log('error', error);
    res.status(404).json({ status: 'error' });
  }
}
