import formidable from 'formidable';
import sendEmail from 'hooks/useMail';
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function api(req, res) {
  const humanReadable = (key) => {
    const arr = {
      page: 'Page',
      gender: 'Gender',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      email: 'Email',
      modelcity: 'Model from City',
      modelcountry: 'Model from Country',
      agency: 'Agency',
      height: 'Height',
      waist: 'Waist',
      bustAndChest: 'Bust and Chest',
      hips: 'Hips',
      shoeSize: 'Shoe Size',
      hairColor: 'Hair Color',
      eyeColor: 'Eye Color',
      dob: 'Date of Birth',
      acceptTerms: 'Accept Terms & Conditions',
      acceptSms: 'Accept Notifications',
      acceptOffers: 'Accept Offers',
    };
    if (arr[key]) return arr[key];
    return key;
  };
  try {
    let form = formidable({ multiples: true });

    await form.parse(req, async (err, fields, files) => {
      const attachments = [];
      if (files.photos) {
        files.photos.map((file) => {
          console.log('file', file);
          attachments.push({
            filename: file.originalFilename,
            contentType: file.mimetype,
            path: file.filepath,
          });
        });
      }
      let html = '';
      Object.keys(fields).map((key) => {
        html += `${humanReadable(key)}: ${fields[key]} <br/>`;
      });
      await sendEmail('Resume Application', html, attachments);

      return res.status(200).json({ status: 'ok', data: { message: 'Application Submitted!' } });
    });
  } catch (error) {
    res.status(404).json({ status: 'error' });
  }
}
