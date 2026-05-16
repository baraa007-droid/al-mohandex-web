import type { Database } from '@/lib/database.types'

export type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_image?: string
  published: boolean
  author_id?: string
  created_at: string
  updated_at: string
}
