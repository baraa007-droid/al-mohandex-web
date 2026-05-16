export type Lang = 'ar' | 'en'

export type BilingualText = {
  ar: string
  en: string
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export type ContactStatus = 'new' | 'pending' | 'completed' | 'rejected'

export type ContactSource = 'contact' | 'project'

export type ProjectCategory = 'web' | 'mobile' | 'branding'

export type AdminTab = 'projects' | 'contacts'

export type ChatRole = 'user' | 'assistant'
