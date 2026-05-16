import { NextResponse } from 'next/server'
import { ContactSchema } from '@/validators/contact.validator'
import { ContactRepository } from '@/repositories/contact.repository'
import { verifyAdminToken } from '@/lib/api/helpers'
import { auditLogEntry } from '@/lib/audit'
import { RATE_LIMITS } from '@/constants'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/api/rate-limit'

export async function GET(request: Request) {
  const auth = await verifyAdminToken(request)
  if (auth.error) return auth.error

  try {
    const repo = new ContactRepository()
    const data = await repo.findMany({ orderBy: { column: 'created_at', ascending: false } })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const rateKey = `contact:${ip}`

  if (!checkRateLimit(rateKey, RATE_LIMITS.contact.max, RATE_LIMITS.contact.windowMs)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: getRateLimitHeaders(rateKey, RATE_LIMITS.contact.max, RATE_LIMITS.contact.windowMs) }
    )
  }

  try {
    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const repo = new ContactRepository()
    const contact = await repo.insert(parsed.data)

    auditLogEntry({
      action: 'New contact submission',
      email: parsed.data.email,
      ip: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      details: { subject: parsed.data.subject },
      severity: 'info',
    })

    return NextResponse.json({ success: true, data: contact })
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
