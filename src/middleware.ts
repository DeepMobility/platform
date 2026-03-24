import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (
    request.headers.get("x-forwarded-proto") !== "https" &&
    !request.headers.get('host')?.startsWith("localhost")
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${path}`,
      301
    );
  }

  if (path === "/logout") {
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('jwt')
    response.cookies.delete('userName')
    response.cookies.delete('userJobType')
    response.cookies.delete('accountSlug')

    return response
  }

  const jwt = request.cookies.get('jwt')

  if (!jwt?.value) {
    if (path.startsWith('/auth')) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  }

  if (path.startsWith('/premiers-pas')) {
    return NextResponse.next()
  }

  if (!request.cookies.get('userJobType')?.value) {
    return NextResponse.redirect(new URL('/premiers-pas/mode-de-travail', request.nextUrl))
  }

  if (!request.cookies.get('userPainfulBodyParts')?.value) {
    return NextResponse.redirect(new URL('/premiers-pas/regions-douloureuses', request.nextUrl))
  }

  if (!request.cookies.get('userOtherThematicInterests')?.value) {
    return NextResponse.redirect(new URL('/premiers-pas/autre-interets', request.nextUrl))
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