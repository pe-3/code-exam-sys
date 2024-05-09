'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OzdkkgB435W
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ResponsiveLine } from "@nivo/line"
import { Calendar } from "@/components/ui/calendar"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { useCountDown } from 'ahooks';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sMtW8rPSx0F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import TopNav from "../layout/TopNav";
import { queryExamByQuery, startExam } from "@/sql/exam/actions";
import { useEffect, useState } from "react";
import { getComingExam, getComingExams, getCurrentExam, getPastExams } from "@/sql/exam/sql";
import { ExamModel, ExamStatus } from "@/sql/exam/exam.type";
import { Skeleton, useToast } from "@chakra-ui/react";
import { FormattedRes } from "ahooks/lib/useCountDown";
import UiToast, { EToastType } from "../auth/components/Toast";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ExamResultModel } from "@/sql/exam-result/result.type";
import { FilterModal } from "../student/grades/FilterBar";
import { OverviewModal, getGradeOverview } from "@/sql/exam-result/actions";

export default function Component() {
  return (
    <div className="bg-white p-8">
      <div className="mb-8">
        <CurrentExam />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">单门课程成绩走势分析</h2>
        <CurvedlineChart />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">最近考试</h2>
        <RecentExams />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">过往考试</h2>
        <HistoryExams />
      </div>
    </div>
  )
}

function getCountDownStr(res: FormattedRes) {
  const { days, hours, minutes, seconds } = res;
  const dayStr = days > 0 ? `${days}天` : '';
  const hourStr = hours > 0 ? `${hours}小时` : '';
  const minuteStr = minutes > 0 ? `${minutes}分钟` : '';
  const secondStr = seconds > 0 ? `${seconds}秒` : '';
  return `${dayStr}${hourStr}${minuteStr}${secondStr}`;
}

// 即将开始的考试
export function CurrentExam({
  forStudent
}: {
  forStudent?: boolean;
}) {
  const toast = useToast({
    duration: 3000,
    position: 'top-right'
  })

  const [comminExam, setComingExam] = useState<ExamModel>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const curExam = await getCurrentExam();
      if (curExam) {
        return setComingExam(curExam);
      }

      // 获取最近的一场考试
      const exam = await getComingExam();
      setComingExam(exam);
    })()
  }, []);

  function CountDownPart({
    comminExam
  }: {
    comminExam: ExamModel
  }) {
    // 1. 开始倒计时

    const excuteText = forStudent ? '考试' : '监考'

    const [countdown, res] = useCountDown({ targetDate: new Date(Number(comminExam.StartTime) * 1000)});

    const countdownStr = <span className="text-red-500">{getCountDownStr(res)}</span>;

    const isOk = countdown === 0;

    function EndCountDown() {
      // 2. 结束倒计时
      const EndTime = new Date(Number(comminExam.StartTime) * 1000 + Number(comminExam.EndTime) * 60 * 1000);
      const [countdown, res] = useCountDown({ targetDate: EndTime });
      const countdownStr = <span className="text-red-500">{getCountDownStr(res)}</span>;
      const isOk = countdown === 0;

      return <>
        {isOk ? <p className="text-sm text-red-500 ">考试已结束</p> : <p className="text-sm text-gray-500 ">考试结束倒计时 {countdownStr}</p>}
        <Button disabled={isOk} className="mt-4 bg-blue-600 text-white" onClick={handleStart}>开始{excuteText}</Button>
      </>
    }

    async function handleStart() {
      if (comminExam.Status === ExamStatus.IN_PROGRESS) {
        forStudent || toast({
          render: () => (
            <UiToast
              title={`开始${excuteText}成功`}
              description={`${excuteText}已开始，请尽快督促学生进行考试`}
              type={EToastType.Success}
            />
          )
        });
        if (forStudent) {
          return router.push(`/in-exam?ExamId=${comminExam.ExamId}&ExamName=${comminExam.ExamName}`)
        }
        return router.push(`/exam-detail?ExamId=${comminExam.ExamId}&ExamName=${comminExam.ExamName}`)
      }

      try {
        const isAffected = await startExam({
          ExamId: comminExam.ExamId,
        });
        if (isAffected) {
          toast({
            render: () => (
              <UiToast
                title={`开始${excuteText}成功`}
                description={`${excuteText}已开始，请尽快${forStudent || '督促学生'}进行考试`}
                type={EToastType.Success}
              />
            )
          });
          return router.push(`/in-exam?ExamId=${comminExam.ExamId}&ExamName=${comminExam.ExamName}`);
        } else {
          toast({
            render: () => (
              <UiToast
                title={`开始${excuteText}失败`}
                description="请稍后重试"
                type={EToastType.Error}
              />
            )
          });
        }
      } catch (err) {
        toast({
          render: () => (
            <UiToast
              title="出错了"
              description="啊啊啊啊啊啊，怎么办怎么办"
              type={EToastType.Error}
            />
          )
        });
      }
    }

    return <>
      {!isOk ?<>
        <p className="text-sm text-gray-500 ">考试开始倒计时 {countdownStr}</p>
          <Button disabled={!isOk} className="mt-4 bg-blue-600 text-white" onClick={handleStart}>开始{excuteText}</Button>
        </> : <EndCountDown />}
      </>
    }
  
  return <>
    {
      comminExam
      ? <>
        <h1 className="text-2xl font-bold mb-2">{comminExam.ExamName} 即将开始</h1>
        <p className="text-sm text-gray-500 mb-4">考试时间：{new Date(Number(comminExam.StartTime) * 1000).toDateString()}</p>
        <CountDownPart comminExam={comminExam} />
      </>
      : <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </div>
    }
  </>
}

