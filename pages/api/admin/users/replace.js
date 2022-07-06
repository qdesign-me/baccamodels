import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
import { createPassword } from 'hooks/auth';
import formidable from 'formidable';
import sharp from 'sharp';
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

    const { err, fields, files } = await new Promise(function (resolve, reject) {
      form.parse(req, (err, fields, files) => {
        resolve({ err, fields, files });
      });
    });

    if (fields.mode === 'validate') {
      const search = { email: fields.email };
      if (fields.id !== 'new') search['_id'] = { $ne: ObjectId(fields.id) };
      const found = await db.collection('users').findOne(search);

      if (found) {
        return res.status(200).json({ data: { message: 'This email is already taken' } });
      } else {
        return res.status(200).json({ data: { message: 'ok' } });
      }
    }
    const id = fields.id;
    const mode = fields.mode;
    const name = fields.name;
    const phone = fields.phone;
    const email = fields.email;
    const status = fields.status;
    const role = fields.role;
    const region = role === 'Admin' ? 'all' : fields.region;
    const file = files.newimg;
    let img = fields.img;
    const clean = await db.collection('users').findOne({ _id: ObjectId(id) });

    if (file && file.originalFilename) {
      if (clean?.img) {
        const oldFile = `${process.cwd()}/public${clean.img}`;
        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }
      }
      img = `/images/admin/users/${file.newFilename}_${file.originalFilename}`;
      const target = `${process.cwd()}/public${img}`;
      await sharp(file.filepath)
        .rotate()
        .resize(100, 100)
        .jpeg({ mozjpeg: true })
        .toFile(target, (error, info) => {
          console.log('error', error);
        });
    }
    if (mode === 'edit') {
      const newData = { name, phone, email, status, role, region, img };

      if (fields.setNewPwd === 'Yes') {
        const password = createPassword(fields.password);
        newData.password = password;
      }

      if (!newData.role) delete newData.role;
      if (!newData.region) delete newData.region;

      await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: newData });
      return res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' }, redirect: `/admin/users` });
    }
    if (mode === 'create') {
      const password = createPassword(fields.password);

      await db.collection('users').insertOne({ name, phone, email, password, status, role, region, img });
      return res.status(200).json({ status: 'ok', data: { message: 'Successfully Created!' }, redirect: `/admin/users` });
    }
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
