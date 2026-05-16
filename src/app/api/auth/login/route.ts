import { NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'
import { LoginSchema } from '@/validators/auth.validator'
import { mapToAuthUser, setAuthCookie } from '@/lib/api/helpers'
import { getUserById } from '@/services/users.service'
import { auditLogEntry } from '@/lib/audit'
import { RATE_LIMITS } from '@/constants'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/api/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const rateKey = `login:${ip}`

  if (!checkRateLimit(rateKey, RATE_LIMITS.login.max, RATE_LIMITS.login.windowMs)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: getRateLimitHeaders(rateKey, RATE_LIMITS.login.max, RATE_LIMITS.login.windowMs) }
    )
  }

  try {
    const body = await request.json()
    const parsed = LoginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { user, session } = await signIn(parsed.data.email, parsed.data.password)
    if (!user || !session) {
      auditLogEntry({
        action: 'Failed login attempt',
        email: parsed.data.email,
        ip: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
        severity: 'warning',
      })
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    let dbUser
    try { dbUser = await getUserById(user.id) } catch { dbUser = null }

    auditLogEntry({
      action: 'Successful login',
      userId: user.id,
      email: user.email || undefined,
      ip: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      severity: 'info',
    })

    const response = NextResponse.json({ token: session.access_token, user: mapToAuthUser(user, dbUser) })
    return setAuthCookie(response, session.access_token)
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
