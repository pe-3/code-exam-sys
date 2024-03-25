// 定义考试状态枚举
export enum ExamStatus {
  UNEDITED = 0,
  UNPUBLISHED,
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED
}

// 状态文案映射对象
export const ExamStatusDescriptions: { [key in ExamStatus]: string } = {
  [ExamStatus.UNEDITED]: "未编辑",
  [ExamStatus.UNPUBLISHED]: "未发布",
  [ExamStatus.NOT_STARTED]: "未开始",
  [ExamStatus.IN_PROGRESS]: "进行中",
  [ExamStatus.FINISHED]: "已结束"
};

// 状态颜色映射对象
export const ExamStatusColors: { [key in ExamStatus]: string } = {
  [ExamStatus.UNEDITED]: "#808080", // 灰色，表示未编辑
  [ExamStatus.UNPUBLISHED]: "#ffcc00", // 黄色，表示未发布
  [ExamStatus.NOT_STARTED]: "#0099ff", // 蓝色，表示未开始
  [ExamStatus.IN_PROGRESS]: "#33cc33", // 绿色，表示进行中
  [ExamStatus.FINISHED]: "#ff3333" // 红色，表示已结束
};


export interface ExamModel {
  ExamId: number;
  ExamName: string;
  Subject: string;
  StartTime: string;
  EndTime: string;
  TotalScore: number;
  Status: ExamStatus
};