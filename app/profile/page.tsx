/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zNbeCrccHYC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import FormArea from "./FormArea";
import { getUserInfo } from "@/sql/user/actions";

export default async function Component() {
  const user = await getUserInfo();

  return (
    <div className="min-h-screen py-5">
      <div className="w-full">
        <div className="mb-6 bg-white p-6">
          <h3 className="text-lg font-bold">用户信息</h3>
        </div>
        <FormArea user={user} />
      </div>
    </div>
  )
}