// 最近考试
export function RecentExams({
  forStudent
}: {
  forStudent?: boolean;
}) {
  const [exams, setExams] = useState<ExamModel[]>([]);

  useEffect(() => {
    (async () => {
      const exams = await getComingExams();
      setExams(exams.reverse());
    })();
  }, []);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>考试名称</TableHead>
          <TableHead>总分</TableHead>
          <TableHead>日期</TableHead>
          <TableHead>开始倒计时</TableHead>
          {forStudent || <TableHead>操作</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams.length 
        ? exams.map((exam, idx) => 
          <TableRow key={idx} className={idx === 0 ? 'text-red-500' : ''}>
            <TableCell>{exam.ExamName}</TableCell>
            <TableCell className="text-green-500 font-semibold">{exam.TotalScore}</TableCell>
            <TableCell>{dayjs(new Date(Number(exam.StartTime) * 1000)).format('YYYY/MM/DD HH:mm')}</TableCell>
            <TableCell>
              <span className="text-red-500">
                <StartCountDown
                  targetDate={new Date(Number(exam.StartTime) * 1000)}
                  endDate={new Date(Number(exam.StartTime) * 1000 + Number(exam.EndTime) * 60 * 1000)}
                />
              </span>
            </TableCell>
            {forStudent ||<TableCell>
              <Button >查看详情</Button>
            </TableCell>}
          </TableRow>) 
        : <TableRow>
            <TableCell className="align-center">最近暂无考试</TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  )
}

