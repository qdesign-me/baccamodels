import { connectToDatabase } from 'hooks/useMongodb';
import formidable from 'formidable';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import sharp from 'sharp';
const uid = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  );
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function modelsAPI(req, res, prefix) {
  const prepareUrl = (url) => url?.toLowerCase().replace(/ /g, '-');

  const cleanUp = (fileName) => {
    const file = `${process.cwd()}/public${fileName}`;
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  };

  try {
    const files = [];
    const fields = {};
    let media = [];
    const { db } = await connectToDatabase();
    const form = new formidable.IncomingForm();

    const payload = await new Promise(function (resolve, reject) {
      form
        .on('field', (field, value) => {
          fields[field] = value;
        })
        .on('file', (field, file) => {
          if (!files[field]) files[field] = [];
          files[field].push(file);
        })
        .on('end', async () => {
          if (fields.mode === 'validate') {
            const search = { name: fields.name, region: fields.region, category: fields.category };
            if (fields.id !== 'new') search['_id'] = { $ne: ObjectId(fields.id) };

            const found = await db.collection('models').findOne(search);

            if (found) {
              return resolve({ data: { message: 'This name already exist' } });
            } else {
              return resolve({ data: { message: 'ok' } });
            }
          }

          const unid = Date.now().toString();
          let id = fields.id;
          let clean = null;
          if (fields.mode === 'create') {
            const item = await db.collection('models').insertOne({});
            id = item.insertedId.toString();
          }
          if (fields.mode === 'edit') {
            clean = await db.collection('models').findOne({ _id: ObjectId(id) });
          }

          const slug = `/${fields['region']}/${fields['category']}/${prepareUrl(fields['name'])}`;

          const imagesDir = `/images/${fields['region']}/models/${id}`;
          if (!fs.existsSync(`${process.cwd()}/public${imagesDir}`)) {
            fs.mkdirSync(`${process.cwd()}/public${imagesDir}`);
          }
          const videoDir = `/video/${fields['region']}/models/${id}`;
          if (!fs.existsSync(`${process.cwd()}/public${videoDir}`)) {
            fs.mkdirSync(`${process.cwd()}/public${videoDir}`);
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
                  const nname = uid();
                  const preview = `${imagesDir}/book_${nname}.jpg`;

                  const target = `${process.cwd()}/public${preview}`;
                  await sharp(found.filepath)
                    .rotate()
                    .resize({ height: 600, width: 480 })
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
                  const nname = uid();
                  const preview = `${imagesDir}/polaroid_${nname}.jpg`;

                  const target = `${process.cwd()}/public${preview}`;
                  await sharp(found.filepath)
                    .rotate()
                    .resize({ height: 600, width: 480 })
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
                  const nname = uid();
                  const preview = `${videoDir}/video_${nname}.mp4`;

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

          if (files.newimg && files.newimg[0]?.originalFilename) {
            fields['img'] = `${imagesDir}/${unid}_thumb.jpg`;

            const target = `${process.cwd()}/public${fields['img']}`;
            await sharp(files.newimg[0].filepath)
              .rotate()
              .resize({ height: 600, width: 480, background: { r: 255, g: 255, b: 255, alpha: 1 } })
              .jpeg({ mozjpeg: true })
              .toFile(target, (error, info) => {
                if (error) console.log('error uploading', error);
              });
          }
          if (files.newcover && files.newcover[0]?.originalFilename) {
            if (files.newcover[0].mimetype.includes('image')) {
              fields['profile.cover'] = `${imagesDir}/${unid}_cover.jpg`;
              const target = `${process.cwd()}/public${fields['profile.cover']}`;
              await sharp(files.newcover[0].filepath)
                .rotate()
                .resize({ height: 2600, width: 1950, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                .jpeg({ mozjpeg: true })
                .toFile(target, (error, info) => {
                  if (error) console.log('error uploading', error);
                });
            }
            if (files.newcover[0].mimetype.includes('video')) {
              fields['profile.cover'] = `${videoDir}/${unid}_cover.mp4`;
              const target = `${process.cwd()}/public${fields['profile.cover']}`;
              await fs.rename(files.newcover[0].filepath, target, function (error) {
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
            featured: fields['featured'],
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
          if (clean) {
            if (clean.img && newData.img !== clean.img) {
              cleanUp(clean.img);
            }
            if (clean.profile?.cover && newData.profile.cover !== clean.profile.cover) {
              cleanUp(clean.profile.cover);
            }
            if (clean.profile?.book) {
              clean.profile.book.map((oldName) => {
                const found = newData.profile.book?.find((newName) => {
                  return oldName.preview === newName.preview;
                });
                if (!found) {
                  cleanUp(oldName.preview);
                }
              });
            }
            if (clean.profile?.polaroids) {
              clean.profile.polaroids.map((oldName) => {
                const found = newData.profile.polaroids?.find((newName) => {
                  return oldName.preview === newName.preview;
                });
                if (!found) {
                  cleanUp(oldName.preview);
                }
              });
            }
            if (clean.profile?.videos) {
              clean.profile.videos.map((oldName) => {
                const found = newData.profile.videos?.find((newName) => {
                  return oldName.preview === newName.preview;
                });
                if (!found) {
                  cleanUp(oldName.preview);
                }
              });
            }
          }

          await db.collection('models').replaceOne({ _id: ObjectId(id) }, newData);
          resolve({
            status: 'ok',
            data: { message: 'Successfully Updated!' },
            redirect: `/admin//${fields['region']}/models`,
          });
        });
      form.parse(req);
    });
    res.status(200).json(payload);
  } catch (error) {
    console.log('error', error);
    res.status(404).json({ status: 'error' });
  }
}
