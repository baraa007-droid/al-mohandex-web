import { getSupabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type ContactRow = Database['public']['Tables']['contacts']['Row']

export async function getContacts() {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as ContactRow[]
}

export async function getContactById(id: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as ContactRow
}

export async function getContactsByStatus(status: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as ContactRow[]
}

export async function createContact(payload: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('contacts') as any)
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as ContactRow
}

export async function updateContact(id: string, updates: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('contacts') as any)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as ContactRow
}

export async function deleteContact(id: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
