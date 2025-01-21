import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')

  if (path === "/logout") {
    cookieStore.delete('jwt')

    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (path.startsWith('/auth') && jwt) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!path.startsWith('/auth') && !jwt) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}