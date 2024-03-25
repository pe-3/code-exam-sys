/**
 * v0 by Vercel.
 * @see https://v0.dev/t/08S11fCyxJ0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { SelectTrigger, SelectItem, SelectContent, Select, SelectValue } from "@/components/ui/select"

export default function Component() {
  return (
    <div className="flex items-center justify-center space-x-1 mt-5 w-1/2 mx-auto">
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <Button className="px-3 py-1 rounded bg-black text-white">1</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">2</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">3</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">4</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">5</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">6</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">7</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">8</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">9</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">10</Button>
      <Button className="px-3 py-1 rounded bg-transparent text-black hover:bg-gray-100">
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
      <Select defaultValue="10">
        <SelectTrigger>
          Page Size<SelectValue/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
