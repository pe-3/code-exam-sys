'use server';

import { RowDataPacket } from 'mysql2';
import pool from '../pool'; // replace with actual file path
import { ExamModel, ExamStatus, ExamUpdateModel } from './exam.type';

export async function getAllExams(): Promise<ExamModel[]> {
  const sql = 'SELECT * FROM Exams ORDER BY StartTime DESC';
  const [rows] = await pool.execute<RowDataPacket[]>(sql);
  return rows as ExamModel[];
}

export async function getExamById(examId: number): Promise<ExamModel | null> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM Exams WHERE ExamId = ?', [examId]);
  if (rows.length === 0) return null;

  const row = rows[0];
  return row as ExamModel;
}

export async function createExam(exam: Omit<ExamModel, 'examId'>): Promise<any> {
  const res = await pool.query('insert into exams SET ?', exam);
  return res;
}

export async function updateExam(exam: ExamUpdateModel): Promise<any> {
  const res = await pool.query('UPDATE Exams SET ? WHERE ExamId = ?', [exam, exam.ExamId]);
  return res;
}

export async function deleteExam(examId: number): Promise<void> {
  await pool.execute('DELETE FROM Exams WHERE ExamId = ?', [examId]);
}

// 定义查询参数接口
export interface ExamQueryParams {
  ExamName?: string;
  Subject?: string;
  StartTime?: string;
  EndTime?: string;
  TotalScore?: string;
  Status?: ExamStatus | string;
  CurrentTime?: string;
  isBefore? : boolean;
}

// 根据查询模型查询数据
export async function queryExams(params: ExamQueryParams): Promise<ExamModel[]> {
  let sql = 'SELECT * FROM Exams';
  const conditions: string[] = [];
  const values: any[] = [];

  // 动态构建查询条件和参数数组
  if (params.ExamName) {
    conditions.push('ExamName LIKE ?');
    values.push(`%${params.ExamName}%`);
  }
  if (params.Subject) {
    conditions.push('Subject LIKE ?');
    values.push(params.Subject);
  }
  if (params.StartTime) {
    conditions.push('StartTime >= ? AND StartTime < ?');
    console.log(params.StartTime)
    values.push((new Date(params.StartTime).getTime() / 1000).toFixed().toString());
    const nextDay = new Date(params.StartTime).getTime() + 24 * 60 * 60 * 1000;
    values.push(
      (nextDay / 1000).toFixed().toString()
    );
  }
  if (params.EndTime) {
    conditions.push('EndTime = ?');
    values.push(params.EndTime);
  }
  if (params.TotalScore) {
    conditions.push('TotalScore = ?');
    values.push(params.TotalScore);
  }
  if (params.Status) {
    conditions.push('Status = ?');
    values.push(params.Status);
  }
  // 最近时间查询
  if (params.CurrentTime) {
    const symbol = params.isBefore ? '<=' : '>=';

    // 1. 查询语句
    conditions.push(`StartTime ${symbol} ?`);

    // 2. 查询值
    const CurrentDate = new Date(params.CurrentTime);
    const CurrentSeconds = Math.floor(CurrentDate.getTime() / 1000).toFixed().toString();
    values.push(CurrentSeconds);
  }
  // 如果存在条件，追加到SQL语句中
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // 添加排序
  sql += ' ORDER BY StartTime DESC';

  // 执行查询
  const [rows] = await pool.execute<RowDataPacket[]>(sql, values);
  return rows as ExamModel[];
}

// 获取即将进行的考试
export async function getComingExam(): Promise<ExamModel> {
  const currentDate = new Date();
  const Exams = await queryExams({
    CurrentTime: currentDate.toString()
  });

  return Exams[Exams.length - 1];
}


// 获取最近的考试
export async function getComingExams(): Promise<ExamModel[]> {
  const currentDate = new Date();
  const Exams = await queryExams({
    CurrentTime: currentDate.toString()
  });

  return Exams;
}

// 获取过往的考试
export async function getPastExams(): Promise<ExamModel[]> {
  const currentDate = new Date();
  const Exams = await queryExams({
    CurrentTime: currentDate.toString(),
    isBefore: true
  });

  return Exams;
}

// 获取正在进行的考试
export async function getCurrentExam(): Promise<ExamModel> {
  const Exams = await queryExams({
    Status: ExamStatus.IN_PROGRESS,
  });

  return Exams[Exams.length - 1];
}