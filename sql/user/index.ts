import pool from "../pool";

// Create - 添加新用户
const createUser = async (userData) => {
  // SQL 语句使用命名占位符
  const sql = `INSERT INTO users SET ?`;
  
  try {
    const [result] = await pool.execute(sql, userData);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read - 获取用户列表
const getUsers = async () => {
  const sql = 'SELECT * FROM users';
  try {
    const [results] = await pool.query(sql);
    return results;
  } catch (error) {
    throw error;
  }
};

// Read - 根据 ID 获取特定用户
const getUserById = async (userId) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  try {
    const [results] = await pool.query(sql, [userId]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

// Update - 更新用户信息
const updateUser = async (userId, updateData) => {
  const { nickname, avatar_url, role, additional_info } = updateData;
  const sql = `
    UPDATE users
    SET nickname = ?, avatar_url = ?, role = ?, additional_info = ?
    WHERE id = ?
  `;
  try {
    const [result] = await pool.query(sql, [nickname, avatar_url, role, JSON.stringify(additional_info), userId]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete - 删除用户
const deleteUser = async (userId) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  try {
    const [result] = await pool.query(sql, [userId]);
    return result;
  } catch (error) {
    throw error;
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };