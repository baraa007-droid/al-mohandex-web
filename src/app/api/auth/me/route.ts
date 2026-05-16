import { NextResponse } from 'next/server'
import { createApiSupabase, mapToAuthUser } from '@/lib/api/helpers'
import { getUserById } from '@/services/users.service'

export async function GET(request: Request) {
  const supabase = createApiSupabase()
  if (!supabase) return NextResponse.json({ user: null })

  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    let dbUser
    try { dbUser = await getUserById(user.id) } catch { dbUser = null }

    return NextResponse.json({ user: mapToAuthUser(user, dbUser) })
  } catch {
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
  }
}
