/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VVZzGzf3PPY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold">码测</h1>
        <p className="mt-2 text-sm text-gray-500">输入您的信息以登录您的帐户</p>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              电子邮件
            </label>
            <Input className="mt-1" id="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              密码
            </label>
            <Input className="mt-1" id="password" placeholder="••••••••" type="password" />
          </div>
          <Button className="w-full  text-white">登录</Button>
        </form>
        <div className="mt-6 flex justify-between text-sm">
          <Link className="text-gray-600 hover:text-blue-500 hover:underline" href="/auth/forgot">
            忘记密码?
          </Link>
          <Link className="text-gray-600 hover:text-blue-500 hover:underline" href="/auth/register">
            还没有帐号？注册
          </Link>
        </div>
      </div>
    </div>
  )
}

