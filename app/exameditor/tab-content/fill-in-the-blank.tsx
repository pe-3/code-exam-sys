import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function FillInTheBlank() {
  return (
    <div className="space-y-4 my-4">
      <div className="space-y-4">
        <Textarea className="min-h-[100px]" placeholder="Enter your question here." />
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label className="min-w-0">填空</Label>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed" htmlFor="one">
              1)
            </Label>
            <Input
              className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
              id="one"
              placeholder="输入填空位1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed" htmlFor="two">
              2)
            </Label>
            <Input
              className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
              id="two"
              placeholder="输入填空位2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}