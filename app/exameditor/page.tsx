/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aJAZHj1ZGXd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import MutipleChoice from "./tab-content/multiple-choice";
import FillInTheBlank from "./tab-content/fill-in-the-blank";
import ShortAnswer from "./tab-content/short-answer";
import Programming from "./tab-content/programming";
const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Component() {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100 p-4">
      <div className="flex flex-row h-[calc(100vh-1.5rem)]">
        <div className="flex flex-1 flex-col p-4 h-[100%] ">
          <div className="bg-white rounded-sm shadow p-8 h-[100%] overflow-auto">
            <header className="flex items-center justify-between pb-4">
              <h1 className="text-2xl font-bold">新考试</h1>
            </header>
            <div className="grid gap-4 pt-4">
              {/* 多项选择题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold">一、多项选择题</h2>
                <div className="flex items-start my-4 gap-4">
                  <div className="mt-1">1.</div> <MutipleChoice />
                </div>
                <div className="flex items-start my-2 gap-4">
                  <div className="mt-1 text-gray-700">2.</div> 
                  <Button size="sm" variant="outline">
                    +
                  </Button>
                </div>
                
              </div>
              {/* 填空题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold">二、填空题</h2>
                <FillInTheBlank />
                <Button className="mt-2" size="sm">
                  +
                </Button>
              </div>
              {/* 简答题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold">三、简答题</h2>
                <ShortAnswer />
                <Button className="mt-2" size="sm">
                  +
                </Button>
              </div>
              {/* 编程题卡片 */}
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold">四、编程题</h2>
                <Programming />
                <Button className="mt-2" size="sm">
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* 右侧考试题目导航 */}
        <div className="p-4 h-[calc(100vh-1.5rem)]">
          <div className="flex-1 p-4 bg-white rounded-sm shadow p-8 h-[100%] overflow-auto">
            {/* 题型导航 */}
            <Button size="sm" variant="ghost">
              一
            </Button>
            {/* 题型导航下面的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {questionNumbers.map(num => (
                <Button key={num} className="w-10 h-10 bg-slate-200">
                  {num}
                </Button>
              ))}
            </div>

            <Button size="sm" variant="ghost">
              二
            </Button>
            {/* 题型导航下的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {questionNumbers.map(num => (
                <Button key={num} className="w-10 h-10 bg-slate-200">
                  {num}
                </Button>
              ))}
            </div>

            <Button size="sm" variant="ghost">
              三
            </Button>
            {/* 题型导航下的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {questionNumbers.map(num => (
                <Button key={num} className="w-10 h-10 bg-slate-200">
                  {num}
                </Button>
              ))}
            </div>

            <Button size="sm" variant="ghost">
              四
            </Button>
            {/* 题型导航下的数字按钮 */}
            <div className="grid grid-cols-4 gap-2 m-1">
              {questionNumbers.map(num => (
                <Button key={num} className="w-10 h-10 bg-slate-200">
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

