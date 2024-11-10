import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export function middleware (request) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('token')?.value

  if (pathname === '/login') {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        jwtVerify(token, secret)
        const tasksUrl = new URL('/tasks', request.url)
        return NextResponse.redirect(tasksUrl)
      } catch (err) {
        console.log('Token inválido en /login:', err.message)
      }
    }
    return NextResponse.next()
  }

  const protectedRoutes = ['/tasks']
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      jwtVerify(token, secret)
    } catch (err) {
      console.log('Token inválido en /tasks:', err.message)
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks/:path*', '/login']
}
