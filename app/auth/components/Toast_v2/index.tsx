/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HLYBUxXzC8O
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// 枚举
export enum EToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export const ToastIcons = {
  [EToastType.Success]: [CheckCircleIcon, 'text-green-500'],
  [EToastType.Error]: [XCircleIcon, 'text-red-500'],
  [EToastType.Warning]: [AlertCircleIcon, 'text-yellow-500'],
  [EToastType.Info]: [CircleIcon, 'text-blue-500'],
}

export default function UiToast_V2({
  title,
  description,
  type
}: {
  title: string,
  description: string,
  type: EToastType,
}) {
  const ToastIcon = ToastIcons[type][0];

  return (
    <>
      <div className="flex items-center space-x-4 p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
        <ToastIcon className={ToastIcons[type][1]} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-green-500">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </>
  )
}

export function AlertCircleIcon(props: any = {}) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}


export function CheckCircleIcon(props: any = {}) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}


export function CircleIcon(props: any = {}) {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}


export function XCircleIcon(props: any = {}) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}
