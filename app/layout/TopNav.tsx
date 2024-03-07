import Link from "next/link"

function ChevronRightIcon(props) {
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

export default function TopNav() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <ChevronRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Link
        className="font-semibold hover:underline underline-offset-2 transition-colors dark:text-gray-400 dark:hover:text-gray-50"
        href="#"
      >
        Home
      </Link>
      <ChevronRightIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Link
        className="font-semibold hover:underline underline-offset-2 transition-colors dark:text-gray-400 dark:hover:text-gray-50"
        href="#"
      >
        Courses
      </Link>
    </div>
  )
}