'use server';

import { getItemInVisitor } from "@/storage";
import { getStudentAllExamResults } from "./sql";
import { getTokenFromCookie } from "@/app/token";
import { UserModel } from "../user/user.type";
import { getAllExams } from "../exam/sql";
import { ExamResultModel } from "./result.type";

export interface OverviewModal {
  averageScore: string;
  maxScore: number;
  minScore: number;
  passRate: string;
  failedExamCount: number;
  totalExamCount: number;
  results: ExamResultModel[];
  subjects: { [key: string]: ExamResultModel[] }
}

// 获取学生的成绩预览
export async function getGradeOverview(): Promise<OverviewModal> {
  const salt = await getItemInVisitor('TOKEN_SALT');
  const user = await getTokenFromCookie(salt) as UserModel;

  const results = await getStudentAllExamResults({
    student_id: user.id as number,
  });

  // 1. 平均分数
  const averageScore = (results.reduce((acc, cur) => acc + cur.ExamScore, 0) / results.length).toFixed(1);
  // 2. 最高分数
  const maxScore = results.reduce((acc, cur) => acc > cur.ExamScore ? acc : cur.ExamScore, 0);
  // 3. 最低分数
  const minScore = results.reduce((acc, cur) => acc < cur.ExamScore ? acc : cur.ExamScore, 500);
  // 4. 及格率
  const passRate = (results.reduce((acc, cur) => acc + (cur.ExamScore >= 60 ? 1 : 0), 0) / results.length).toFixed(3);
  // 5. 不及格考试数
  const failedExamCount = results.reduce((acc, cur) => acc + (cur.ExamScore < 60 ? 1 : 0), 0);
  // 6. 考试总数
  const totalExamCount = results.length;
  // 7. 所有科目
  const subjects = results.reduce((pre: { [key: string]: ExamResultModel[] }, cur) => {
    if (!pre[cur.Subject]) {
      pre[cur.Subject] = [cur];
    } else {
      pre[cur.Subject].push(cur);
    }
    return pre;
  }, {});


  return {
    averageScore,
    maxScore,
    minScore,
    passRate,
    failedExamCount,
    totalExamCount,
    results: results.map((item) => ({
      ...item,
      isPass: item.ExamScore >= 60 ? true : false
    })),
    subjects
  };
}