CREATE TABLE Exams (
    ExamId INT PRIMARY KEY,
    ExamName VARCHAR(255) NOT NULL,
    Subject VARCHAR(255) NOT NULL,
    StartTime TIMESTAMP NOT NULL,
    EndTime TIMESTAMP NOT NULL,
    Status INT(1) NOT NULL ZEROFILL COMMENT '0:未编辑 1:未发布 2:未开始 3:进行中 4:已结束',
);