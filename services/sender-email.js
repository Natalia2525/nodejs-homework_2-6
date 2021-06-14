const nodemailer = require('nodemailer');

require('dotenv').config();

class CreateSenderNodemailer {
  async send(msg) {
    const options = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: 'goitnodejs@meta.ua',
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    const transporter = nodemailer.createTransport(options);
    const emailOptions = {
      from: 'goitnodejs@meta.ua',
      ...msg,
    };

    return await transporter.sendMail(emailOptions);
  }
}

module.exports = { CreateSenderNodemailer };

