import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../pool";

export async function insertStudentExamResult({
  studentId, examId, examResult
}: {
  studentId: number;
  examId: number;
  examResult: string;
}) {
  try {
    const sql = `INSERT INTO StudentExamResults (student_id, ExamId, ExamResult) VALUES (?, ?, ?)`;
    const [result] = await pool.query(sql, [studentId, examId, examResult]) as ResultSetHeader[];
    return result?.affectedRows === 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getStudentExamResult({
  ExamId,
  student_id
}: {
  ExamId: number;
  student_id: number;
}) {
  try {
    const sql = `SELECT * FROM StudentExamResults WHERE ExamId = ? AND student_id = ?`;
    const [result] = await pool.query(sql, [ExamId, student_id]) as RowDataPacket[][];
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAllStudentExamResults() {
  try {
    const sql = `SELECT * FROM StudentExamResults`;
    const [results] = await pool.query(sql);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateStudentExamResult({
  studentId,
  examId,
  examResult
}: {
  studentId: number;
  examId: number;
  examResult: string;
}) {
  try {
    const sql = `UPDATE StudentExamResults SET ? WHERE ExamId = ? AND student_id = ?`;
    const [result] = await pool.query(sql, [{ examResult }, examId, studentId]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteStudentExamResult({
  id
}: {
  id: number;
}) {
  try {
    const sql = `DELETE FROM StudentExamResults WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    console.log(`Deleted student exam result with ID: ${id}`);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}