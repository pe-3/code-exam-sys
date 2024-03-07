'use client';

import React, { useEffect, useState } from 'react';
import styles from './TypingCode.module.css'; // 假设你已经创建了相应的CSS文件

const fullText = 
`immport { Today, Month, Year } from 'this/world';

async function main() {
  const nextDay = await Today;
  // ... do what ?
  const nextMonth = await Month;
  // ... what goal do you want to achieve?
  const nextYear = await Year;
  // ... what do you wanna be?
}

function Page() {
  useEffect(() => {}, [])

  return (
    <body>
      <h1>
        choosing a way or just go with the flow?
      </h1>
      <button onClick={main}>
        press button to start...
      </button>
    </body>
  )
}`;

const TypingCode = () => {

  const [code, setCode] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setCode((c) => c + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.typingContainer}>
      <pre className={styles.typingCode}>
        {code}
        <span className={styles.cursor} />
      </pre>
    </div>
  );
};

export default TypingCode;