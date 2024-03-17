'use server';

import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as ReactDOMServer from 'react-dom/server';

const transporter = nodemailer.createTransport(({
  // 这些配置应来自环境变量
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'true', // 依赖于 MAIL_PORT，如果是 465，应该是 true
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options));

export default async function sendMail({
  to, subject, text, jsx
}: {
  to: string, subject: string, text: string, jsx: string
}) {
  const mailOptions = {
    from: `'"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>'`,
    to,
    subject,
    text,
    html: jsx, // html 正文
  };

  return transporter.sendMail(mailOptions);
}