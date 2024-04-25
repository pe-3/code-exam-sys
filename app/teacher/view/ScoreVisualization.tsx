'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// 单门成绩的不同时期数据
const data = {
  series: [{
    name: "成绩",
    data: [73, 82, 90, 78, 85, 88, 92] // 假设这是一个学生在一门科目不同时期的成绩
  }],
  options: {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '数学成绩趋势',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // 在 grid 中交替显示不同的背景颜色
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
    },
    yaxis: {
      min: 50,
      max: 100,
      tickAmount: 5,
      title: {
        text: '分数'
      }
    }
  },
};

function ScoreTrendLineChart() {
  return (
    <Paper sx={{ margin: 'auto', p: 3 }}>
      <Typography variant="h6" component="div" gutterBottom>
        <TrendingUpIcon color='primary' sx={{ mr: 1, fontSize: 35 }} />
        单门课程成绩趋势分析
      </Typography>
      <ReactApexChart
        options={data.options as any}
        series={data.series}
        type="line"
        height={350}
      />
    </Paper>
  );
}

export default ScoreTrendLineChart;