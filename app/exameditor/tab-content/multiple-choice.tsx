import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function MutipleChoice() {
  return (
    <div className="space-y-4 flex-1">
      <div className="space-y-4">
        <Textarea className="min-h-[100px]" placeholder="输入你的问题。" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 ml-[-26px]">
            <div />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed" htmlFor="a">
              A
            </Label>
            <Input
              className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
              id="a"
              placeholder="输入选项 A"
            />
          </div>
          <div className="flex items-center space-x-2 ml-[-26px]">
            <div />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed" htmlFor="b">
              B
            </Label>
            <Input
              className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
              id="b"
              placeholder="输入选项 B"
            />
          </div>
          <div className="flex items-center space-x-2 ml-[-26px]">
            <div />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed" htmlFor="c">
              C
            </Label>
            <Input
              className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
              id="c"
              placeholder="输入选项 C"
            />
          </div>
          <div className="flex items-center space-x-2 ml-[-26px]">
            <div />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed" htmlFor="d">
              D
            </Label>
            <Input
              className="w-full text-sm font-normal peer-disabled:cursor-not-allowed"
              id="d"
              placeholder="输入选项 D"
            />
          </div>
        </div>
      </div>
    </div>
  )
}