/**
 * 用户模型
 */

export enum UserRole {
  Unset = 0,
  Student = 1,
  Teacher = 2,
  Admin = 3
}

// 不可更新的属性
export interface UserImmutableModel {
  id?: number;
  username: string; // 用户名通常创建之后不允许更改
  created_at: Date; // 创建时间
}

// 可更新的属性
export interface UserMutableModel {
  password?: string;
  salt?: string;
  email?: string;
  nickname?: string;
  avatar_url?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  birth_date?: Date | null;
  gender?: 'male' | 'female' | 'other' | null;
  profile_picture_url?: string | null;
  bio?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  status?: 'active' | 'inactive' | 'banned';
  updated_at?: Date; // 更新时间可以更改，随着用户信息的更新而变化
  role?: UserRole;
  role_id?: String;
}

// 完整的 UserModel，由不可更新和可更新属性组合
export type UserModel = UserImmutableModel & UserMutableModel;