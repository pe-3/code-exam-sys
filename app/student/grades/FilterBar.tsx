/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sSm4k9rwW47
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-5 gap-4">
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="分类" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="科目" type="text" />
        <Select>
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="难度区" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger id="questionType">
            <SelectValue placeholder="排序依据" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="relevance">Relevance</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="搜索关键词" type="text" />
        <Button className="bg-black text-white">过滤</Button>
      </div>
    </div>
  )
}