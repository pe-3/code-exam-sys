// exam.repository.ts
import { RowDataPacket } from 'mysql2';
import pool from '../pool'; // replace with actual file path
import { ExamModel } from './exam.type';

export async function getAllExams(): Promise<ExamModel []> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM Exams');
  return rows.map(row => ({
    examId: row.ExamID,
    examName: row.ExamName,
    subject: row.Subject,
    startTime: row.StartTime,
    endTime: row.EndTime,
    totalScore: row.TotalScore,
    isCancelled: row.IsCancelled === 1
  }));
}

export async function getExamById(examId: number): Promise<ExamModel | null> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM Exams WHERE ExamID = ?', [examId]);
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    examId: row.ExamID,
    examName: row.ExamName,
    subject: row.Subject,
    startTime: row.StartTime,
    endTime: row.EndTime,
    totalScore: row.TotalScore,
    isCancelled: row.IsCancelled === 1
  };
}

export async function createExam(exam: Omit<ExamModel, 'examId'>): Promise<void> {
  await pool.execute('INSERT INTO Exams (ExamName, Subject, StartTime, EndTime, TotalScore, IsCancelled) VALUES (?, ?, ?, ?, ?, ?)', [
    exam.examName,
    exam.subject,
    exam.startTime,
    exam.endTime,
    exam.totalScore,
    exam.isCancelled ? 1 : 0
  ]);
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