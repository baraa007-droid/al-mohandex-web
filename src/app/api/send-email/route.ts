import { NextResponse } from 'next/server'
import { createContact } from '@/services/contacts.service'
import { createApiSupabase } from '@/lib/api/helpers'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/api/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const rateKey = `contact:${ip}`

  if (!checkRateLimit(rateKey, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429, headers: getRateLimitHeaders(rateKey, 5, 15 * 60 * 1000) }
    )
  }

  const supabase = createApiSupabase()
  if (!supabase) return NextResponse.json({ success: true, data: null })

  try {
    const body = await request.json()
    const { name, email, subject, message, details } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    const contact = await createContact({
      name, email,
      phone: body.phone || null,
      subject: subject || details || null,
      message: message || details || '',
      status: 'new',
    })
    return NextResponse.json({ success: true, data: contact })
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
