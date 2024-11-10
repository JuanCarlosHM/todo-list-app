import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export function middleware (request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const cookies = request.cookies.getAll()
  console.log('Cookies disponibles:', cookies)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    console.log('token -->', token)
    if (token) {
      try {
        jwtVerify(token, secret)
        return NextResponse.redirect(new URL('/tasks', request.url))
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
      jwtVerify(token, secret)
    } catch (err) {
      console.error(`Error al verificar token en ${pathname}: ${err.message}`)
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks/:path*', '/login', '/register', '/']
}
