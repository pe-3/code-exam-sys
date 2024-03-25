'use server';

import { z } from 'zod';
import { createExam } from './sql';

// 定义zod模式，与ExamModel结构类似，但没有examId
const ExamSchema = z.object({
  ExamName: z.string().min(1),
  Subject: z.string().min(1),
  StartTime: z.string().min(1),
  EndTime: z.string().min(1),
  TotalScore: z.string().min(1)
});

const pareseData = (formData: FormData, schema: any) => {
  const rawData: { [x:string]: any } = {};
  for(let key in schema.shape) {
    rawData[key] = formData.get(key);
  };
  return schema?.parse(rawData);
}

export async function createExamByFormData(formData: FormData) {
  try {
    // 将formData转换为对象
    // 使用zod模式解析和验证前端传递来的formData
    const parsedData = pareseData(formData, ExamSchema);
    parsedData.StartTime = (Math.floor(new Date(parsedData.StartTime).getTime() / 1000));
    // 如果验证通过，调用之前定义的 createExam 函数
    const [res] = await createExam(parsedData);
    return res?.affectedRows === 1;
  } catch (error) {
    // 如果解析或验证失败，则抛出错误
    console.error(error);
    throw new Error("Invalid exam data");
  }
}