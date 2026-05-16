import { getSupabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type ChatMessageRow = Database['public']['Tables']['chat_messages']['Row']

export async function getChatMessages(senderId: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('sender_id', senderId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as ChatMessageRow[]
}

export async function createChatMessage(payload: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('chat_messages') as any)
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as ChatMessageRow
}
