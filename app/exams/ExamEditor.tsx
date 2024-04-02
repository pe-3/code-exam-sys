'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { createExamByFormData } from "@/sql/exam/actions";
import { useToast } from "@chakra-ui/react";
import { forwardRef, useRef, useState } from "react";
import UiToast, { EToastType } from "../auth/components/Toast";
import { ExamModel } from "@/sql/exam/exam.type";

export function ExamEditor({
  children,
  exam
}: {
  children?: React.ReactNode;
  exam?: ExamModel
}) {
  const [open, setOpen] = useState(false);
  const openDialog = (e: any) => {
    e.preventDefault();
    setOpen(true);
  }
  const closeDialog = () => setOpen(false);

  const form = useRef();
  const toast = useToast({
    duration: 3000,
    position: 'top-right'
  });
  const handleSubimt = async () => {
    const formData = new FormData(form.current);
    try {
      const isCreated = await createExamByFormData(formData);
      if (isCreated) {
        closeDialog();
        toast({
          render() {
            return <UiToast
              title="发布成功"
              description="考试已发布，请尽快编辑考试内容"
              type={EToastType.Success}
            />
          }
        });
        window.location.reload();
      } else {
        toast({
          render() {
            return <UiToast
              title="发布失败"
              description="请检查表单是否填写完整"
              type={EToastType.Error}
            />
          }
        })
      }
    }
    catch (err) {
      toast({
        render() {
          return <UiToast 
            title="发布失败"
            description="请检查表单是否填写完整"
            type={EToastType.Error} 
          />
        }
      })
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <div onClick={openDialog} style={{ display: 'inline' }}>
          {children || <Button>发布新考试</Button>}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>编辑考试基本信息</AlertDialogTitle>
          <AlertDialogDescription>
            <ExamEditorContent ref={form} exam={exam}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubimt}>发布</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


const ExamEditorContent = forwardRef(function A({
  exam
}: {
  exam?: ExamModel
}, ref: any) {

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-lg" style={{ color: 'black' }}>
      <form className="grid grid-cols-1 gap-6" ref={ref}>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="exam-name">
            考试名称
          </label>
          <Input id="exam-name" placeholder="请输入考试名称" name="ExamName" defaultValue={exam?.ExamName} />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="exam-subject">
            考试科目
          </label>
          <Input id="exam-subject" placeholder="请输入考试科目" name="Subject" defaultValue={exam?.Subject} />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="exam-score">
            总分数
          </label>
          <Input id="exam-score" placeholder="请输入总分数" type="number" name="TotalScore" defaultValue={exam?.TotalScore} />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="exam-start-time">
            考试开始时间
          </label>
          <Input id="exam-start-time" placeholder="YYYY-MM-DD HH:MM" type="datetime-local" name="StartTime" defaultChecked={exam?.StartTime} />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium" htmlFor="exam-duration">
            考试时长 (分钟)
          </label>
          <Select name="EndTime" defaultValue={exam?.EndTime}>
            <SelectTrigger id="category">
              <SelectValue placeholder="时间" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="30">30 分钟</SelectItem>
              <SelectItem value="60">60 分钟</SelectItem>
              <SelectItem value="90">90 分钟</SelectItem>
              <SelectItem value="120">120</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div> 
  )
})