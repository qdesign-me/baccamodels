const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const smtpTransportConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USEREMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpTransport(smtpTransportConfig));

export default async function sendEmail(subject, html, attachments = [], cc = '') {
  const mailOptions = {
    from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USEREMAIL}>`,
    to: process.env.MAIL_ADMIN,
    subject,
    html,
  };

  if (attachments.length) {
    mailOptions.attachments = attachments;
  }

  try {
    const res = await transporter.sendMail(mailOptions);

    if (cc.length) {
      mailOptions.to = cc;
      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.log('mail error', error);
  }
}
