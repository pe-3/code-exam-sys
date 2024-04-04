/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OrCvQ3mBHeM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link";

function InteractiveTitle() {
  return (
    <h1 className="text-5xl font-extrabold text-center mb-8">
      <span className="underline-animation">码测：在线编程考试平台</span>
    </h1>
  );
}

export default function HomeComponent() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="max-w-6xl mx-auto p-8">
        {/* <h1 className="text-5xl font-extrabold text-center mb-8">码测：在线编程考试平台</h1> */}
        <InteractiveTitle />
        <p className="text-center text-lg mb-12">为学生和教育工作者提供尖端的考试管理工具。</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold mb-4">学生专属</h2>
            <p className="text-gray-700 text-center">
              体验具有实时编码环境和即时反馈的考试。从多项选择题到动手编码挑战，探索各种题型。
            </p>
            <SchoolIcon className="text-4xl text-blue-500 mt-4" />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold mb-4">教育工作者专属</h2>
            <p className="text-gray-700 text-center">
              使用一套先进功能轻松制作和管理考试。定制测试，组织问题，并选择手动或自动评分，以配合您的教学方法。
            </p>
            <SchoolIcon className="text-4xl text-green-500 mt-4" />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold mb-4">轻松评分</h2>
            <p className="text-gray-700 text-center">
              我们的系统支持自动和手动评分。自动评分提供即时反馈，手动评估提供个性化回应，确保评分体验流畅。
            </p>
            <ScalingIcon className="text-4xl text-purple-500 mt-4" />
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href='/auth'>
            <button
              className="bg-black text-white py-2 px-4 rounded mr-4 hover:bg-gray-800 transition-colors duration-200"
            >
              登录/注册
            </button>
          </Link>
          <Link href='/code-editor'>
            <button
              className="bg-white text-black py-2 px-4 rounded border border-gray-800 hover:bg-gray-200 transition-colors duration-200"
            >
              敲点代码
            </button>
          </Link>
        </div>
        <footer className="text-center mt-12">
          <p className="text-gray-600">© 2024 在线编程考试平台。保留所有权利。</p>
        </footer>
      </div>
    </div>
  )
}

// SVG图标组件和SchoolIcon组件省略，保持不变

function ScalingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 3 9 15" />
      <path d="M12 3H3v18h18v-9" />
      <path d="M16 3h5v5" />
      <path d="M14 15H9v-5" />
    </svg>
  )
}


function SchoolIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 6 8-4 8 4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 5v17" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  )
}
