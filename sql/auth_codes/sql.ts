import pool from "../pool";

// 插入授权码
async function insertAuthorizationCode(account, encryptedCode) {
  // 此示例假设 'account' 列已经存在于授权码表中
  const insertSql = 'INSERT INTO authorization_codes (account, encrypted_code) VALUES (?, ?)';
  const [result] = await pool.execute(insertSql, [account, encryptedCode]);
  return result.insertId; // 返回新插入行的ID
}

// 根据账号验证授权码
async function validateAuthorizationCode(account, encryptedCode) {
  const validateSql = 'SELECT * FROM authorization_codes WHERE account = ? AND encrypted_code = ? LIMIT 1';
  const [rows] = await pool.execute(validateSql, [account, encryptedCode]);
  
  if(rows.length > 0) {
      const authCode = rows[0];
      // 返回一个对象，告知调用者授权码是否存在以及是否已被使用
      return {
          exists: true,
          isUsed: !!authCode.is_used,
          role: authCode.role
      };
  } else {
      // 授权码不存在
      return {
          exists: false,
          isUsed: false,
          role: null
      };
  }
}