'use client';

import Editor from "@/app/components/MonacoEditor"
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
import { useState } from "react";

export default function ProgramIdeModal({
  ProgarmDetail
}: {
  ProgarmDetail: string
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>去实现</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>开始编程</AlertDialogTitle>
          <AlertDialogDescription>
            <ProgramIde setOpen={setOpen} ProgarmDetail={ProgarmDetail} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction>提交</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const ProgramIde = ({
  setOpen,
  ProgarmDetail
}: {
  setOpen: (open: boolean) => void;
  ProgarmDetail: string
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-[95vw] h-[95vh] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      style={{ fontSize: '16px' }}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-scroll w-full h-full">
        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-4xl font-semibold text-gray-900 mb-4">题目描述</h3>
            <div className="whitespace-pre-wrap text-gray-800">
              {ProgarmDetail}
            </div>
          </div>
          <div className="flex-1 border-l border-gray-200 h-full">
            <Editor className="p-2 h-full w-full" showConfig />
          </div>
        </div>
      </div>
    </div>
  )
}