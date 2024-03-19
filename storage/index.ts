'use server';
import Redis, { RedisKey } from 'ioredis';
import { GetVisitor, SetVisitor } from '@/app/visitor';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

export const setItem = async (key: RedisKey, value: any) => {
  try {
    await redis.set(key, JSON.stringify(value));
  }
  catch (err) {
  }
}

export const getItem = async (key: RedisKey) => {
  try {
    const data = await redis.get(key);
    return JSON.parse(data as string);
  }
  catch (e) {
    return null;
  }
}

export const removeItem = async (key: RedisKey) => { 
  const number = await redis.del(key);
  return number;
}

export const clear = async () => {
  await redis.flushdb(); // 警告：这个操作会清空整个数据库
}

export const getItemInVisitor = async (key: RedisKey) => {
  const visitor = await GetVisitor();
  const item = await getItem(`${visitor}/${key}`);
  return item;
}

export const setItemInVisitor = async (key: RedisKey, value: any) => {
  const visitor = await SetVisitor();
  await setItem(`${visitor}/${key}`, value);
}

export const removeItemInVisitor = async (key: RedisKey) => { 
  const visitor = await GetVisitor();
  await removeItem(`${visitor}/${key}`);
}