import { connectToDatabase } from 'hooks/useMongodb';
import formidable from 'formidable';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import sharp from 'sharp';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function modelsAPI(req, res) {
  const prepareUrl = (url) => url.toLowerCase().replace(/ /g, '-');
  try {
    let form = formidable({ multiples: true });
    const { db } = await connectToDatabase();

    await form.parse(req, async (err, fields, files) => {
      const unid = Date.now();
      const id = fields.id;
      const slug = `/${fields['region']}/${fields['category']}/${prepareUrl(fields['name'])}`;
      const newData = {
        name: fields['name'],
        slug: slug,
        img: fields['img'],
        category: fields['category'],
        country: fields['country'],
        status: fields['status'],
        region: fields['region'],
        private: {
          city: fields['private.city'],
          country: fields['private.country'],
          agency: fields['private.agency'],
          dob: fields['private.dob'],
          phone: fields['private.phone'],
          email: fields['private.email'],
        },
        profile: {
          social: {
            instagram: fields['profile.social.instagram'],
            facebook: fields['profile.social.facebook'],
            vk: fields['profile.social.vk'],
          },
          params: {
            Height: fields['profile.params.height'],
            Hair: fields['profile.params.hair'],
            Eyes: fields['profile.params.eyes'],
            Bust: fields['profile.params.bust'],
            Waist: fields['profile.params.waist'],
            Hips: fields['profile.params.hips'],
            Shoes: fields['profile.params.shoes'],
          },
          book: [],
          polaroids: [],
          videos: [],
          img: '/images/russia/models/1/book/1.jpg',
        },
      };
      console.log(id);
      console.log('updating', await db.collection('models').replaceOne({ _id: ObjectId(id) }, newData));
      return res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' } });
    });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
