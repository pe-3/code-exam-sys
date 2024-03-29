import './globals.css'
import { Providers } from './chakra-provider'
import { cookies } from 'next/headers'

export const metadata = {
  title: '码测：在线代码考试平台',
  description: '一个在线代码考试平台，可以用来发布考试，进行考试，管理考试，成绩发布与查看',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className='overflow-scroll h-screen'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
