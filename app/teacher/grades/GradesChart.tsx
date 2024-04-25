'use client';

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GradesChart = ({ gradesData } : any) => {
  // 准备数据和配置项
  const options = {
    charts: {
      type: 'line',
      toolbar: {
        show: false, // 隐藏工具条
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: gradesData.map((data : any) => data.subject), // X轴显示科目
    },
    yaxis: {
      title: {
        text: '分数', // Y轴标题
      },
    },
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: '科目成绩变化',
      align: 'left',
    },
  };

  // ApexCharts 需要这样的数据格式
  const series = [{
    name: '成绩',
    data: gradesData.map((data : any) => data.grade), // 数据点
  }];

  return (
    <div id="grades-chart">
      <ReactApexChart options={options as any} series={series} type="line" height={350} />
    </div>
  );
};

export default GradesChart;