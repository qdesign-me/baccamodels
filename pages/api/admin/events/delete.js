import fs from 'fs';
import { connectToDatabase, client } from 'hooks/useMongodb';
import { ObjectId } from 'mongodb';
export default async function Delete(req, res) {
  try {
    const { db } = await connectToDatabase();
    const id = req.body.id;
    const found = await db.collection('modelevents').findOne({ _id: ObjectId(id) });

    if (found?.img) {
      const oldFile = `${process.cwd()}/public${found.img}`;
      if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile);
      }
    }

    await db.collection('modelevents').deleteOne({ _id: ObjectId(id) });

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
