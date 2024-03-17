'use server';

import { z } from 'zod'
import { UserModel, UserRole } from './user.type';
import { generateSalt, hashPassword, validatePassword } from '@/utils/hash';
import { createUser, getUserByUsername } from './sql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required and cannot be empty"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Must be a valid email"),
  nickname: z.string().optional().nullable(),
  avatar_url: z.string().url().optional().nullable(), // avatar_url 是可选的，并且可以为 null
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  birth_date: z.number().optional().nullable(), // birthDate 是可选的，并且可以为 null
  gender: z.enum(["male", "female", "other"]).optional().nullable(), // gender 是可选的，并且可以为 null
  profile_picture_url: z.string().url().optional().nullable(),
  bio: z.string().max(500).optional().nullable(), // 假设简介有字数限制
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .nullable(), // 这里使用了一个大致匹配国际电话号码的正则表达式
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  // 注意：以下字段通常在用户创建时有默认值，不应由用户进行设置：
  status: z.enum(["active", "inactive", "banned"]).nullable().default('inactive'), // 状态可以设置默认值为 'active'
  updated_at: z.date().nullable(), // 更新时间通常由数据库自动管理
  role: z.nativeEnum(UserRole).nullable().default(UserRole.Student), // 角色可以设置默认值，如 UserRole.Normal
});

export const createUserByFormData = async (formData: FormData) => {
  // 从 form 上获取数据
  const parsedData: { [x: string]: any } = {};
  for(let key in RegisterSchema.shape) {
    parsedData[key] = formData.get(key);
  }
  // 使用 Zod 解析和验证 FormData
  const createdUserDate = RegisterSchema.parse(parsedData);
  // 首先生成一个盐值
  const salt = generateSalt();
  // 使用盐值来哈希密码
  const hashedPassword = hashPassword(parsedData.password, salt);
  // 设置一些服务端处理的属性
  const userData: UserModel = ({
    ...createdUserDate,
    password: hashedPassword,
    created_at: new Date(),
    salt,
    status: 'inactive',
    role: parsedData.role || UserRole.Student
  } as UserModel);
  // 创建用户
  const result: ResultSetHeader = await createUser(userData) as ResultSetHeader;

  return result?.affectedRows;
};

const LoginSchema = z.object({
  username: z.string().min(1, "Username is required and cannot be empty"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserByFormData = async (formData: FormData) => { 
  // 从 form 上获取数据
  const parsedData: { [x: string]: any } = {};
  for(let key in LoginSchema.shape) {
    parsedData[key] = formData.get(key);
  }
  // 使用 Zod 解析和验证 FormData
  const loginUserData = LoginSchema.parse(parsedData);

  // 查询用户
  const [user] = await getUserByUsername(loginUserData.username) as RowDataPacket[] as UserModel[];

  // 如果用户不存在，返回 null
  if (!user) {
    return null;
  }

  // 验证密码
  const isValid = validatePassword(loginUserData.password, user.password, user.salt);

  // 如果密码不正确，返回 null
  if (!isValid) {
    return null;
  }

  // 如果证通过，返回用户信息
  return user;
};