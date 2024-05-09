import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUserToken = request.cookies.get('TOKEN_KEY')?.value;

  const pathname = request.nextUrl.pathname;

  if (!currentUserToken && !pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/auth?expired=true', request.url))
  }
}
 
export const config = {
  matcher: [
    '/profile',
    '/role',
    '/student',
    '/teacher',
    '/exams',
    '/exam-detail',
    '/in-exam',
    '/exameditor',
    '/after-exam'
  ],
}
