import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function MarkExam() {
  return (
    <div className="min-h-screen p-6">
      <h3 className="text-2xl text-gray-900 font-bold mb-6">
        学生成绩列表
      </h3>
      <div className="container w-full">
        {/* 这里假设 ExamResultList 为已定义组件 */}
        <ExamResultList />
      </div>
    </div>
  );
}

function ExamResultList() {
  return (
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
  );
}