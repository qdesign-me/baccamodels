import data from '../../../data';

export default function modelsAPI(req, res) {
  try {
    const [countrySlug, requestType] = req.query.slug;
    const country = data[countrySlug];
    switch (requestType) {
      case 'home':
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
          },
        });
      case 'become':
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
            ...country.become,
          },
        });
      case 'about':
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
            text: country.texts.about,
          },
        });
      case 'contacts':
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
            contacts: country.contacts,
          },
        });
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
          const model = [...country.models.women, ...country.models.development, ...country.models.talent].find((model) => model.id === latest.model);
          if (!model) return {};
          latest.name = model.name;
          latest.slug = model.slug;
        });
        return res.status(200).json({
          status: 'ok',
          data: {
            info: country.info,
            latest: country.latest,
            text: country.texts.intro,
          },
        });
    }
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
