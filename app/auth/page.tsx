import { getItemInVisitor } from "@/storage";
import FormArea from "./FormArea";

export default async function Component() {
  const initDate = await getItemInVisitor('CODE_MAIL_COUNT_DOWN');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold">码测</h1>
        <p className="mt-2 text-sm text-gray-500">输入您的信息以登录您的帐户</p>
        <FormArea initDate={initDate} />
      </div>
    </div>
  )
}

