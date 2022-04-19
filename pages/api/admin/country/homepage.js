import { connectToDatabase, buildQuery } from 'hooks/useMongodb';
import formidable from 'formidable';
import fs from 'fs';
import sharp from 'sharp';
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function Homepage(req, res) {
  try {
    let form = formidable({ multiples: true });
    const { db } = await connectToDatabase();

    await form.parse(req, async (err, fields, files) => {
      const unid = Date.now();
      const id = 'all';
      const clean = await db.collection('regions').findOne({ _id: id });

      if (files.newinfocover && files.newinfocover.originalFilename) {
        fields['info.cover'] = `/video/${id}/${unid}_cover.mp4`;
        const target = `${process.cwd()}/public${fields['info.cover']}`;
        if (clean?.info?.cover) {
          const oldFile = `${process.cwd()}/public${clean.info.cover}`;
          if (fs.existsSync(oldFile)) {
            fs.unlinkSync(oldFile);
          }
        }

        await fs.rename(files.newinfocover.filepath, target, function (error) {
          if (error) console.log('error uploading', err);
        });
      }
      const newData = {
        metatitle: fields.metatitle,
        metadescription: fields.metadescription,
        info: {
          cover: fields['info.cover'],
        },
      };

      await db.collection('regions').updateOne({ _id: id }, { $set: newData });
      return res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' } });
    });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
