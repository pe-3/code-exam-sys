'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/29k98a1uCJG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { Button } from "@/components/ui/button"
import FilterBar, { FilterModal } from "./FilterBar";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { ExamModel } from "@/sql/exam/exam.type";
import { getPastExams } from "@/sql/exam/sql";
import dayjs from "dayjs";
import { ExamResultModel } from "@/sql/exam-result/result.type";
import { getItemInVisitor } from "@/storage";
import { getTokenFromCookie } from "@/app/token";
import { UserModel } from "@/sql/user/user.type";
import { OverviewModal, getGradeOverview } from "@/sql/exam-result/actions";
import { Skeleton } from "@chakra-ui/react";
import { getStudentAllExamResults } from "@/sql/exam-result/sql";
import { useRouter } from "next/navigation";

export default function Component() {
  return (
    <div className="bg-white p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">成绩总览</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <GradesOverview />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">得分趋势</h2>
        <CurvedlineChart />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">过往考试</h2>
        <GradesTable />
      </div>
      <div className="mt-6 flex justify-between">
        <DownloadGrades />
      </div>
    </div>
  )
}

// 成绩总揽
function GradesOverview() {
  const [overview, setOverview] = useState<OverviewModal|null>(null);

  useEffect(() => {
    (async () => {
      const result = await getGradeOverview();
      setOverview(result);
    })()
  }, []);

  return (
    <>
      {
        overview
        ?<>
          <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">平均分数</span>
            <span className="text-3xl font-semibold">{overview.averageScore}</span>
          </Card>
          <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">最高分数</span>
            <span className="text-3xl font-semibold text-green-500">{overview.maxScore}</span>
          </Card>
          <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">最低分数</span>
            <span className="text-3xl font-semibold text-red-500">{overview.minScore}</span>
          </Card>
          <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500">及格率</span>
            <span className="text-3xl font-semibold">{(overview.passRate * 100).toFixed(1)}%</span>
          </Card>
          <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">不及格考试数</span>
              <span className="text-3xl font-semibold">{overview.failedExamCount}</span>
            </div>
            <div className="flex flex-col items-center mt-2">
              <span className="text-sm text-gray-500">考试总数</span>
              <span className="text-3xl font-semibold">{overview.totalExamCount}</span>
            </div>
          </Card>
        </>
        :<>
          <Skeleton height={'174px'} />
          <Skeleton height={'174px'} />
          <Skeleton height={'174px'} />
          <Skeleton height={'174px'} />
          <Skeleton height={'174px'} />
        </>
        }
    </>
  )
}

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
        data: exams.map((exam, idx) => {
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
                  lineStyle: { stroke: 'green', strokeWidth: 2 }, // 及格线样式
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
            margin={{ top: 10, right: 50, bottom: 40, left: 50 }}
            xScale={{
              type: 'point',
            }}
            axisBottom={{
              // ...其他属性...
              // format: (value) => dayjs(value).format('YYYY-MM-DD HH:mm'),
              tickSize: 0,
              tickPadding: 16,
            }}
            yScale={{
              type: "linear",
              min: 0,
              max: 100,
            }}
            curve="linear"
            axisTop={null}
            axisRight={null}
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

// 成绩表格
function GradesTable() {
  const [results, setReuslts] = useState<ExamResultModel[]>([]);

  useEffect(() => {
    (async () => {
      const results = (await getGradeOverview()).results
      setReuslts(results);
    })();
  }, []);

  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>考试id</TableHead>
          <TableHead>考试名称</TableHead>
          <TableHead>得分</TableHead>
          <TableHead>是否通过</TableHead>
          <TableHead>科目</TableHead>
          <TableHead>总分</TableHead>
          <TableHead>正考日期</TableHead>
          <TableHead>交卷时间</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.length 
        ? results.map((result, idx) => 
          <TableRow key={idx}>
            <TableCell>{result.id}</TableCell>
            <TableCell>{result.ExamName}</TableCell>
            <TableCell className="text-green-500 font-semibold">{result.ExamScore}</TableCell>
            <TableCell className={result.isPass ? 'text-green-500' : 'text-red-500'}>{result.isPass ? '是' : '否(<60)'}</TableCell>
            <TableCell>{result.Subject}</TableCell>
            <TableCell className="font-semibold">{result.TotalScore}</TableCell>
            <TableCell>{dayjs(new Date(Number(result.StartTime) * 1000)).format('YYYY/MM/DD HH:mm')}</TableCell>
            <TableCell>{dayjs(new Date(Number(result.SubmitTime) * 1000)).format('YYYY/MM/DD HH:mm')}</TableCell>
            <TableCell>
              <Button variant="secondary" onClick={() => {
                router.push(`/after-exam?ExamId=${result.ExamId}&ExamName=${result.ExamName}&ResultId=${result.id}`)
              }}>查看卷面</Button>
              {result.isPass || <Button className="ml-2" onClick={() => {
                router.push(`/in-exam?ExamId=${result.ExamId}&ExamName=${result.ExamName}`)
              }}>补考</Button>}
            </TableCell>
          </TableRow>) 
        : <TableRow>
            <TableCell>暂无考试数据</TableCell>
          </TableRow>
        }
      </TableBody>
    </Table>
  )
}

// 下载成绩单
function DownloadGrades() {
  return (
    <>
      <Button className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg">下载成绩单</Button>
      <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-lg">分享成绩单</Button>
    </>
  )
}