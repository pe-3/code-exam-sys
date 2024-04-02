'use client';

import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ExamModel, ExamStatus, ExamStatusColors, ExamStatusDescriptions } from "@/sql/exam/exam.type"
import moment from 'moment'
import Link from "next/link";
import { ExamEditor } from "./ExamEditor";
import { rollbackExamStatus } from "@/sql/exam/actions";
import { useToast } from "@chakra-ui/react";
import UiToast, { EToastType } from "../auth/components/Toast";

export const ExamStatusButton: { [key in ExamStatus]: React.FC<any> } = {
  [ExamStatus.UNEDITED]: ({
    ExamId,
    ExamName
  }: {
    ExamId: any;
    ExamName: any;
  }) => (
    <Link href={`/exameditor?ExamId=${ExamId}&ExamName=${ExamName}`}>
      <Button variant='outline' size='sm'>编辑</Button>
    </Link>
  ),
  [ExamStatus.UNPUBLISHED]: ({
    ExamId,
    ExamName
  }: {
    ExamId: any;
    ExamName: any;
  }) => (
    <>
      <Link href={`/exam-detail?ExamId=${ExamId}&ExamName=${ExamName}`}>
        <Button variant='outline' size='sm' className="mr-4">检查</Button>
      </Link>
      <Button variant='destructive' size='sm'>发布</Button>
    </>
  ),
  [ExamStatus.NOT_STARTED]: () => (
    <Button variant='secondary' size='sm'>查看</Button>
  ),
  [ExamStatus.IN_PROGRESS]: () => (
    <Button variant='default' size='sm'>考试</Button>
  ),
  [ExamStatus.FINISHED]: () => (
    <Button variant='outline' size='sm'>阅卷</Button>
  )
};

export default function ExamsTable({
  exams
}: {
  exams: ExamModel[];
}) {
  const toast = useToast({
    duration: 3000,
    position: 'top-right'
  });

  return (
    <div className="h-[550px] overflow-y-auto relative">
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
          {exams.map((exam, index) => (
            <TableRow key={index}>
              <TableCell>{exam.ExamName}</TableCell>
              <TableCell>{exam.Subject}</TableCell>
              <TableCell>{moment(new Date(exam.StartTime * 1000)).format('YYYY-MM-DD HH:mm')}</TableCell>
              <TableCell>{exam.EndTime}</TableCell>
              <TableCell>{exam.TotalScore}</TableCell>
              <TableCell style={{ color: ExamStatusColors[exam.Status] }}>{ExamStatusDescriptions[exam.Status]}</TableCell>
              <TableCell>
                <ExamEditor exam={exam}>
                  <Button size='sm' variant="outline" className="mr-4">✍️</Button>
                </ExamEditor>
                <Button
                  size='sm'
                  className="mr-4"
                  variant='outline'
                  disabled={exam.Status === ExamStatus.UNEDITED}
                  onClick={async () => {
                    const isRollbackOk = await rollbackExamStatus({
                      ExamId: exam.ExamId,
                      Status: exam.Status
                    });
                    if (isRollbackOk) {
                      window.location.reload();
                    } else {
                      toast({
                        render: () => (
                          <UiToast
                            title="回滚失败"
                            description="请检查表单是否填写完整"
                            type={EToastType.Error}
                          />
                        )
                      })
                    }
                  }}
                >回滚</Button>
                {ExamStatusButton[exam.Status]({
                  ExamId: exam.ExamId,
                  ExamName: exam.ExamName
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}