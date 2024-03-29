import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ShortAnswer() {
  return (
    <div className="space-y-4 my-4">
      <div className="space-y-4">
        <Textarea className="min-h-[100px]" placeholder="输入你的问题." />
      </div>
    </div>
  )
}