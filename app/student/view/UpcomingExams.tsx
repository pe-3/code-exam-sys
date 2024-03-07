'use client';

import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote'; // 引入图标

// 模拟考试数据
const exams = [
  { id: 1, name: 'Algebra', date: '2024-03-15', time: '09:00 AM' },
  { id: 2, name: 'Physics', date: '2024-03-17', time: '10:00 AM' },
  { id: 3, name: 'Chemistry', date: '2024-03-19', time: '11:00 AM' },
  { id: 4, name: 'Biology', date: '2024-03-21', time: '01:00 PM' },
  { id: 5, name: 'English Literature', date: '2024-03-23', time: '02:00 PM' },
  { id: 6, name: 'World History', date: '2024-03-25', time: '03:00 PM' },
  { id: 7, name: 'Geography', date: '2024-03-27', time: '09:00 AM' },
  { id: 8, name: 'Art', date: '2024-03-29', time: '10:00 AM' },
  { id: 9, name: 'Music Theory', date: '2024-03-31', time: '11:00 AM' },
  { id: 10, name: 'Computer Science', date: '2024-04-02', time: '01:00 PM' },
  { id: 11, name: 'Philosophy', date: '2024-04-04', time: '02:00 PM' },
  { id: 12, name: 'Economics', date: '2024-04-06', time: '02:00 PM' },
  { id: 13, name: 'Psychology', date: '2024-04-08', time: '03:00 PM' },
  { id: 14, name: 'Sociology', date: '2024-04-10', time: '09:00 AM' },
  { id: 15, name: 'Political Science', date: '2024-04-12', time: '10:00 AM' },
  // ... 更多考试
];

const ExamTable = () => {

  const [topShadowVisible, setTopShadowVisible] = useState(false);
  const [bottomShadowVisible, setBottomShadowVisible] = useState(false);

  // 用于处理滚动事件并更新阴影可见性
  const handleScroll = (event: any) => {
    const element = event.currentTarget;
    // 更新顶部阴影
    const showTopShadow = element.scrollTop > 0;
    setTopShadowVisible(showTopShadow);
    // 更新底部阴影
    const showBottomShadow = element.scrollHeight - element.scrollTop > element.clientHeight;
    setBottomShadowVisible(showBottomShadow);
  };


  return (
    <Container maxWidth="md" sx={{ marginY: 5 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <EventNoteIcon color='primary' sx={{ fontSize: 45, mr: 1 }} /> 未开始的考试
      </Typography>
      <Box sx={{ width: '100%', mt: 2, position: 'relative' }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: '300px', overflow: 'auto', }} // 根据需要设置合适的高度
          onScroll={handleScroll}
        >
          {/* 动态顶部阴影 */}
          <Box sx={{
            display: topShadowVisible ? 'block' : 'none',
            position: 'absolute',
            top: 57,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)',
            zIndex: 100
          }} />
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Exam Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* 动态底部阴影 */}
          <Box sx={{
            display: bottomShadowVisible ? 'block' : 'none',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)'
          }} />
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ExamTable;