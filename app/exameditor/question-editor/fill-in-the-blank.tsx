import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { forwardRef } from "react"

const FillInTheBlank = forwardRef(function FillInTheBlank({
  init
}: {
  init?: any;
}, ref: any) {
  return (
    <div className="space-y-4 mb-4 w-full">
      <div className="space-y-4">
        <Textarea defaultValue={init} className="min-h-[100px]" placeholder="编辑填空题，*** (三位) 表示填空位。" ref={ref} />
      </div>
    </div>
  )
})

export default  FillInTheBlank;