import React, { useState, useEffect } from 'react';

// useCountdown Hook
export const useCountdown = (targetDate: Date) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());


  useEffect(() => {
    // 初始化倒计时
    let temp = countDownDate - new Date().getTime();
    setCountDown(temp);

    // 定时器倒计时
    const interval = setInterval(() => {
      if (temp <= 0) {
        clearInterval(interval);
      } else {
        temp = countDownDate - new Date().getTime();
        setCountDown(temp);
      }
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

// Helper function to convert time to return values
const getReturnValues = (countDown: number) => {
  // Calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {days, hours, minutes, seconds};
};
