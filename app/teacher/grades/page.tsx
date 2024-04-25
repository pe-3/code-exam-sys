'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/29k98a1uCJG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { Button } from "@/components/ui/button"
import FilterBar from "./FilterBar";

export default function Component() {
  return (
    <div className="bg-white p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">成绩总览</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">平均分数</span>
          <span className="text-3xl font-semibold">76.3</span>
        </Card>
        <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">最高分数</span>
          <span className="text-3xl font-semibold">98.0</span>
        </Card>
        <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">最低分数</span>
          <span className="text-3xl font-semibold">59.0</span>
        </Card>
        <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">及格率</span>
          <span className="text-3xl font-semibold">85%</span>
        </Card>
        <Card className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">不及格科目数</span>
            <span className="text-3xl font-semibold">2</span>
          </div>
          <div className="flex flex-col items-center mt-2">
            <span className="text-sm text-gray-500">科目总数</span>
            <span className="text-3xl font-semibold">10</span>
          </div>
        </Card>
      </div>
      <FilterBar onFilterChange={() => {}} />
      <CurvedlineChart className="w-full h-[300px]" />
      <div className="mt-6 flex justify-between">
        <Button className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg">下载成绩单</Button>
        <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-lg">分享成绩单</Button>
      </div>
    </div>
  )
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function CurvedlineChart(props) {
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
          min: 0,
          max: "auto",
        }}
        curve="monotoneX"
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


function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UserCircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
