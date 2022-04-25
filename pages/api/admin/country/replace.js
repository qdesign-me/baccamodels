import { connectToDatabase } from 'hooks/useMongodb';
import formidable from 'formidable';
import fs from 'fs';
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
      const unid = Date.now();
      const id = fields.id;
      const clean = await db.collection('regions').findOne({ _id: id });

      fields['info.social.instagram'] = fields['info.social.instagram'].replace('https://', '');
      fields['info.social.facebook'] = fields['info.social.facebook'].replace('https://', '');
      fields['info.social.vk'] = fields['info.social.vk'].replace('https://', '');
      if (files.newbecomecover && files.newbecomecover.originalFilename) {
        fields['pages.become.cover'] = `/images/${id}/${unid}_become.jpg`;
        const target = `${process.cwd()}/public${fields['pages.become.cover']}`;
        if (clean?.pages?.become?.cover) {
          const oldFile = `${process.cwd()}/public${clean.pages.become.cover}`;
          if (fs.existsSync(oldFile)) {
            fs.unlinkSync(oldFile);
          }
        }

        await sharp(files.newbecomecover.filepath)
          .rotate()
          .resize({ height: 2600, width: 1950, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 }, position: 'right top' })
          .jpeg({ mozjpeg: true })
          .toFile(target, (error, info) => {
            if (error) console.log('error uploading', err);
          });
      }
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
        pages: {
          development: {
            metatitle: fields['pages.development.metatitle'],
            metadescription: fields['pages.development.metadescription'],
          },
          talent: {
            metatitle: fields['pages.talent.metatitle'],
            metadescription: fields['pages.talent.metadescription'],
          },
          become: {
            metatitle: fields['pages.become.metatitle'],
            metadescription: fields['pages.become.metadescription'],
            text: fields['pages.become.text'],
            information: fields['pages.become.information'],
            cover: fields['pages.become.cover'],
          },
          about: {
            metatitle: fields['pages.about.metatitle'],
            metadescription: fields['pages.about.metadescription'],
            text: fields['pages.about.text'],
          },
          contacts: {
            metatitle: fields['pages.contacts.metatitle'],
            metadescription: fields['pages.contacts.metadescription'],
            email: fields['pages.contacts.email'],
            phone: fields['pages.contacts.phone'],
            address: fields['pages.contacts.address'],
            pin: fields['pages.contacts.pin'],
          },
          home: {
            metatitle: fields['pages.home.metatitle'],
            metadescription: fields['pages.home.metadescription'],
            text: fields['pages.home.text'],
          },
        },
        info: {
          social: {
            instagram: fields['info.social.instagram'],
            facebook: fields['info.social.facebook'],
            vk: fields['info.social.vk'],
          },
          cover: fields['info.cover'],
          company: fields['info.company'],
        },
      };

      if (id === 'kids') {
        newData.pages.boys = {
          metatitle: fields['pages.boys.metatitle'],
          metadescription: fields['pages.boys.metadescription'],
        };

        newData.pages.girls = {
          metatitle: fields['pages.girls.metatitle'],
          metadescription: fields['pages.girls.metadescription'],
        };
      } else {
        newData.pages.women = {
          metatitle: fields['pages.women.metatitle'],
          metadescription: fields['pages.women.metadescription'],
        };
      }

      await db.collection('regions').updateOne({ _id: id }, { $set: newData });
      return res.status(200).json({ status: 'ok', data: { message: 'Successfully Updated!' } });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'error' });
  }
}
