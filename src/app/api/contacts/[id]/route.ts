import { NextResponse } from 'next/server'
import { updateContact } from '@/services/contacts.service'
import { createApiSupabase, verifyAdminToken } from '@/lib/api/helpers'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAdminToken(request)
  if (auth.error) return auth.error

  const supabase = createApiSupabase()
  if (!supabase) return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })

  try {
    const { id } = await params
    const body = await request.json()
    const data = await updateContact(id, body)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}
