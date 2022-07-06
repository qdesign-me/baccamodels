import fs from 'fs';
import { connectToDatabase, client } from 'hooks/useMongodb';
import formidable from 'formidable';
import { ObjectId } from 'mongodb';
import sharp from 'sharp';
export const config = {
  api: {
    bodyParser: false,
  },
};
const uid = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  );
};
export default async function Replace(req, res) {
  try {
    let form = formidable({ multiples: true });
    const { db } = await connectToDatabase();

    const { err, fields, files } = await new Promise(function (resolve, reject) {
      form.parse(req, (err, fields, files) => {
        resolve({ err, fields, files });
      });
    });

    const parts = fields.added.split('-');

    const added = fields.added;
    const file = files.newimg;
    let img = fields.img;
    const id = fields.id;
    const clean = await db.collection('modelevents').findOne({ _id: ObjectId(id) });

    if (file && file.originalFilename) {
      if (clean?.img) {
        const oldFile = `${process.cwd()}/public${clean.img}`;
        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }
      }
      const nname = uid();
      img = `/images/${fields.country}/events/${nname}.jpg`;
      const target = `${process.cwd()}/public${img}`;
      await sharp(file.filepath)
        .rotate()
        .resize({ height: 600, width: 480, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })

        .jpeg({ mozjpeg: true })
        .toFile(target, (error, info) => {
          console.log('error', error);
        });
    }
    const newData = {
      model: fields.model,
      country: fields.country,
      added: added,
      status: fields.status,
      title: fields.title,
      img: img,
    };
    if (fields.mode === 'create') {
      await db.collection('modelevents').insertOne(newData);
      return res.status(200).json({ status: 'ok', data: { message: 'Successfully Created!' }, redirect: `/admin/${fields.country}/events` });
    }
    await db.collection('modelevents').updateOne({ _id: ObjectId(fields.id) }, { $set: newData });
    return res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' }, redirect: `/admin/${fields.country}/events` });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
