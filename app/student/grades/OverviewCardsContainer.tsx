'use client';

import { Box, Grid, Paper, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// 假设统计数据
const statistics = {
  averageGrade: 76.3, // 平均分数
  highestGrade: 98, // 最高分数
  lowestGrade: 59, // 最低分数
  passRate: 0.85, // 及格率
  failingSubjects: 2, // 不及格科目数
  totalSubjects: 10, // 科目总数
};

// 统计数据中文描述
const statsDescriptions: { [key: string] : string } = {
  averageGrade: '平均分数',
  highestGrade: '最高分数',
  lowestGrade: '最低分数',
  passRate: '及格率',
  failingSubjects: '不及格科目数',
  totalSubjects: '科目总数',
};

// 简单的格式化函数
const formatStatValue = (key: any, value: any) => {
  switch (key) {
    case 'averageGrade':
    case 'highestGrade':
    case 'lowestGrade':
      return value.toFixed(1);
    case 'passRate':
      return (value * 100).toFixed(0) + '%';
    default:
      return value;
  }
};

// 概览卡片组件
const OverviewCard = ({ statKey, statValue } : { statKey: string, statValue: number }) => (
  <Grid item xs={12} sm={4} md={2}>
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6">{statsDescriptions[statKey]}</Typography>
      <Typography variant="h3">{formatStatValue(statKey, statValue)}</Typography>
    </Paper>
  </Grid>
);

// 容器组件，包含多个概览卡片
const OverviewCardsContainer = () => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    {Object.entries(statistics).map(([key, value]) => (
      <OverviewCard key={key} statKey={key} statValue={value} />
    ))}
  </Grid>
);

export default OverviewCardsContainer;