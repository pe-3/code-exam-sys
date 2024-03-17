// passwordUtils.ts
import crypto from 'crypto';

// 生成随机盐值
export function generateSalt(length: number = 16): string {
  return crypto.randomBytes(length).toString('hex');
}

// 哈希密码
export function hashPassword(password: string, salt: string): string {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
  return hash.toString('hex');
}

// 验证密码
export function validatePassword(password: string, hash: string, salt: string): boolean {
  // 使用相同的盐值哈希正在验证的密码
  const hashedPassword = hashPassword(password, salt);
  // 比较存储的哈希和刚刚生成的哈希是否相等
  return hashedPassword === hash;
}