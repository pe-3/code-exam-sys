/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UWzcogHbQOn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import ExamsFilter from "./ExamsFilter"

export default function Component() {
  return (
    <div className="bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">考试列表</h1>
      <div className="flex flex-col space-y-4 mb-6">
        <ExamsFilter />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>考试名称</TableHead>
            <TableHead>科目</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>时间</TableHead>
            <TableHead>时长（分钟）</TableHead>
            <TableHead>状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>数学期末考试</TableCell>
            <TableCell>数学</TableCell>
            <TableCell>2024-06-11</TableCell>
            <TableCell>09:00</TableCell>
            <TableCell>120</TableCell>
            <TableCell>未开始</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>数学期末考试</TableCell>
            <TableCell>数学</TableCell>
            <TableCell>2024-06-11</TableCell>
            <TableCell>09:00</TableCell>
            <TableCell>120</TableCell>
            <TableCell>未开始</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>数学期末考试</TableCell>
            <TableCell>数学</TableCell>
            <TableCell>2024-06-11</TableCell>
            <TableCell>09:00</TableCell>
            <TableCell>120</TableCell>
            <TableCell>未开始</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-center items-center space-x-1 mt-6">
        <Button variant="ghost">{`<`}</Button>
        <Button variant="default">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <Button variant="ghost">4</Button>
        <Button variant="ghost">5</Button>
        <Button variant="ghost">6</Button>
        <Button variant="ghost">7</Button>
        <Button variant="ghost">8</Button>
        <Button variant="ghost">9</Button>
        <Button variant="ghost">10</Button>
        <Button variant="ghost">{`>`}</Button>
      </div>
    </div>
  )
}

