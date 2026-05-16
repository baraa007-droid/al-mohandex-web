import { getSupabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export async function signUp(email: string, password: string, fullName?: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  const supabase = getSupabase()
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } }
  return supabase.auth.onAuthStateChange(callback)
}
