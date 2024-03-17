'use server';

import pool from "../pool";
import { UserModel, UserMutableModel } from "./user.type";

// Create - 添加新用户
export const createUser = async (userData: UserModel) => {
  // SQL 语句使用命名占位符
  const sql = `INSERT INTO users SET ?`;
  try {
    const [result] = await pool.query(sql, userData);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read - 获取用户列表
export const getUsers = async () => {
  const sql = 'SELECT * FROM users';
  try {
    const [results] = await pool.query(sql);
    return results;
  } catch (error) {
    throw error;
  }
};

// Read - 根据 ID 获取特定用户
export const getUserById = async (userId: number) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  try {
    const [results] = await pool.query(sql, [userId]);
    return results;
  } catch (error) {
    throw error;
  }
};

// Read - 根据 Username 查找用户
export const getUserByUsername = async (username: string) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  try {
    const [results] = await pool.query(sql, [username]);
    return results;
  } catch (error) {
    throw error;
  }
};

// Update - 更新用户信息
export const updateUser = async (userId: number, updateData: UserMutableModel) => {
  const sql = `UPDATE users SET ? WHERE id = ?`;
  try {
    const [result] = await pool.query(sql, [updateData, userId]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete - 删除用户
export const deleteUser = async (userId: number) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  try {
    const [result] = await pool.query(sql, [userId]);
    return result;
  } catch (error) {
    throw error;
  }
};
