import Editor from "@/app/components/MonacoEditor"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { forwardRef } from "react"

const Programming = forwardRef(function Programming(props, ref) {
  return (
    <div className="space-y-4 mb-4 w-full">
      <div className="space-y-4">
        <Textarea ref={ref} className="min-h-[100px]" placeholder="输入你的编程问题" />
      </div>
    </div>
  )
})

export default Programming;