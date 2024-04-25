/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EBZ6AuSdZkY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 py-6 lg:py-10 flex items-center">
        <div className="container flex items-center gap-2 px-4 md:px-6">
          <Link className="flex items-center justify-center" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl/none">Help & Support</h1>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-10">
              <div className="flex flex-col gap-2 min-[600px]:gap-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How can we help you today?</h2>
                <p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We've compiled a list of common questions our customers ask. If you can't find the answer to your
                  question, you can always contact us.
                </p>
              </div>
              <div className="mx-auto max-w-[400px] aspect-video overflow-hidden rounded-xl border dark:border-gray-800">
                <img
                  alt="Image"
                  className="object-cover object-center"
                  height="225"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width="400"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-10">
              <div className="space-y-4">
                <div className="grid gap-1.5">
                  <h3 className="text-xl font-bold">What is the best way to contact customer support?</h3>
                  <div className="prose max-w-none">
                    <p>
                      You can contact our customer support team by emailing
                      <Link href="#">support@example.com</Link>
                      or by using the contact form on our website.{"\n                                      "}
                    </p>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <h3 className="text-xl font-bold">How long does it take to get a response from customer support?</h3>
                  <div className="prose max-w-none">
                    <p>
                      Our customer support team aims to respond to all inquiries within 24 hours. However, response
                      times may vary depending on the volume of requests.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold">Still have questions? Contact us</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    If you have any other questions or need further assistance, please fill out the form below and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" required type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      className="min-h-[100px] resize-y"
                      id="message"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
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
