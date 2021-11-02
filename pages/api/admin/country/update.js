import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function modelsAPI(req, res) {
  try {
    let form = formidable({ multiples: true });
    const { db } = await connectToDatabase();

    await form.parse(req, async (err, fields, files) => {
      console.log(fields, files);

      const action = fields.action;
      const id = fields.id;
      if (action === 'Become a Model') {
        const text = fields.text;
        const file = files.newfile;
        let cover = fields.cover;
        if (file) {
          cover = `/images/${id}/${file.newFilename}_${file.originalFilename}`;
          const target = `${process.cwd()}/public${cover}`;
          await fs.rename(file.filepath, target, function (err) {
            if (err) console.log('error uploading', err);
          });
        }
        await db.collection('regions').update({ _id: id }, { $set: { 'pages.become': { text, cover } } });
      }
      if (action === 'General Information') {
        const instagram = fields.instagram.replace('https://', '');
        const facebook = fields.facebook.replace('https://', '');
        const vk = fields.vk.replace('https://', '');
        const file = files.newfile;
        let cover = fields.cover;
        if (file) {
          cover = `/video/${id}/${file.newFilename}_${file.originalFilename}`;
          const target = `${process.cwd()}/public${cover}`;
          await fs.rename(file.filepath, target, function (err) {
            if (err) console.log('error uploading', err);
          });
        }
        await db.collection('regions').update(
          { _id: id },
          {
            $set: {
              info: {
                social: {
                  instagram,
                  facebook,
                  vk,
                },
                cover: cover,
              },
            },
          }
        );
      }
      if (action === 'About Us') {
        const text = fields.text;
        await db.collection('regions').update({ _id: id }, { $set: { 'pages.about': { text } } });
      }
      if (action === 'Contact Information') {
        const email = fields.email;
        const phone = fields.phone;
        const address = fields.address;
        const pin = fields.pin;
        await db.collection('regions').update({ _id: id }, { $set: { 'pages.contacts': { email, phone, address, pin } } });
      }

      return res.status(200).json({ status: 'ok' });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
