import type { Database } from '@/lib/database.types'

export type ChatMessageRow = Database['public']['Tables']['chat_messages']['Row']
export type ChatMessageInsert = Database['public']['Tables']['chat_messages']['Insert']

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatHistoryItem {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatApiRequest {
  message: string
  history: ChatHistoryItem[]
}

export interface ChatApiResponse {
  reply: string
}

export interface ChatSuggestion {
  en: string
  ar: string
}
