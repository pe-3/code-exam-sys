/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uNS2mC8ceZv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ExamEditor } from "./ExamEditor"

export default function ExamsFilter() {
  return (
    <div className="w-full mx-auto space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input className="flex-1" placeholder="搜索名称" />
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-black text-white" variant="outline">
              <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
              日期筛选
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar initialFocus mode="range" />
          </PopoverContent>
        </Popover>
        <div className="flex items-center space-x-2">
          <Checkbox id="urgent" />
          <label className="text-sm font-medium leading-none" htmlFor="urgent">
            紧急
          </label>
        </div>
      </div>
      <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="考试科目" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="open">开放</SelectItem>
              <SelectItem value="closed">关闭</SelectItem>
              <SelectItem value="in-progress">进行中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="考试状态" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="open">开放</SelectItem>
              <SelectItem value="closed">关闭</SelectItem>
              <SelectItem value="in-progress">进行中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="考试分数" type="number" />
          <ExamEditor />
        </div>
    </div>
  )
}

function CalendarDaysIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}
