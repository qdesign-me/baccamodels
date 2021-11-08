import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import im from 'imagemagick';
import sharp from 'sharp';

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
      console.log(fields);
      const mode = fields.mode;
      const name = fields.name;
      const phone = fields.phone;
      const email = fields.email;
      const status = fields.status;
      const role = fields.role;

      const region = role === 'Admin' ? 'all' : fields.region;
      const file = files.newimg;
      let img = fields.img;
      if (file && file.originalFilename) {
        img = `/images/admin/users/${file.newFilename}_${file.originalFilename}`;

        const target = `${process.cwd()}/public${img}`;

        await sharp(file.filepath)
          .rotate()
          .resize(200)
          .jpeg({ mozjpeg: true })
          .toFile(target, (error, info) => {
            console.log('error', error);
          });
      }
      if (mode === 'edit') {
        console.log({ name, phone, email, status, role, region, img });
        const id = fields.id;
        await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { name, phone, email, status, role, region, img } });
        return res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' }, redirect: `/admin/users` });
      }
      if (mode === 'create') {
        console.log({ name, phone, email, status, role, region, img });
        const item = await db.collection('users').insertOne({ name, phone, email, status, role, region, img });
        const id = item.insertedId.toString();
        return res.status(200).json({ status: 'ok', data: { message: 'Successfully Created!' }, redirect: `/admin/users` });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
