import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hashToken } from './audit'

const CSRF_SECRET_KEY = process.env.CSRF_SECRET || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'default-secret'

export function generateCsrfToken(): string {
  const random = Math.random().toString(36).substring(2)
  const timestamp = Date.now().toString()
  return hashToken(`${CSRF_SECRET_KEY}-${random}-${timestamp}`).substring(0, 32)
}

export function verifyCsrfToken(request: Request): boolean {
  const token = request.headers.get('x-csrf-token')
  const cookieToken = request.headers.get('cookie')?.match(/csrf-token=([^;]+)/)?.[1]

  if (!token || !cookieToken) return false
  return token === cookieToken
}

export function csrfMiddleware(request: NextRequest): NextResponse | null {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']

  if (safeMethods.includes(request.method)) {
    return null
  }

  if (!verifyCsrfToken(request)) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
  }

  return null
}

export function setCsrfCookie(token: string): string {
  return `csrf-token=${token}; Path=/; HttpOnly; SameSite=Strict; Secure`
}
