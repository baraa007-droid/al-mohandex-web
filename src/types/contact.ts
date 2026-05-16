import type { Database } from '@/lib/database.types'

export type ContactRow = Database['public']['Tables']['contacts']['Row']
export type ContactInsert = Database['public']['Tables']['contacts']['Insert']
export type ContactUpdate = Database['public']['Tables']['contacts']['Update']

export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status: string
  created_at: string
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export interface StartProjectFormData {
  name: string
  email: string
  details: string
}

export interface StartProjectFormErrors {
  name?: string
  email?: string
  details?: string
}

export interface SendEmailPayload {
  name: string
  email: string
  subject: string
  message?: string
  details?: string
  service?: string
}
