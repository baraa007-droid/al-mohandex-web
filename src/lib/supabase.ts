import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: ReturnType<typeof createClient<Database>> | null = null

export function getSupabase() {
  if (!client && supabaseUrl && supabaseAnonKey) {
    client = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  return client
}

export const supabase = getSupabase()
