'use server';

import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../pool";
import { ExamResultModel } from "./result.type";

// 插入考试成绩
export async function insertStudentExamResult({
  studentId, examId, examResult, examScore
}: {
  studentId: number;
  examId: number;
  examResult: string;
  examScore: number;
}) {
  try {
    const sql = `INSERT INTO StudentExamResults (student_id, ExamId, ExamResult, ExamScore, SubmitTime) VALUES (?, ?, ?, ?, ?)`;
    const SubmitTime = (Date.now() / 1000).toFixed().toString();
    const [result] = await pool.query(sql, [studentId, examId, examResult, examScore, SubmitTime]) as ResultSetHeader[];
    return result?.affectedRows === 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// 根据ID 获取
export async function getExamResultById(id: number) {
  try {
    const sql = `SELECT * FROM StudentExamResults JOIN Exams ON StudentExamResults.ExamId = Exams.ExamId WHERE StudentExamResults.id = ?`;
    const [result] = await pool.query(sql, [id]) as RowDataPacket[][];
    return result as ExamResultModel[];
  } catch (err) {
    console.error(err);
    return [];
  }
}

// 获取学生所有考试的成绩
export async function getStudentAllExamResults({
  student_id
}: {
  student_id: number;
}) {
  try {
    // const sql = `SELECT * FROM StudentExamResults WHERE student_id = ?`;
    // 联表查询
    const sql = `SELECT * FROM StudentExamResults JOIN Exams ON StudentExamResults.ExamId = Exams.ExamId WHERE StudentExamResults.student_id = ?`;
    
    const [results] = await pool.query(sql, [student_id]) as RowDataPacket[][];

    return results as ExamResultModel[];
  }
  catch (err) {
    console.error(err);
    return [];
  }
}

// 获取学生某个考试的考试结果
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

// 获取所有学生考试结果
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

// 更新成绩
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

// 删除成绩记录
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