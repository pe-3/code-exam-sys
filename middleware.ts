import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('TOKEN_KEY')?.value;

  if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/auth?expired=true', request.url))
  }
}
 
export const config = {
  matcher: [
    '/profile',
    '/role',
    '/student',
    '/teacher',
  ],
}