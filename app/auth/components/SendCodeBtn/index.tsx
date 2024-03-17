// SendVerificationCodeButton.js
'use client';

import React, { useEffect, useState } from 'react';
import { useCountdown } from "@/hooks";
import { Button } from '@/components/ui/button';
import storage from '@/storage';

const CODE_MAIL_COUNT_DOWN = 'CODE_MAIL_COUNT_DOWN';

const SendVerificationCodeButton = ({ sendVerificationCode } : { sendVerificationCode: (...args: any[]) => Promise<any> }) => {
  const [date, setDate] = useState(storage.getItem(CODE_MAIL_COUNT_DOWN) || new Date());
  const { seconds } = useCountdown(date);

  const handleClick = async () => {
    const isSent = await sendVerificationCode();
    if (isSent) {
      const date = new Date(Date.now() + 60 * 1000);
      storage.setItem(CODE_MAIL_COUNT_DOWN, date);
      setDate(date);
    }
  };
  return (<Button disabled={seconds > 0} className="flex-1 ml-4" onClick={handleClick}>{ seconds > 0 ?  `剩余 ${seconds}s` : '发送' }</Button>)
};

export default SendVerificationCodeButton;