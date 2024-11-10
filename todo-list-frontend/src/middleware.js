import { NextResponse } from 'next/server'

export function middleware (request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value || request.cookies.get('_vercel_jwt')?.value

  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/tasks', request.url))
    }
    return NextResponse.next()
  }

  const protectedRoutes = ['/tasks']

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks/:path*', '/login', '/register', '/']
}
