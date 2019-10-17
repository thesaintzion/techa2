import nodemailer from 'nodemailer';

const senderEmail = process.env.EMAIL;

const transporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default transporter;