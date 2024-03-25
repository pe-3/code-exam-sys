'use server';

import { z } from 'zod'
import { UserModel, UserMutableModel, UserRole } from './user.type';
import { generateSalt, hashPassword, validatePassword } from '@/utils/hash';
import { createUser, getUserByEmail, getUserById, getUserByUsername, updateUser } from './sql';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { verifyInputCode } from '@/app/auth/components/SendCodeBtn/sendVerificationCode';
import { getTokenFromCookie } from '@/app/token';
import { getItemInVisitor } from '@/storage';

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
  const createdUserData = RegisterSchema.parse(parsedData);
  // 首先生成一个盐值
  const salt = generateSalt();
  // 使用盐值来哈希密码
  const hashedPassword = hashPassword(parsedData.password, salt);
  // 设置一些服务端处理的属性
  const userData: UserModel = ({
    ...createdUserData,
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
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

// 验证码
export const loginOrCreateByCode = async (formData: FormData) => {
  const res: {
    isVerifyed: boolean;
    isCreated: boolean;
    isLogined: boolean;
    user: UserModel | null;
  } = {
    isVerifyed: false,
    isCreated: false,
    isLogined: false,
    user: null
  };
  const email = formData.get('email');
  const code = formData.get('code');

  try {
    // 1. 验证码验证
    const isCodeVerifyed = await verifyInputCode(email as string, code as string);
    res.isVerifyed = isCodeVerifyed;
    if (!isCodeVerifyed) {
      return res;
    }

    // 2. 登录验证，没用户，走注册
    const [user] = await getUserByEmail(email as string) as RowDataPacket[] as UserModel[];
    if(user) {
      res.isLogined = true;
      res.user = user;
      return res;
    }

    // 3. 预设 username 和 password
    email && formData.set('username', email as string);
    code && formData.set('password', code as string);

    // 4. 进行注册，后再登录验证数据库
    const isCreated = await createUserByFormData(formData);
    if(isCreated) {
      res.isCreated = true;
      res.user = await loginUserByFormData(formData);
    }
  } catch (err) {
    console.log(err);
  }

  // 5. 返回结果对象
  return res;
}

// 选取角色
export const selectRole = async ({
  role,
  roleId
}: {
  role: UserRole;
  roleId: string;
}) => { 
  // 1. 通过 cookies 拿到 token
  const salt = await getItemInVisitor('TOKEN_SALT');
  const tokenPayload = await getTokenFromCookie(salt);

  const { id } = tokenPayload as any || {};

  const isAffected = await updateUser(id, {
    role,
    role_id: roleId
  });

  return isAffected;
};

// 拿到用户信息
export const getUserInfo = async () => { 
  // 1. 通过 cookies 拿到 token
  const salt = await getItemInVisitor('TOKEN_SALT');
  const tokenPayload = await getTokenFromCookie(salt);
  const { id } = tokenPayload as any || {};

  const [user] = await getUserById(id) as RowDataPacket[] || [];

  // 对 user 进行敏感字段过滤
  const {
    password,
    salt: _salt,
    id: _id,
    ...rest
  } = user || {};

  return rest;
}

// 更新用户信息
const updateSchema = z.object({
  nickname: z.string().optional().nullable(),
  avatar_url: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  birth_date: z.string().optional().nullable(),
  gender: z.enum(["male", "female", "other"]).optional().nullable(),
  profile_picture_url: z.string().optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
});

export const updateUserInfo = async (formData: FormData) => { 
  // 1. 通过 cookies 拿到 token
  const salt = await getItemInVisitor('TOKEN_SALT');
  const tokenPayload = await getTokenFromCookie(salt);
  const { id } = tokenPayload as any || {};

  // 2. 解析字段
  const rawData: { [x:string]: any } = {};
  for(let key in updateSchema.shape) {
    rawData[key] = formData.get(key);
  };


  const parsedData = updateSchema.parse(rawData);
  const isAffected = await updateUser(id, parsedData as UserMutableModel);

  return isAffected;
}