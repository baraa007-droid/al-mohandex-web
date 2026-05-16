'use client'

import { useState, type FormEvent, type ChangeEvent, useCallback } from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/effects/Reveal'
import Seo from '@/components/effects/Seo'
import SuccessConfetti from '@/components/effects/SuccessConfetti'
import type { ContactFormErrors } from '@/types'

function validate(form: { name: string; email: string; message: string }): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email format'
  if (!form.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function ContactPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ar' | 'en'
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const update = useCallback((field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof ContactFormErrors]) setErrors((prev: ContactFormErrors) => ({ ...prev, [field]: undefined }))
    setSubmitError('')
  }, [errors])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStatus('loading')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setSubmitError(data?.error || 'Failed to send message')
        setStatus('error')
        return
      }
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch {
      setSubmitError('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <Layout>
      <Seo title={t('contact.title') as string} description={t('contact.subtitle') as string} path="/contact" />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <Reveal direction="left">
                <div>
                   <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter">
                     {t('contact.title')}
                   </h1>
                   <p className="text-xl text-neutral-500 mb-12">
                     {t('contact.subtitle')}
                   </p>
                   
                   <div className="space-y-8">
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-300">
                           <Mail size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-1">{t('contact.email')}</h3>
                          <p className="text-neutral-500">almohandex@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-300">
                           <Phone size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-1">{t('contact.call')}</h3>
                          <p className="text-neutral-500">+966 55 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-300">
                           <MapPin size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-1">{t('contact.location')}</h3>
                          <p className="text-neutral-500">Riyadh, KSA / Dubai, UAE</p>
                        </div>
                      </div>
                   </div>
                </div>
              </Reveal>

              <Reveal direction="right">
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] p-8 md:p-12 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow duration-300">
                    {status === 'success' ? (
                      <div className="text-center py-12 relative overflow-hidden">
                        <SuccessConfetti />
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                          <CheckCircle2 size={32} aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t('contact.formSubmit')}</h3>
                        <p className="text-neutral-500">{t('contact.subtitle')}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="contact-name" className="sr-only">{t('contact.formName')}</label>
                            <input 
                              id="contact-name"
                              type="text" 
                              value={form.name}
                              onChange={update('name')}
                              required
                              placeholder={t('contact.formName')} 
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? 'contact-name-error' : undefined}
                              className={cn("w-full bg-white dark:bg-black border rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all", errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-200 dark:border-neutral-800 focus:border-brand-accent focus:ring-brand-accent/20')}
                            />
                            {errors.name && <p id="contact-name-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1" role="alert"><AlertCircle size={12} aria-hidden="true" />{lang === 'ar' ? 'الاسم مطلوب' : errors.name}</p>}
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="sr-only">{t('contact.formEmail')}</label>
                            <input 
                              id="contact-email"
                              type="email" 
                              value={form.email}
                              onChange={update('email')}
                              required
                              placeholder={t('contact.formEmail')} 
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? 'contact-email-error' : undefined}
                              className={cn("w-full bg-white dark:bg-black border rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all", errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-200 dark:border-neutral-800 focus:border-brand-accent focus:ring-brand-accent/20')}
                            />
                            {errors.email && <p id="contact-email-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1" role="alert"><AlertCircle size={12} aria-hidden="true" />{lang === 'ar' ? 'بريد إلكتروني غير صالح' : errors.email}</p>}
                          </div>
                       </div>
                       <div>
                         <label htmlFor="contact-subject" className="sr-only">{t('contact.formSubject')}</label>
                         <input 
                           id="contact-subject"
                           type="text" 
                           value={form.subject}
                           onChange={update('subject')}
                           placeholder={t('contact.formSubject')} 
                           className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                         />
                       </div>
                       <div>
                         <label htmlFor="contact-message" className="sr-only">{t('contact.formMessage')}</label>
                         <textarea 
                           id="contact-message"
                           rows={6} 
                           value={form.message}
                           onChange={update('message')}
                           required
                           placeholder={t('contact.formMessage')} 
                           aria-invalid={!!errors.message}
                           aria-describedby={errors.message ? 'contact-message-error' : undefined}
                           className={cn("w-full bg-white dark:bg-black border rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all resize-none", errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-200 dark:border-neutral-800 focus:border-brand-accent focus:ring-brand-accent/20')}
                         />
                         {errors.message && <p id="contact-message-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1" role="alert"><AlertCircle size={12} aria-hidden="true" />{lang === 'ar' ? 'الرسالة مطلوبة' : errors.message}</p>}
                       </div>
                      {(status === 'error' || submitError) && (
                        <div className="flex items-center gap-2 text-red-500 text-sm" role="alert">
                          <AlertCircle size={16} aria-hidden="true" />
                          <span>{submitError || t('contact.formError')}</span>
                        </div>
                      )}
                       <button
                         type="submit"
                         disabled={status === 'loading'}
                         aria-busy={status === 'loading'}
                         className={cn(
                           "w-full bg-brand-accent text-white py-5 rounded-xl font-bold text-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 dark:focus:ring-offset-neutral-900",
                           status === 'loading' ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg hover:scale-[1.01] active:scale-95'
                         )}
                       >
                         {status === 'loading' ? <Loader2 size={24} className="animate-spin" aria-hidden="true" /> : null}
                          {t('contact.formSubmit')}
                       </button>
                    </form>
                    )}
                </div>
              </Reveal>
           </div>
        </div>
      </section>
    </Layout>
  )
}
