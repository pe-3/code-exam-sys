import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CodeOpt } from "./components/CodeOpt";
import SendCodeBtn from "./components/SendCodeBtn";
import { getItemInVisitor } from "@/storage";

export default async function Component() {
  const initDate = await getItemInVisitor('CODE_MAIL_COUNT_DOWN');

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
            <label className="block text-sm font-medium text-gray-700" htmlFor="code">
              验证码
            </label>
            <div className="flex justify-between mt-1">
              <CodeOpt name="code"/>
              <SendCodeBtn initDate={initDate} />
            </div>
          </div>
          <Button className="w-full  text-white">登录 / 注册</Button>
        </form>
      </div>
    </div>
  )
}