// 折线
// 成绩可视化
export function CurvedlineChart() {
  const [filter, setFilter] = useState({});
  const [overview, setOverview] = useState<OverviewModal | null>(null);
  const [results, setReuslts] = useState<ExamResultModel[]>([]);

  useEffect(() => {
    (async () => {
      const overview = await getGradeOverview();
      setOverview(overview);
    })()
  }, []);

  function filterResultsByFilter(filter: FilterModal) {
    if (!overview) return [];

    const {
      subjects,
    } = overview;

    return Object.entries(subjects).map(([subject, exams]) => {
      return {
        id: subject,
        data: exams.map((exam) => {
          return {
            y: exam.ExamScore,
            x: dayjs(new Date(Number(exam.SubmitTime) * 1000)).format('YYYY-MM-DD HH:mm'),
            exam
          }
        }),
      }
    })
  }

  return (
    <>
      {!!overview && <>
        {/* <FilterBar overview={overview}  onFilterChange={(filter) => {
          setReuslts([]);
        }} /> */}
        <div className="w-full h-[300px]">
          <ResponsiveLine
            data={filterResultsByFilter(filter)}
            markers={[
              {
                  axis: 'y',
                  value: 60, // 及格分数值
                  lineStyle: { stroke: '#ff0000', strokeWidth: 2 }, // 及格线样式
                  legend: '及格线',
                  legendOrientation: 'horizontal',
                  textStyle: { // 及格线文本样式
                      fill: '#ff0000', // 字体颜色
                      fontSize: 12, // 字体大小
                      fontWeight: 'bold', // 字体加粗
                      alignmentBaseline: 'middle',
                  },
              },
            ]}
            margin={{ top: 10, right: 10, bottom: 40, left: 50 }}
            xScale={{
              type: "point",
            }}
            yScale={{
              type: "linear",
              min: 0,
              max: 100,
            }}
            curve="linear"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 16,
            }}
            axisLeft={{
              tickSize: 0,
              tickValues: 5,
              tickPadding: 16,
            }}
            colors={["#2563eb", "#e11d48"]}
            pointSize={6}
            useMesh={true}
            gridYValues={6}
            theme={{
              grid: {
                line: {
                  stroke: "#f3f4f6",
                },
              },
            }}
            tooltip={({ point }) => {
              const exam = point.data?.exam as ExamResultModel;
              
              return <>
                <ul className="list-none p-4 rounded-lg shadow-md bg-white max-w-xs text-sm">
                  <li className="text-gray-700 py-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-600 font-normal">科目：</span>
                    {exam.Subject}
                  </li>
                  <li className="text-gray-700 py-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-600 font-normal">成绩：</span>
                    {exam.ExamScore}
                  </li>
                  <li className="text-gray-700 py-1 flex items-center">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-600 font-normal">时间：</span>
                    {dayjs(new Date(Number(exam.SubmitTime) * 1000)).format('YYYY/MM/DD HH:mm')}
                  </li>
                </ul>

              </>
            }}
            role="application"
          />
        </div>
      </>}
      {!!overview || <>
        <Skeleton height={'40px'} className="my-8" />
        <Skeleton height={'200px'} className="my-8" />
      </>}
    </>

  )
}

function StartCountDown({
  targetDate,
  endDate
}: {
  targetDate: Date;
  endDate: Date;
}) {
  const [countdown, formatRes] = useCountDown({
    targetDate
  });

 
  return countdown > 0 ? getCountDownStr(formatRes) : <>
    已开始：<EndCountDown targetDate={endDate} /> 结束
  </>;
}

function EndCountDown({
  targetDate
}: {
  targetDate: Date;
}) {
  const [countdown, formatRes] = useCountDown({
    targetDate
  });

  return countdown > 0 ? getCountDownStr(formatRes) : '已结束';
}

// 过往考试
function HistoryExams() {
  const [exams, setExams] = useState<ExamModel[]>([]);

  useEffect(() => {
    (async () => {
      const exams = await getPastExams();
      setExams(exams);
    })();
  }, []);
  
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>考试名称</TableHead>
          <TableHead>总分</TableHead>
          <TableHead>日期</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams.length 
        ? exams.map((exam, idx) => 
          <TableRow key={idx}>
            <TableCell>{exam.ExamName}</TableCell>
            <TableCell className="text-green-500 font-semibold">{exam.TotalScore}</TableCell>
            <TableCell>{dayjs(new Date(Number(exam.StartTime) * 1000)).format('YYYY/MM/DD HH:mm')}</TableCell>
            <TableCell>
              <Button onClick={() => {
                router.push(`/exam-detail?ExamId=${exam.ExamId}&ExamName=${exam.ExamName}`)
              }}>查看详情</Button>
            </TableCell>
          </TableRow>) 
        : <TableRow>
            <TableCell className="align-center">暂无过往考试</TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  )
}