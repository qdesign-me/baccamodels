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

export default async function modelsAPI(req, res, prefix) {
  const prepareUrl = (url) => url?.toLowerCase().replace(/ /g, '-');

  try {
    const files = [];
    const fields = [];
    let media = [];
    const { db } = await connectToDatabase();
    const form = new formidable.IncomingForm();
    form
      .on('field', (field, value) => {
        fields[field] = value;
      })
      .on('file', (field, file) => {
        if (!files[field]) files[field] = [];
        files[field].push(file);
      })
      .on('end', async () => {
        const unid = Date.now().toString();
        const id = fields.id;

        //const clean = await db.collection('models').findOne({ _id: ObjectId(id) });
        const slug = `/${fields['region']}/${fields['category']}/${prepareUrl(fields['name'])}`;
        const dir = `/images/${fields['region']}/models/${id}`;
        if (!fs.existsSync(`${process.cwd()}/public${dir}`)) {
          fs.mkdirSync(`${process.cwd()}/public${dir}`);
        }
        const videodir = `/video/${fields['region']}/models/${id}`;
        if (!fs.existsSync(`${process.cwd()}/public${videodir}`)) {
          fs.mkdirSync(`${process.cwd()}/public${videodir}`);
        }

        if (typeof fields['book'] === 'string') fields['book'] = JSON.parse(fields['book']);
        media = [];

        await Promise.all(
          fields['book']?.map(async (newFile) => {
            if (newFile.name) {
              // need upload

              const found = Object.values(files['newbook[]'])?.find((f) => {
                return f.originalFilename === newFile.name && f.size === newFile.size;
              });

              if (found?.filepath) {
                const preview = `${dir}/${unid}_book${newFile.order + 1}.jpg`;

                const target = `${process.cwd()}/public${preview}`;
                await sharp(found.filepath)
                  .rotate()
                  .resize({ height: 600 })
                  .jpeg({ mozjpeg: true })
                  .toFile(target, (error, info) => {
                    if (error) console.log('error uploading', error);
                  });
                const row = {
                  order: newFile.order,
                  size: newFile.size,
                  preview,
                  id: `${unid}-${newFile.order + 1}`,
                };
                media.push(row);
              }
            } else {
              const row = newFile;
              media.push(row);
            }
          })
        );

        fields['allbook'] = [...media];

        if (typeof fields['polaroids'] === 'string') fields['polaroids'] = JSON.parse(fields['polaroids']);

        media = [];

        await Promise.all(
          fields['polaroids']?.map(async (newFile) => {
            if (newFile.name) {
              // need upload

              const found = Object.values(files['newpolaroids[]'])?.find((f) => {
                return f.originalFilename === newFile.name && f.size === newFile.size;
              });

              if (found?.filepath) {
                const preview = `${dir}/${unid}_polaroid${newFile.order + 1}.jpg`;

                const target = `${process.cwd()}/public${preview}`;
                await sharp(found.filepath)
                  .rotate()
                  .resize({ height: 600 })
                  .jpeg({ mozjpeg: true })
                  .toFile(target, (error, info) => {
                    if (error) console.log('error uploading', error);
                  });
                const row = {
                  order: newFile.order,
                  size: newFile.size,
                  preview,
                  id: `${unid}-${newFile.order + 1}`,
                };
                media.push(row);
              }
            } else {
              const row = newFile;
              media.push(row);
            }
          })
        );

        fields['allpolaroids'] = [...media];

        if (typeof fields['videos'] === 'string') fields['videos'] = JSON.parse(fields['videos']);

        media = [];

        await Promise.all(
          fields['videos']?.map(async (newFile) => {
            if (newFile.name) {
              // need upload

              const found = Object.values(files['newvideos[]'])?.find((f) => {
                return f.originalFilename === newFile.name && f.size === newFile.size;
              });

              if (found?.filepath) {
                const preview = `${videodir}/${unid}_video${newFile.order + 1}.mp4`;

                const target = `${process.cwd()}/public${preview}`;
                await fs.rename(found.filepath, target, function (error) {
                  if (error) console.log('error uploading', error);
                });

                const row = {
                  order: newFile.order,
                  size: newFile.size,
                  preview,
                  id: `${unid}-${newFile.order + 1}`,
                };
                media.push(row);
              }
            } else {
              const row = newFile;
              media.push(row);
            }
          })
        );

        fields['allvideos'] = [...media];

        if (files.newimg && files.newimg.originalFilename) {
          const dir = `/images/${fields['region']}/models/${id}`;
          fields['img'] = `${dir}/${unid}_thumb.jpg`;
          const target = `${process.cwd()}/public${fields['img']}`;
          await sharp(files.newimg.filepath)
            .rotate()
            .resize({ height: 427, width: 320, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
            .jpeg({ mozjpeg: true })
            .toFile(target, (error, info) => {
              if (error) console.log('error uploading', error);
            });
        }
        if (files.newcover && files.newcover.originalFilename) {
          if (files.newcover.mimetype.includes('image')) {
            const dir = `/images/${fields['region']}/models/${id}`;
            fields['profile.cover'] = `${dir}/${unid}_cover.jpg`;
            const target = `${process.cwd()}/public${fields['profile.cover']}`;
            await sharp(files.newcover.filepath)
              .rotate()
              .resize({ height: 2600, width: 1950, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
              .jpeg({ mozjpeg: true })
              .toFile(target, (error, info) => {
                if (error) console.log('error uploading', error);
              });
          }
          if (files.newcover.mimetype.includes('video')) {
            const dir = `/video/${fields['region']}/models/${id}`;
            fields['profile.cover'] = `${dir}/${unid}_cover.mp4`;
            const target = `${process.cwd()}/public${fields['profile.cover']}`;
            await fs.rename(files.newcover.filepath, target, function (error) {
              if (error) console.log('error uploading', error);
            });
          }
        }
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
            book: fields['allbook'] || [],
            polaroids: fields['allpolaroids'] || [],
            videos: fields['allvideos'] || [],
            cover: fields['profile.cover'],
          },
        };
        console.log(newData);
        await db.collection('models').replaceOne({ _id: ObjectId(id) }, newData);
        res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' }, redirect: `/admin//${fields['region']}/models` });
      });
    form.parse(req);
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
