// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // 🛡️ If NOT logged in, block access to private pages
  if (!session && ["/", "/chat"].some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // 🚫 Prevent logged-in users from accessing login/signup again
  if (session && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url)) // redirect to homepage
  }

  return res
}

export const config = {
  matcher: ["/", "/chat/:path*", "/login", "/signup"],
}
