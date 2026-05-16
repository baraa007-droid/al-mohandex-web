'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, MessageSquare, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { ContactRow, ContactStatus, Lang } from '@/types'
import type { LucideIcon } from 'lucide-react'

const statusColors: Record<ContactStatus, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

const statusIcons: Record<ContactStatus, LucideIcon> = {
  new: Clock,
  pending: Clock,
  completed: CheckCircle2,
  rejected: XCircle,
}

type FilterValue = ContactStatus | 'all'

export default function AdminContacts() {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  const { user } = useAuth()
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [filter, setFilter] = useState<FilterValue>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    fetch('/api/contacts')
      .then((r) => r.json())
      .then((data: ContactRow[]) => setContacts(data))
      .catch(() => setError('Failed to load contacts'))
      .finally(() => setLoading(false))
  }, [user])

  const updateStatus = useCallback(async (id: string, status: string): Promise<void> => {
    setUpdating(id)
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
      } else {
        setError('Failed to update status')
      }
    } catch {
      setError('Network error')
    } finally {
      setUpdating(null)
    }
  }, [])

  const filtered: ContactRow[] = filter === 'all' ? contacts : contacts.filter((c) => c.status === filter)

  const formatDate = useCallback((dateStr: string | null): string => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }, [lang])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-skeleton" />
      </div>
    )
  }

  if (error && contacts.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-400">
        <Mail size={40} className="mx-auto mb-4 opacity-30" aria-hidden="true" />
        <p>{error}</p>
      </div>
    )
  }

  const filterLabels: Record<FilterValue, { ar: string; en: string }> = {
    all:       { ar: 'الكل',   en: 'All' },
    new:       { ar: 'جديد',   en: 'New' },
    pending:   { ar: 'معلق',   en: 'Pending' },
    completed: { ar: 'مكتمل',  en: 'Completed' },
    rejected:  { ar: 'مرفوض',  en: 'Rejected' },
  }

  const statusLabels: Record<ContactStatus, { ar: string; en: string }> = {
    new:       { ar: 'جديد',   en: 'New' },
    pending:   { ar: 'معلق',   en: 'Pending' },
    completed: { ar: 'مكتمل',  en: 'Completed' },
    rejected:  { ar: 'مرفوض',  en: 'Rejected' },
  }

  const allFilters: FilterValue[] = ['all', 'new', 'pending', 'completed', 'rejected']

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm" role="alert">
          {error}
          <button onClick={() => setError('')} className="ml-2 underline">Dismiss</button>
        </div>
      )}
      <div className="flex items-center gap-2 mb-6 flex-wrap" role="group" aria-label="Filter contacts">
        <Filter size={16} className="text-neutral-400" aria-hidden="true" />
        {allFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent ${
              filter === f
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800'
            }`}
          >
            {filterLabels[f][lang]}
            {f !== 'all' && (
              <span className="ml-1.5 opacity-60">
                ({contacts.filter((c) => c.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <Mail size={40} className="mx-auto mb-4 opacity-30" aria-hidden="true" />
          <p>{lang === 'ar' ? 'لا توجد طلبات' : 'No requests found'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((contact) => {
            const status = (contact.status as ContactStatus) || 'new'
            const StatusIcon = statusIcons[status]
            return (
              <div
                key={contact.id}
                className="glass p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-brand-accent/10">
                      <MessageSquare size={18} className="text-brand-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{contact.name}</h4>
                      <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                        <Mail size={12} aria-hidden="true" />
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${statusColors[status]}`}>
                      <StatusIcon size={12} aria-hidden="true" />
                      {statusLabels[status][lang]}
                    </span>
                  </div>
                </div>

                {contact.subject && (
                  <p className="text-xs text-neutral-400 mb-2">
                    <strong>{lang === 'ar' ? 'الموضوع:' : 'Subject:'}</strong> {contact.subject}
                  </p>
                )}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                  {contact.message}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">{formatDate(contact.created_at)}</span>
                  {(status === 'new' || status === 'pending') && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => updateStatus(contact.id, 'completed')}
                        disabled={updating === contact.id}
                        className="px-3 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        aria-label={lang === 'ar' ? 'موافقة' : 'Approve'}
                      >
                        {updating === contact.id ? '...' : (lang === 'ar' ? 'موافقة' : 'Approve')}
                      </button>
                      <button
                        onClick={() => updateStatus(contact.id, 'rejected')}
                        disabled={updating === contact.id}
                        className="px-3 py-1 text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={lang === 'ar' ? 'رفض' : 'Reject'}
                      >
                        {updating === contact.id ? '...' : (lang === 'ar' ? 'رفض' : 'Reject')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
