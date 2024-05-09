/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sSm4k9rwW47
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { OverviewModal } from "@/sql/exam-result/actions";

export interface FilterModal {
  subject?: string;
}

export default function Component({
  onFilterChange,
  overview
}: {
  onFilterChange: (filter: FilterModal) => void;
  overview: OverviewModal;
}) {
  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-5 gap-4">
        <form onChange={(form) => {
          onFilterChange?.({
            subject: 'as'
          })
        }}>
          <Select name="subject">
            <SelectTrigger id="category">
              考试科目 <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {Object.keys(overview.subjects).map(subject => {
                return <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </form>
      </div>
    </div>
  )
}