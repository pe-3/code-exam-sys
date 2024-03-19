export interface ExamModel {
  examId: number;
  examName: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  totalScore: number;
  isCancelled: boolean;
};