import { ExamModel } from "../exam/exam.type";

export type ExamResultModel = {
  id: number;
  student_id: number;
  ExamId: number;
  ExamResult: string;
  ExamScore: number;  
  isPass: boolean;
  SubmitTime: String;
} & ExamModel