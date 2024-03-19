'use client';
import React, { useState } from 'react';
import { useCountdown } from "@/hooks";
import { Button } from '@/components/ui/button';
import { setItemInVisitor } from '@/storage';
import { useToast } from '@chakra-ui/react';
import UiToast, { EToastType } from '../Toast';
import sendVerificationCode from './sendVerificationCode';

const useCountDownStorge:  (
  initDate: Date
) => [Date, (date: Date) => void] = (initDate) => {
  const [date, setDate] = useState(initDate ? new Date(initDate) : new Date());

  return [date, async function(date: Date) {
    setItemInVisitor?.('CODE_MAIL_COUNT_DOWN', date);
    setDate(date);
  }];
}
     
const SendCodeBtn = (
  {
    initDate
  }: {
    initDate: Date;
  }
) => {
  const [date, setDate] = useCountDownStorge(initDate);
  const { seconds } = useCountdown(date);

  const toast = useToast({
    position: 'top-right',
    duration: 9000
  });

  const handleClick = async (e: any) => {
    e?.preventDefault();

    const email = document.getElementById('email') as HTMLInputElement;

    const isSent = await sendVerificationCode(email?.value);

    if (isSent) {
      setDate(new Date(Date.now() + 60 * 1000));
      toast({
        render: () => (
          <UiToast
            title="验证码发送成功"
            description="请前往邮箱查看，并尽快完成验证"
            type={EToastType.Success}
          />
        )
      })
    } else {
      // 发送失败
      toast({
        render: () => (
          <UiToast
            title="验证码发送失败"
            description="你没有填写正确的邮箱或出了点小差错，请重试"
            type={EToastType.Error}
          />
        )
      })
    }
  };

  return (<Button disabled={seconds > 0} className="flex-1 ml-4" onClick={handleClick}>{ seconds > 0 ?  `剩余 ${seconds}s` : '发送' }</Button>)
};

export default SendCodeBtn;