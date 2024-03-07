import React from 'react';
import TypingCode from './components/TypinCode';
import CodeAnimation from './components/CodeAnimation'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* 代码字符动画背景 */}
      {/* <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <CodeAnimation />
      </div> */}
      {/* 在 Next.js 创意标题 */}
      {/* <h1 className="text-2xl font-bold text-center mr-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-300">
        Code Exam System
      </h1> */}
      {/* 在 Next.js 页面组件中使用这段代码 */}
      {/* <div className='mr-10'>
        <h1 className="text-2xl font-bold text-gray-700 mr-10 fade-in bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-300">
          Code Exam System
        </h1>
        <TypingCode />
      </div> */}
      {/* 内容容器，对背景进行遮罩，以便文本可读 */}
      <div>
        {children}
      </div>
    </div>
  );
}

