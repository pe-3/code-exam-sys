'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createUserByFormData } from "@/sql/user/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import UiToast from "../components/Toast";
import { EToastType } from "../components/Toast";

export default function RegisterComponent() {
  const router = useRouter();
  const toast = useToast({
    position: 'top-right',
    duration: 3000
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // 注册成功跳转到登录页
    const promise = createUserByFormData(formData);
    promise.then(isCreated => isCreated && router.push('/auth'));
    // toast 通知
    toast.promise(promise, {
      success: { render: () => <UiToast 
        title="账号创建成功" 
        description={`你获得了新账号：${formData.get('username')}`} 
        type={EToastType.Success} 
      /> },
      error: { render: () => <UiToast 
        title="注册失败" 
        description="请检查你的参数是否正确。或者，你的帐号或邮箱已经被注册了～～" 
        type={EToastType.Error} 
      /> },
      loading: { render: () => <UiToast 
        title="注册中，请稍后..." 
        description="请等待" 
        type={EToastType.Info}
      /> },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold">码测</h1>
        <p className="mt-2 text-sm text-gray-500">创建新账户以开始使用码测</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              用户名
            </label>
            <Input className="mt-1" name="username" placeholder="您的用户名" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              电子邮件
            </label>
            <Input className="mt-1" name="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              密码
            </label>
            <Input className="mt-1" name="password" placeholder="••••••••" type="password" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
              确认密码
            </label>
            <Input className="mt-1" name="confirm-password" placeholder="••••••••" type="password" />
          </div>
          <Button className="w-full  text-white">注册</Button>
        </form>
        <div className="mt-6 flex justify-between text-sm">
          <Link className="text-gray-600 hover:text-blue-500 hover:underline" href="/auth">
            已有账户？登录
          </Link>
        </div>
      </div>
    </div>
  )
}