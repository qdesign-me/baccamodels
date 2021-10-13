import data from '../../../data';

export default function modelsAPI(req, res) {
  try {
    const [countrySlug, requestType] = req.query.slug;
    const country = data[countrySlug];
    switch (requestType) {
      case 'women':
      case 'development':
      case 'talent':
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
            models: country.models[requestType],
          },
        });
      case 'info':
        country.latest.map((latest) => {
          const model = country.models.find((model) => model.id === latest.model);
          if (!model) return {};
          latest.name = model.name;
          latest.slug = `/${countrySlug}/${model.slug}`;
        });
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
            latest: country.latest,
            introtext: country.introtext,
          },
        });
    }
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
