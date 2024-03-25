import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ExamModel, ExamStatus, ExamStatusColors, ExamStatusDescriptions } from "@/sql/exam/exam.type"
import { number } from "zod";

export const ExamStatusButton: { [key in ExamStatus]: React.FC } = {
  [ExamStatus.UNEDITED]: () => (
    <Button variant='outline' size='sm'>去编辑</Button>
  ),
  [ExamStatus.UNPUBLISHED]: () => (
    <Button variant='destructive' size='sm'>去发布</Button>
  ),
  [ExamStatus.NOT_STARTED]: () => (
    <Button variant='secondary' size='sm'>去查看</Button>
  ),
  [ExamStatus.IN_PROGRESS]: () => (
    <Button variant='default' size='sm'>去考试</Button>
  ),
  [ExamStatus.FINISHED]: () => (
    <Button variant='outline' size='sm'>去阅卷</Button>
  )
};

export default function ExamsTable({
  exams
}: {
  exams: ExamModel[]
}) {
  return (
    <div className="h-[600px] overflow-y-auto relative">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow className="sticky top-0 bg-white z-10">
            <TableHead>考试名称</TableHead>
            <TableHead>科目</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>时长</TableHead>
            <TableHead>总分</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.ExamId}>
              <TableCell>{exam.ExamName}</TableCell>
              <TableCell>{exam.Subject}</TableCell>
              <TableCell>{new Date(exam.StartTime * 1000).toDateString()}</TableCell>
              <TableCell>{exam.EndTime}</TableCell>
              <TableCell>{exam.TotalScore}</TableCell>
              <TableCell style={{ color: ExamStatusColors[exam.Status] }}>{ExamStatusDescriptions[exam.Status]}</TableCell>
              <TableCell><Button size='sm' className="mr-4" variant='outline'>回滚</Button>{ExamStatusButton[exam.Status]({})}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}