import fs from 'fs';
import { connectToDatabase, client } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
export default async function deleteModel(req, res) {
  try {
    const { db } = await connectToDatabase();
    const id = req.body.id;
    const found = await db.collection('models').findOne({ _id: ObjectId(id) });
    await db.collection('modelnotes').deleteMany({ model: id });
    await db.collection('modelevents').deleteMany({ model: id });

    const imagesDir = `/images/${found['region']}/models/${id}`;
    const videoDir = `/video/${found['region']}/models/${id}`;

    fs.rmdirSync(`${process.cwd()}/public${imagesDir}`, { recursive: true, force: true });
    fs.rmdirSync(`${process.cwd()}/public${videoDir}`, { recursive: true, force: true });

    await db.collection('models').deleteOne({ _id: ObjectId(id) });

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
