import data from '../../../data';

export default function modelsAPI(req, res) {
  try {
    const requestType = req.query.slug;

    switch (requestType) {
      case 'profile': {
        const { country, grid, profile } = req.body;

        const model = data[country].models[grid].find((m) => m.slug === `/${country}/${grid}/${profile}`);
        const info = data[country].info;
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
    res.status(404).json({ status: 'error' });
  }
}
