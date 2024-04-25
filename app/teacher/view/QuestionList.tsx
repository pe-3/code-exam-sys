import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from '@mui/material';
import { red, yellow, green } from '@mui/material/colors';
import EventNoteIcon from '@mui/icons-material/EventNote'; // 引入图标

const QuestionList = () => {
  // 假设的题目数据
  const questions = [
    { title: "题目 1", passRate: 50 },
    { title: "题目 2", passRate: 80 },
    { title: "题目 3", passRate: 75 },
    // ...更多题目
  ];

  // 获取通过率对应的颜色
  const getPassRateColor = (passRate: number) => {
    if (passRate < 60) return red[500]; // 难度高
    if (passRate < 80) return yellow[600]; // 难度中
    return green[500]; // 难度低
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>题目</TableCell>
              <TableCell align="right">通过率 (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {question.title}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{fontWeight: 'bold', color: getPassRateColor(question.passRate) }}
                >
                  {`${question.passRate}%`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  );
};

export default QuestionList;