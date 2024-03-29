import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Programming() {
  return (
    <div className="space-y-4 my-4">
      <div className="space-y-4">
        <Textarea className="min-h-[100px]" placeholder="输入你的问题" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label className="min-w-0">IDE</Label>
        </div>
        <div className="border border-dashed border-gray-300 rounded-lg w-full p-6 dark:border-gray-700">
          <code>IDE goes here</code>
        </div>
      </div>
    </div>
  )
}