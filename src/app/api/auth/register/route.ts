import { NextResponse } from 'next/server'
import { signUp } from '@/lib/auth'
import { RegisterSchema } from '@/validators/auth.validator'
import { mapToAuthUser, setAuthCookie } from '@/lib/api/helpers'
import { auditLogEntry } from '@/lib/audit'
import { RATE_LIMITS } from '@/constants'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/api/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const rateKey = `register:${ip}`

  if (!checkRateLimit(rateKey, RATE_LIMITS.register.max, RATE_LIMITS.register.windowMs)) {
    return NextResponse.json(
      { error: 'Too many registration attempts. Please try again later.' },
      { status: 429, headers: getRateLimitHeaders(rateKey, RATE_LIMITS.register.max, RATE_LIMITS.register.windowMs) }
    )
  }

  try {
    const body = await request.json()
    const parsed = RegisterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { user, session } = await signUp(parsed.data.email, parsed.data.password, parsed.data.name)
    if (!user || !session) {
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
    }

    auditLogEntry({
      action: 'New user registration',
      userId: user.id,
      email: user.email || undefined,
      ip: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      severity: 'info',
    })

    const response = NextResponse.json({
      token: session.access_token,
      user: mapToAuthUser(user, { role: 'user', full_name: parsed.data.name }),
    })
    return setAuthCookie(response, session.access_token)
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
