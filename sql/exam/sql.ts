'use server';

import { RowDataPacket } from 'mysql2';
import pool from '../pool'; // replace with actual file path
import { ExamModel } from './exam.type';

export async function getAllExams(): Promise<ExamModel[]> {
  const sql = 'SELECT * FROM Exams ORDER BY StartTime DESC';
  const [rows] = await pool.execute<RowDataPacket[]>(sql);
  return rows as ExamModel[];
}

export async function getExamById(examId: number): Promise<ExamModel | null> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM Exams WHERE ExamID = ?', [examId]);
  if (rows.length === 0) return null;

  const row = rows[0];
  return row as ExamModel;
}

export async function createExam(exam: Omit<ExamModel, 'examId'>): Promise<any> {
  const res = await pool.query('insert into exams SET ?', exam);
  return res;
}

export async function updateExam(exam: ExamModel): Promise<void> {
  await pool.execute('UPDATE Exams SET ExamName = ?, Subject = ?, StartTime = ?, EndTime = ?, TotalScore = ?, IsCancelled = ? WHERE ExamID = ?', [
    exam.examName,
    exam.subject,
    exam.startTime,
    exam.endTime,
    exam.totalScore,
    exam.isCancelled ? 1 : 0,
    exam.examId
  ]);
}

export async function deleteExam(examId: number): Promise<void> {
  await pool.execute('DELETE FROM Exams WHERE ExamID = ?', [examId]);
}
