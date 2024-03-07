import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold">重置密码</h1>
        <p className="mt-2 text-sm text-gray-500">输入您的电子邮件以接收重置链接</p>
        <form className="mt-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              电子邮件
            </label>
            <Input className="mt-1" id="email" placeholder="m@example.com" type="email" />
          </div>
          <Button className="w-full  text-white">发送重置链接</Button>
        </form>
        <div className="mt-6 text-sm">
          <Link className="text-gray-600 hover:text-blue-500 hover:underline" href="/auth">
            返回登录
          </Link>
        </div>
      </div>
    </div>
  );
}