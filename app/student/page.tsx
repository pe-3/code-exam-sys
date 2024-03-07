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

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sMtW8rPSx0F
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import TopNav from "../layout/TopNav";

function RecentGrade() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>科目</TableHead>
          <TableHead>分数</TableHead>
          <TableHead>日期</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>数学</TableCell>
          <TableCell className="text-green-500 font-semibold">95</TableCell>
          <TableCell>2023-09-12</TableCell>
          <TableCell>
            <Button >查看详情</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>科学</TableCell>
          <TableCell className="text-blue-500 font-semibold">88</TableCell>
          <TableCell >2023-09-12</TableCell>
          <TableCell>
            <Button >查看详情</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>历史</TableCell>
          <TableCell className="text-yellow-500 font-semibold">92</TableCell>
          <TableCell >2023-09-12</TableCell>
          <TableCell>
            <Button >查看详情</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>英语</TableCell>
          <TableCell className="text-purple-500 font-semibold">85</TableCell>
          <TableCell >2023-09-12</TableCell>
          <TableCell>
            <Button >查看详情</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>艺术</TableCell>
          <TableCell className="text-red-500 font-semibold">90</TableCell>
          <TableCell >2023-09-12</TableCell>
          <TableCell>
            <Button >查看详情</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default function Component() {
  return (
    <div className="bg-white p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">即将开拍的考试</h1>
        <p className="text-sm text-gray-500 mb-4">考试时间：2024年02月25日 10:00 AM</p>
        <p className="text-sm text-gray-500">考试倒计时 15 分钟结束</p>
        <Button className="mt-4 bg-blue-600 text-white">开始考试</Button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">单门课程成绩走势分析</h2>
        <LineChart className="w-full h-[300px]" />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">最近考试</h2>
        <RecentGrade />
      </div>
    </div>
  )
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
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
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
