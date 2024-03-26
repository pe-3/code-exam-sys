/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KCHw1xgmZix
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <Card>
      <div className="flex items-center justify-between w-full p-6">
        <h1 className="text-2xl font-bold">选择题</h1>
        <nav className="space-x-2">
          <Button size="sm" variant="outline">
            上一个
          </Button>
          <Button size="sm" variant="outline">
            下一个
          </Button>
        </nav>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="question-1">问题</Label>
            <Input id="question-1" placeholder="输入问题" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-medium">选项</h2>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="a" />
                <Label className="flex-1" htmlFor="a">
                  <Input id="a" placeholder="A" value="A" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="b" />
                <Label className="flex-1" htmlFor="b">
                  <Input id="b" placeholder="B" value="B" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="c" />
                <Label className="flex-1" htmlFor="c">
                  <Input id="c" placeholder="C" value="C" />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="d" />
                <Label className="flex-1" htmlFor="d">
                  <Input id="d" placeholder="D" value="D" />
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

