'use server';
import { getItemInVisitor, removeItemInVisitor, setItemInVisitor } from "@/storage";
import sendMail from "@/utils/mail";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// 发送验证码
const sendVerificationCode: (email: string) => Promise<any> = async (
  email
) => {
  if (!email || !email.trim()) {
    return false;
  }
  // 正则验证 email
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return false;
  }

  // 六位验证码
  const code = Math.random().toString().slice(2, 8);

  setItemInVisitor('MAIL_CODE', {
    code,
    email,
    // 半个小时之后会失效
    expire: Date.now() + 30 * 60 * 1000,
  }); // redis 里存 code，等待后续验证

  const res: SMTPTransport.SentMessageInfo = await sendMail({
    to: email,
    subject: '登录/注册验证码',
    text: `您的验证码是 ${code}`,
    jsx: `<div>
      <p>您的验证码是 <strong>${code}</strong></p>
      <p>请勿泄露给他人，验证码有效期为 30 分钟。</p>
    </div>`,
  });

  // 判断发送成功
  if (res?.accepted.includes(email)) {
    return true;
  } else {
    return false;
  }
}

export default sendVerificationCode;

export const verifyInputCode = async (inputEmail: string, inputCode: string) => {
  const {
    code,
    email,
    expire
  } = await getItemInVisitor('MAIL_CODE') || {};

  if (inputEmail !== email) {
    return false;
  }

  if (expire < Date.now()) {
    return false;
  }

  if (inputCode !== code) {
    return false;
  }

  removeItemInVisitor('MAIL_CODE');
  return true;
}
