import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChangePasswordComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold">修改密码</h1>
        <p className="mt-2 text-sm text-gray-500">请确保新密码输入正确。</p>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="current-password">
              当前密码
            </label>
            <Input
              className="mt-1"
              id="current-password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="new-password">
              新密码
            </label>
            <Input
              className="mt-1"
              id="new-password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-new-password">
              确认新密码
            </label>
            <Input
              className="mt-1"
              id="confirm-new-password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <Button className="w-full  text-white">更新密码</Button>
        </form>
        <div className="mt-6 text-sm">
          <Link className="text-gray-600 hover:text-blue-500 hover:underline" href="/auth">
            取消
          </Link>
        </div>
      </div>
    </div>
  );
}