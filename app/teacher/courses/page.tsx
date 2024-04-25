/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ccrGis7jMud
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <header className="flex items-center justify-between w-full px-4 h-14 border-b lg:px-6">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
        </div>
        <nav className="hidden space-x-2 lg:flex lg:space-x-4">
          <Link
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Home
          </Link>
          <Link
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Courses
          </Link>
          <Link
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            About
          </Link>
          <Link
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <form className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-0 placeholder-gray-500 appearance-none peer h-8 w-24 border border-gray-200 rounded-lg md:w-48 lg:w-64 dark:placeholder-gray-400 dark:border-gray-800"
              placeholder="Search..."
              type="search"
            />
          </form>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header> */}
      <main className="grid min-h-screen gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid items-start gap-4">
          <h1 className="text-3xl font-bold tracking-tighter lg:text-5xl">All Courses</h1>
        </div>
        <div className="grid items-start gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              React for Beginners
            </Link>
            <img
              alt="React for Beginners"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn the basics of React and start building your own web applications.
            </p>
            <Button size="sm">View Course</Button>
          </div>
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              CSS Mastery
            </Link>
            <img
              alt="CSS Mastery"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dive deep into CSS and learn advanced styling techniques to make your websites shine.
            </p>
            <Button size="sm">View Course</Button>
          </div>
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              JavaScript Fundamentals
            </Link>
            <img
              alt="JavaScript Fundamentals"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Master the basics of JavaScript and start your journey as a web developer.
            </p>
            <Button size="sm">View Course</Button>
          </div>
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              Next.js Deep Dive
            </Link>
            <img
              alt="Next.js Deep Dive"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn everything about Next.js and build powerful web applications with ease.
            </p>
            <Button size="sm">View Course</Button>
          </div>
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              Svelte for Everyone
            </Link>
            <img
              alt="Svelte for Everyone"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Master the basics of Svelte and start building web applications with the framework.
            </p>
            <Button size="sm">View Course</Button>
          </div>
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              Svelte for Everyone
            </Link>
            <img
              alt="Svelte for Everyone"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Master the basics of Svelte and start building web applications with the framework.
            </p>
            <Button size="sm">View Course</Button>
          </div>
          <div className="grid items-start gap-2">
            <Link className="font-semibold" href="#">
              Svelte for Everyone
            </Link>
            <img
              alt="Svelte for Everyone"
              className="rounded-lg object-cover"
              height={200}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Master the basics of Svelte and start building web applications with the framework.
            </p>
            <Button size="sm">View Course</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

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


function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
