/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6mmPwrxOtdT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] pt-8">
      <main className="grid gap-6 min-h-[100dvh]">
        <section className="grid gap-4 items-start px-4 md:px-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">Web Developer</p>
          </div>
          <div className="mx-auto grid gap-4 md:gap-6 sm:max-w-2xl lg:max-w-4xl lg:grid-cols-2 lg:gap-10">
            <img
              alt="Avatar"
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover object-center border-4 border-gray-100 dark:border-gray-800"
              height="300"
              src="/placeholder.svg"
              width="300"
            />
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 dark:text-gray-400">
                I'm a web developer with a passion for creating beautiful and functional websites.
              </p>
            </div>
          </div>
        </section>
        <section className="grid gap-4 items-start px-4 md:px-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Skills</h2>
            <p className="text-gray-500 dark:text-gray-400">80% HTML</p>
            <div className="h-2 w-full rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-lg bg-green-300 w-4/5 dark:bg-green-700" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">70% CSS</p>
            <div className="h-2 w-full rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-lg bg-blue-300 w-3/5 dark:bg-blue-700" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">90% JavaScript</p>
            <div className="h-2 w-full rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-lg bg-yellow-300 w-9/10 dark:bg-yellow-700" />
            </div>
          </div>
        </section>
        <div className="mt-6 flex justify-between md:px-6">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg">分享</Button>
          <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-lg">编辑信息</Button>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
