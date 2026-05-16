import { getSupabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type SettingsRow = Database['public']['Tables']['admin_settings']['Row']

export async function getSettings() {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .single()

  if (error) throw error
  return data as SettingsRow
}

export async function updateSettings(updates: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('admin_settings') as any)
    .update({ ...(updates as Record<string, unknown>), updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) throw error
  return data as SettingsRow
}
