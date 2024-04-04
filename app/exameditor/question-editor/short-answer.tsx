import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { forwardRef } from "react"

const ShortAnswer = forwardRef(function ShortAnswer({
  init
}: {
  init?: any;
}, ref: any) {
  return (
    <div className="space-y-4 mb-4 w-full">
      <div className="space-y-4">
        <Textarea defaultValue={init} ref={ref} className="min-h-[100px]" placeholder="输入你的问题." />
      </div>
    </div>
  )
})

export default ShortAnswer;