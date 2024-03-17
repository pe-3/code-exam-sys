/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rqQnlQjU4mV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ToastIcons, EToastType } from '../Toast_v2'

export default function UiToast({
  title,
  description,
  type,
  view,
  onView
} : {
  title: string,
  description: string,
  type: EToastType,
  view?: boolean,
  onView?: () => void
}) {
  const Icon = ToastIcons[type][0];

  return (
    <div className="w-full max-w-96 pointer-events-auto">
      <div>
        <div>
          <div>
            <div className="p-4 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-4">
                {/* <BellIcon className="h-6 w-6 flex-shrink-0" /> */}
                <Icon className={ToastIcons[type][1]} />
                <div className="flex-1 grid gap-2 text-sm">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm leading-none">{description}</p>
                </div>
                {view && <Button size="sm" variant="outline" onClick={onView}>
                  View
                </Button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BellIcon(props: any = {}) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
