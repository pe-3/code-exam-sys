'use client';

import React, { useState } from 'react';
import { useCountdown } from "@/hooks";
import { Button } from '@/components/ui/button';
import { setItemInVisitor } from '@/storage';

const CODE_MAIL_COUNT_DOWN = 'CODE_MAIL_COUNT_DOWN';
const useCountDownStorge:  (
  initDate: Date
) => [Date, (date: Date) => void] = (initDate) => {
  const [date, setDate] = useState(initDate ? new Date(initDate) : new Date());

  return [date, async function(date: Date) {
    setItemInVisitor?.('CODE_MAIL_COUNT_DOWN', date);
    setDate(date);
  }];
}

const  sendVerificationCode: (...args: any[]) => Promise<any> = async () => true
     
const SendVerificationCodeButton = (
  {
    initDate
  }: {
    initDate: Date;
  }
) => {
  const [date, setDate] = useCountDownStorge(initDate);
  const { seconds } = useCountdown(date);

  const handleClick = async (e: any) => {
    e?.preventDefault();
    const isSent = await sendVerificationCode();
    if (isSent) {
      setDate(new Date(Date.now() + 60 * 1000));
    }
  };

  return (<Button disabled={seconds > 0} className="flex-1 ml-4" onClick={handleClick}>{ seconds > 0 ?  `剩余 ${seconds}s` : '发送' }</Button>)
};

export default SendVerificationCodeButton;