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
import { CurrentExam, RecentExams } from "../teacher/page";
import { useEffect, useState } from "react";
import { getComingExams } from "@/sql/exam/sql";
import { CurvedlineChart } from "./grades/page";

export default function Component() {
  return (
    <div className="bg-white p-8">
      <div className="mb-8">
        <CurrentExam forStudent />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">得分走势分析</h2>
        <CurvedlineChart />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">即将考试</h2>
        <RecentExams forStudent />
      </div>
    </div>
  )
}

