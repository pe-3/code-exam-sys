'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uNS2mC8ceZv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ExamEditor } from "./ExamEditor"
import { Button } from "@/components/ui/button"
import { ExamStatusDescriptions } from "@/sql/exam/exam.type"
import { ExamQueryParams } from "@/sql/exam/sql"
import { forwardRef } from "react";

const Filter = forwardRef(function ExamsFilter({
  searchParams
}: {
  searchParams: ExamQueryParams
}, ref) {
  return (
    <form className="w-full mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input className="flex-1" placeholder="考试名称" name="ExamName" defaultValue={searchParams.ExamName} />
        <div className="flex-1 flex items-center gap-4">
          <label htmlFor="StartTime">搜当天</label>
          <Input className="flex-1" placeholder="YYYY-MM-DD HH:MM" type="datetime-local" name="StartTime" defaultValue={searchParams.StartTime} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Select defaultValue={searchParams.Status as string || '-1'} name="Status">
          <SelectTrigger id="category">
            考试状态 <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="-1">全部</SelectItem>
            <SelectItem value="0">{ExamStatusDescriptions[0]}</SelectItem>
            <SelectItem value="1">{ExamStatusDescriptions[1]}</SelectItem>
            <SelectItem value="2">{ExamStatusDescriptions[2]}</SelectItem>
            <SelectItem value="3">{ExamStatusDescriptions[3]}</SelectItem>
            <SelectItem value="4">{ExamStatusDescriptions[4]}</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="考试科目" name="Subject" defaultValue={searchParams.Subject} />
        <Input placeholder="考试分数" type="number" name="TotalScore" defaultValue={searchParams.TotalScore} />
      </div>
      <div className="gap-4 flex items-center">
        <Button variant='outline'>查询</Button>
        <Button variant='secondary' onClick={(e) => {
          e.preventDefault();
          window.location.href = '/exams';
        }}>重置</Button>
        <ExamEditor ref={ref} />
      </div>
    </form>
  )
})

export default Filter;