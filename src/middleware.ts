import { NextRequest, NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl
  if (token && (
    url.pathname.startsWith('/sign-in')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return NextResponse.next();
}

// config ye batata hai kon kon se path pr middleware run krna hai
export const config = {
  matcher: [
    '/sign-in',
    '/dashboard',
  ]
}