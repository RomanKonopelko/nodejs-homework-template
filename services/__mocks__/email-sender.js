const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

class CreateSenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: " RK Studio <romank761@gmail.com>" });
  }
}

class CreateSenderNodemailer {
  async send(msg) {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "romank761@gmail.com",
        pass: process.env.PASSWORD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return transporter.sendMail({ ...msg, from: "RK studio <romank761@gmail.com>" });
  }
}

module.exports = {
  CreateSenderNodemailer,
  CreateSenderSendGrid,
};
