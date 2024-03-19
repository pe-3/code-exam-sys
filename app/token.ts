'use server';
import { UserModel } from '@/sql/user/user.type';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { setItemInVisitor } from '@/storage';

const TOKEN_KEY = 'TOKEN_KEY';

export async function getTokenFromCookie(salt: string) {
  const token = cookies().get(TOKEN_KEY)?.value || '';
  const tokenPayload = jwt.verify(token, salt);
  const { expire } = tokenPayload as any || {};

  if (new Date(expire).getTime() < Date.now()) {
    return null;
  }
  return tokenPayload;
}

export async function setTokenInCookie(user: UserModel) {
  const { salt = '' } = user;

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
  }, salt);

  cookies().set({
    name: TOKEN_KEY,
    value: token,
    httpOnly: true
  });

  setItemInVisitor('TOKEN_SALT', salt);
}