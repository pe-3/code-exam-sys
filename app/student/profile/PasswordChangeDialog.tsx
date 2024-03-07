'use client';

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const PasswordChangeDialog = ({ open, onClose }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
  };

  const handleSave = () => {
    // 这里应添加密码更改的逻辑
    // 比如验证新密码和确认密码是否匹配
    // 然后调用API来更新密码
    
    console.log(passwords);
    // 最终，关闭对话框
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>更改密码</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="当前密码"
          type="password"
          fullWidth
          variant="standard"
          value={passwords.currentPassword}
          onChange={handleChange('currentPassword')}
        />
        <TextField
          margin="dense"
          label="新密码"
          type="password"
          fullWidth
          variant="standard"
          value={passwords.newPassword}
          onChange={handleChange('newPassword')}
        />
        <TextField
          margin="dense"
          label="确认新密码"
          type="password"
          fullWidth
          variant="standard"
          value={passwords.confirmNewPassword}
          onChange={handleChange('confirmNewPassword')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSave}>保存</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordChangeDialog;