'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, LogOut, FolderKanban, Mail } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Reveal from '@/components/effects/Reveal'
import Seo from '@/components/effects/Seo'
import { useAuth } from '@/contexts/AuthContext'
import ProjectForm from './ProjectForm'
import AdminContacts from './AdminContacts'
import type { ProjectFormData, AdminTab, Lang } from '@/types'
import type { Database } from '@/lib/database.types'

type ProjectRow = Database['public']['Tables']['projects']['Row']

export default function AdminDashboard() {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  const { user, logout, loading: authLoading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<AdminTab>('contacts')
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [editing, setEditing] = useState<ProjectRow | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saveError, setSaveError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) { router.push('/login'); return }
    fetchProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading])

  const fetchProjects = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch('/api/projects')
      const data: ProjectRow[] = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSave = useCallback(async (data: ProjectFormData): Promise<void> => {
    setSaveError('')
    try {
      const url = editing ? `/api/projects/${editing.id}` : '/api/projects'
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        setSaveError(err?.error || 'Failed to save project')
        return
      }
      setShowForm(false)
      setEditing(null)
      await fetchProjects()
    } catch {
      setSaveError('Network error. Please try again.')
    }
  }, [editing, fetchProjects])

  const handleDelete = useCallback(async (id: string): Promise<void> => {
    setDeleteError('')
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?')) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        setDeleteError(err?.error || 'Failed to delete project')
        return
      }
      await fetchProjects()
    } catch {
      setDeleteError('Network error. Please try again.')
    }
  }, [lang, fetchProjects])

  const handleLogout = useCallback(async (): Promise<void> => {
    await logout()
    router.push('/')
  }, [logout, router])

  const toFormData = useCallback((p: ProjectRow): ProjectFormData => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category || undefined,
    description: p.description || undefined,
    image_url: p.image_url || undefined,
    technologies: p.technologies || [],
    featured: p.featured || false,
  }), [])

  if (loading || authLoading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-skeleton" />
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title={lang === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'} description="" />
      <section className="min-h-screen pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-accent/10 rounded-2xl">
                  <FolderKanban size={28} className="text-brand-accent" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold">
                    {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </h1>
                  <p className="text-neutral-500 text-sm">{user?.name} ({user?.role})</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setEditing(null); setShowForm(true); setSaveError('') }}
                  className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                  <Plus size={18} aria-hidden="true" />
                  {lang === 'ar' ? 'إضافة مشروع' : 'Add Project'}
                </button>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                  aria-label={lang === 'ar' ? 'تسجيل خروج' : 'Logout'}>
                  <LogOut size={18} aria-hidden="true" />
                  {lang === 'ar' ? 'خروج' : 'Logout'}
                </button>
              </div>
            </div>
          </Reveal>

          <div className="flex gap-1 mb-8 bg-neutral-100/80 dark:bg-neutral-900/80 glass p-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-fit" role="tablist">
            <button onClick={() => setTab('contacts')}
              role="tab"
              aria-selected={tab === 'contacts'}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent ${tab === 'contacts' ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}>
              <Mail size={16} aria-hidden="true" />
              {lang === 'ar' ? 'طلبات العملاء' : 'Requests'}
            </button>
            <button onClick={() => setTab('projects')}
              role="tab"
              aria-selected={tab === 'projects'}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent ${tab === 'projects' ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}>
              <FolderKanban size={16} aria-hidden="true" />
              {lang === 'ar' ? 'المشاريع' : 'Projects'}
            </button>
          </div>

          {(saveError || deleteError) && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm" role="alert">
              {saveError || deleteError}
            </div>
          )}

          {tab === 'contacts' && <AdminContacts />}

          {tab === 'projects' && (
            <>
              {showForm && (
                <Reveal>
                  <div className="glass p-6 md:p-8 rounded-[2rem] mb-10 border border-neutral-200 dark:border-neutral-800">
                    <h2 className="text-xl font-bold mb-6">
                      {editing ? (lang === 'ar' ? 'تعديل مشروع' : 'Edit Project') : (lang === 'ar' ? 'إضافة مشروع جديد' : 'New Project')}
                    </h2>
                    <ProjectForm
                      project={editing ? toFormData(editing) : null}
                      onSave={handleSave}
                      onCancel={() => { setShowForm(false); setEditing(null); setSaveError('') }}
                    />
                  </div>
                </Reveal>
              )}

              {projects.length === 0 ? (
                <div className="text-center py-20 text-neutral-400">
                  <FolderKanban size={40} className="mx-auto mb-4 opacity-30" aria-hidden="true" />
                  <p>{lang === 'ar' ? 'لا توجد مشاريع' : 'No projects found'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project, idx) => (
                    <Reveal key={project.id} delay={idx * 0.05}>
                      <div className="glass p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {project.image_url && (
                          <img src={project.image_url} alt={project.title} className="w-16 h-16 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" loading="lazy" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate">{project.title}</h3>
                          {project.description && (
                            <p className="text-sm text-neutral-500 truncate">{project.description}</p>
                          )}
                          {project.category && (
                            <span className="text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full font-medium mt-1 inline-block">{project.category}</span>
                          )}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.technologies.map((tech: string) => (
                                <span key={tech} className="text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full font-medium">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => { setEditing(project); setShowForm(true); setSaveError('') }}
                            className="p-2 text-neutral-500 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={lang === 'ar' ? 'تعديل المشروع' : 'Edit project'}>
                            <Pencil size={18} aria-hidden="true" />
                          </button>
                          <button onClick={() => handleDelete(project.id)}
                            className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label={lang === 'ar' ? 'حذف المشروع' : 'Delete project'}>
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}
