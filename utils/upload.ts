'use server';

// 导入 file
import fs from 'node:fs'

// 将 formdata 中的 file 对象存在 public 底下
export const uploadFile = async (formData: FormData, index: string = 'file') => {
  // 从 formdata 中拿到 file
  const file = formData.get(index) as File;

  console.log(file);

  if(!file) {
    return null;
  }

  // 拿到文件名和文件类型
  const fileType = file.name.split('.')[1];
  // 随机生成 filename
  const fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // 拿到文件 buffer
  const fileBuffer = await file.arrayBuffer();

  // 用 fs 将 fileBuffer 写
  fs.writeFileSync(`./public/${fileName}.${fileType}`, Buffer.from(fileBuffer));

  // 返回链接
  return `/${fileName}.${fileType}`;
};
