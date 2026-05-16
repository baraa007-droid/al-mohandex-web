import { getSupabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']

export async function getBlogPosts() {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPostRow[]
}

export async function getPublishedPosts() {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPostRow[]
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as BlogPostRow
}

export async function getBlogPostById(id: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as BlogPostRow
}

export async function createBlogPost(payload: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('blog_posts') as any)
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as BlogPostRow
}

export async function updateBlogPost(id: string, updates: unknown) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('blog_posts') as any)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as BlogPostRow
}

export async function deleteBlogPost(id: string) {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
