import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const cookieStore = await cookies()

  if (path === "/logout") {
    cookieStore.delete('jwt')
    cookieStore.delete('userName')
    cookieStore.delete('userJobType')

    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const jwt = cookieStore.get('jwt')

  if (!jwt) {
    if (path.startsWith('/auth')) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  }

  if (!cookieStore.get('userJobType')?.value && path !== '/premiers-pas') {
    return NextResponse.redirect(new URL('/premiers-pas', request.nextUrl))
  }

  if (path.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}