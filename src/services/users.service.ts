import { getSupabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type UserRow = Database['public']['Tables']['users']['Row']

export async function getUserById(id: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as UserRow
}

export async function getUserByEmail(email: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) throw error
  return data as UserRow
}

export async function updateUser(id: string, updates: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('users') as any)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as UserRow
}
