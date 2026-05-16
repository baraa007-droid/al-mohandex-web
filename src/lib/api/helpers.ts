import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getUserById } from '@/services/users.service'

export function checkSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

export function createApiSupabase() {
  const config = checkSupabaseConfig()
  if (!config) return null
  return createClient(config.url, config.key)
}

export async function verifyAdminToken(request: Request) {
  const supabase = createApiSupabase()
  if (!supabase) return { error: NextResponse.json({ error: 'Service unavailable' }, { status: 503 }) }

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return { error: NextResponse.json({ error: 'Invalid token' }, { status: 401 }) }
  }

  let dbUser
  try {
    dbUser = await getUserById(user.id)
  } catch {
    dbUser = null
  }

  if (dbUser?.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return { user, dbUser }
}

export function mapToAuthUser(supabaseUser: { id: string; email?: string | null; user_metadata?: { full_name?: string } }, dbUser?: { role?: string | null; full_name?: string | null } | null) {
  return {
    id: supabaseUser.id,
    name: dbUser?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email || '',
    role: dbUser?.role || 'user',
  }
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set('sb-access-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  return response
}
