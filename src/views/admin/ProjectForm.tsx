'use client'

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import type { ProjectFormData } from '@/types'
import type { Lang } from '@/types'

interface Props {
  project?: ProjectFormData | null
  onSave: (data: ProjectFormData) => Promise<void>
  onCancel: () => void
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const defaultProject: ProjectFormData = {
  title: '',
  slug: '',
  category: 'web',
  description: '',
  image_url: '',
  technologies: [],
  featured: false,
}

export default function ProjectForm({ project, onSave, onCancel }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  const [form, setForm] = useState<ProjectFormData>(defaultProject)
  const [techInput, setTechInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (project) {
      setForm(project)
    } else {
      setForm(defaultProject)
    }
  }, [project])

  const update = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]): void =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleFieldChange =
    (key: keyof ProjectFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
      const value = e.target.value
      update(key, value as ProjectFormData[typeof key])

      if (key === 'title' && !project) {
        update('slug', generateSlug(value))
      }
    }

  const addTechnology = (): void => {
    if (techInput.trim()) {
      update('technologies', [...(form.technologies || []), techInput.trim()])
      setTechInput('')
    }
  }

  const removeTechnology = (index: number): void => {
    const arr = (form.technologies || []).filter((_, i) => i !== index)
    update('technologies', arr)
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await onSave({
        ...form,
        technologies: (form.technologies || []).filter((t) => t.trim()),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const label = (ar: string, en: string): string => (lang === 'ar' ? ar : en)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={dir}>
      <div>
        <label htmlFor="project-title" className="block text-sm font-bold mb-1">{label('العنوان', 'Title')}</label>
        <input id="project-title" type="text" value={form.title} onChange={handleFieldChange('title')}
          className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-accent/50" required />
      </div>

      <div>
        <label htmlFor="project-slug" className="block text-sm font-bold mb-1">{label('الرابط (Slug)', 'Slug')}</label>
        <input id="project-slug" type="text" value={form.slug} onChange={handleFieldChange('slug')}
          className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-accent/50" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-category" className="block text-sm font-bold mb-1">{label('التصنيف', 'Category')}</label>
          <select id="project-category" value={form.category} onChange={handleFieldChange('category')}
            className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-accent/50">
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="branding">Branding</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)}
              className="w-5 h-5 rounded accent-brand-accent" />
            <span className="text-sm font-bold">{label('مميز', 'Featured')}</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="project-image" className="block text-sm font-bold mb-1">{label('صورة الرابط', 'Image URL')}</label>
        <input id="project-image" type="url" value={form.image_url} onChange={handleFieldChange('image_url')}
          className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-accent/50" />
      </div>

      <div>
        <label htmlFor="project-description" className="block text-sm font-bold mb-1">{label('الوصف', 'Description')}</label>
        <textarea id="project-description" value={form.description} onChange={handleFieldChange('description')} rows={3}
          className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-accent/50 resize-none" />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2">{label('التقنيات', 'Technologies')}</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {(form.technologies || []).map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
              {t}
              <button type="button" onClick={() => removeTechnology(i)}
                className="text-red-500 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                aria-label={label(`إزالة ${t}`, `Remove ${t}`)}>
                <Trash2 size={12} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTechnology() } }}
            placeholder={label('أضف تقنية...', 'Add technology...')}
            className="flex-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-accent/50" />
          <button type="button" onClick={addTechnology}
            className="p-2 bg-brand-accent text-white rounded-xl hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label={label('إضافة تقنية', 'Add technology')}>
            <Plus size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting}
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2">
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {label('حفظ', 'Save')}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}
          className="px-8 py-3 rounded-xl font-bold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all disabled:opacity-50">
          {label('إلغاء', 'Cancel')}
        </button>
      </div>
    </form>
  )
}
