import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { auditLogEntry } from '@/lib/audit'

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { flowType: 'pkce' },
  })

  const token = request.cookies.get('sb-access-token')?.value

  if (!token) {
    auditLogEntry({
      action: 'Unauthorized admin access attempt',
      ip: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      severity: 'warning',
    })
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    auditLogEntry({
      action: 'Invalid admin token',
      userId: undefined,
      ip: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      severity: 'error',
    })
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
