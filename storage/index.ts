'use server';
import Redis, { RedisKey } from 'ioredis';

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
  await redis.del(key);
}

export const clear = async () => {
  await redis.flushdb(); // 警告：这个操作会清空整个数据库
}