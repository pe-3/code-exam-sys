import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold">码测</h1>
        <p className="mt-2 text-sm text-gray-500">创建新账户以开始使用码测</p>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              用户名
            </label>
            <Input className="mt-1" id="username" placeholder="您的用户名" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              电子邮件
            </label>
            <Input className="mt-1" id="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              密码
            </label>
            <Input className="mt-1" id="password" placeholder="••••••••" type="password" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
              确认密码
            </label>
            <Input className="mt-1" id="confirm-password" placeholder="••••••••" type="password" />
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