import { NextResponse } from 'next/server'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/api/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const rateKey = `chat:${ip}`

  if (!checkRateLimit(rateKey, 20, 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: getRateLimitHeaders(rateKey, 20, 60 * 1000) }
    )
  }

  try {
    const { message, history } = await request.json()
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'Chat service is currently unavailable.' })
    }

    const messages = [
      { role: 'system' as const, content: 'You are a helpful assistant for Al-Mohandex, an engineering and technology company. Respond in the same language as the user.' },
      ...(history || []).map((h: { role: string; content: string }) => ({ role: h.role as 'user' | 'assistant', content: h.content })),
      { role: 'user' as const, content: message },
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 500 }),
    })

    if (!response.ok) throw new Error('OpenAI API error')

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.'

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ reply: 'Sorry, a connection error occurred. Please try again.' }, { status: 500 })
  }
}
