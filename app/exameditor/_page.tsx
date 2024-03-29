/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7zZTSvY7Lr9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import MutipleChoice from "./tab-content/multiple-choice"
import FillInTheBlank from "./tab-content/fill-in-the-blank"
import ShortAnswer from "./tab-content/short-answer"
import Programming from "./tab-content/programming"

export default function Component() {
  return (
    <div className="mx-auto my-8 p-6 max-w-4xl bg-white rounded-lg shadow-lg grid gap-6">
      <Tabs defaultValue="multiple-choice">
        <TabsList className="flex gap-4">
          <TabsTrigger value="multiple-choice">选择题</TabsTrigger>
          <TabsTrigger value="fill-in-the-blank">填空题</TabsTrigger>
          <TabsTrigger value="short-answer">简答题</TabsTrigger>
          <TabsTrigger value="programming">编程题</TabsTrigger>
        </TabsList>
        <TabsContent value="multiple-choice">
          <MutipleChoice />
        </TabsContent>
        <TabsContent value="fill-in-the-blank">
          <FillInTheBlank />
        </TabsContent>
        <TabsContent value="short-answer">
          <ShortAnswer />
        </TabsContent>
        <TabsContent value="programming">
          <Programming />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="outline">取消</Button>
        <Button>保存</Button>
      </div>
    </div>
  )
}

export const metadata = {
  title: '码测：考试编辑',
  description: '一个在线代码考试平台，可以用来发布考试，进行考试，管理考试，成绩发布与查看',
}
