'use client'

import { useState, type FormEvent, type ChangeEvent, useCallback, useMemo } from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/effects/Reveal'
import Seo from '@/components/effects/Seo'
import SuccessConfetti from '@/components/effects/SuccessConfetti'
import type { StartProjectFormErrors } from '@/types'

function validate(form: { name: string; email: string; details: string }): StartProjectFormErrors {
  const errors: StartProjectFormErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email format'
  if (!form.details.trim()) errors.details = 'Project details are required'
  return errors
}

export default function StartProjectPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ar' | 'en'
  const [form, setForm] = useState({ name: '', email: '', details: '' })
  const [errors, setErrors] = useState<StartProjectFormErrors>({})
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  const toggleService = useCallback((id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }, [])

  const update = useCallback((field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof StartProjectFormErrors]) setErrors((prev: StartProjectFormErrors) => ({ ...prev, [field]: undefined }))
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: 'Project Inquiry',
          service: selectedServices.join(', '),
          message: form.details,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setSubmitError(data?.error || 'Failed to send inquiry')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setSubmitError('Network error. Please try again.')
      setStatus('error')
    }
  }

  const handleReset = useCallback(() => {
    setStatus('idle')
    setForm({ name: '', email: '', details: '' })
    setSelectedServices([])
    setErrors({})
    setSubmitError('')
  }, [])

  const services = useMemo(() => [
    { id: 'web', name: i18n.language === 'ar' ? 'موقع إلكتروني' : 'Website' },
    { id: 'mobile', name: i18n.language === 'ar' ? 'تطبيق جوال' : 'Mobile App' },
    { id: 'branding', name: i18n.language === 'ar' ? 'هوية بصرية' : 'Branding' },
    { id: 'uiux', name: i18n.language === 'ar' ? 'تصميم واجهات' : 'UI/UX Design' },
    { id: 'seo', name: i18n.language === 'ar' ? 'تسويق و SEO' : 'Marketing & SEO' },
    { id: 'other', name: i18n.language === 'ar' ? 'أخرى' : 'Other' },
  ], [i18n.language])

  return (
    <Layout>
      <Seo title={i18n.language === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'} description={i18n.language === 'ar' ? 'أخبرنا عن فكرتك، وسيقوم فريقنا من الخبراء بتحليلها وتقديم أفضل الحلول' : 'Tell us about your idea, and our expert team will analyze it and provide the best solutions'} path="/start-project" />
      <section className="pt-32 pb-24 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-7xl font-display font-bold mb-6">
                {i18n.language === 'ar' ? 'ابدأ رحلة نجاحك معنا' : 'Start Your Success Story'}
              </h1>
              <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                {i18n.language === 'ar' 
                  ? 'أخبرنا عن فكرتك، وسيقوم فريقنا من الخبراء بتحليلها وتقديم أفضل الحلول التقنية لك.' 
                  : 'Tell us about your idea, and our expert team will analyze it and provide the best technical solutions.'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 shadow-2xl hover:shadow-xl transition-shadow duration-300">
            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 relative overflow-hidden"
              >
                <SuccessConfetti />
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white">
                  <CheckCircle2 size={48} aria-hidden="true" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {i18n.language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Inquiry Received Successfully!'}
                </h2>
                <p className="text-neutral-500 text-lg">
                  {i18n.language === 'ar' ? 'سيتواصل معك أحد مستشارينا التقنيين خلال 24 ساعة.' : 'One of our technical consultants will contact you within 24 hours.'}
                </p>
                <button 
                  onClick={handleReset}
                  className="mt-8 text-brand-accent font-bold focus:outline-none focus:underline"
                >
                  {i18n.language === 'ar' ? 'إرسال طلب آخر' : 'Send another inquiry'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-400" htmlFor="project-name">
                      {i18n.language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input 
                      id="project-name"
                      required
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'project-name-error' : undefined}
                      placeholder={i18n.language === 'ar' ? 'أحمد محمد' : 'John Doe'}
                      className={cn("w-full bg-neutral-50 dark:bg-black border rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors", errors.name ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800 focus:border-brand-accent')}
                    />
                    {errors.name && <p id="project-name-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert"><AlertCircle size={12} aria-hidden="true" />{lang === 'ar' ? 'الاسم مطلوب' : errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-400" htmlFor="project-email">
                      {i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input 
                      id="project-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'project-email-error' : undefined}
                      placeholder="hello@example.com"
                      className={cn("w-full bg-neutral-50 dark:bg-black border rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors", errors.email ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800 focus:border-brand-accent')}
                    />
                    {errors.email && <p id="project-email-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert"><AlertCircle size={12} aria-hidden="true" />{lang === 'ar' ? 'بريد إلكتروني غير صالح' : errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-400 block" id="services-label">
                    {i18n.language === 'ar' ? 'ما نوع الخدمة التي تهتم بها؟' : 'Which service are you interested in?'}
                  </label>
                  <div className="flex flex-wrap gap-4" role="group" aria-labelledby="services-label">
                    {services.map((service) => (
                      <label key={service.id} className="relative">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => toggleService(service.id)}
                        />
                        <div className="px-6 py-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-full cursor-pointer transition-all peer-checked:bg-brand-accent peer-checked:text-white peer-checked:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent focus-within:ring-offset-2 dark:focus-within:ring-offset-neutral-900">
                          {service.name}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-400" htmlFor="project-details">
                    {i18n.language === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}
                  </label>
                  <textarea 
                    id="project-details"
                    rows={5}
                    required
                    value={form.details}
                    onChange={update('details')}
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? 'project-details-error' : undefined}
                    placeholder={i18n.language === 'ar' ? 'أخبرنا عن فكرتك، ميزانيتك، والجدول الزمني المقترح...' : 'Tell us about your idea, budget, and estimated timeline...'}
                    className={cn("w-full bg-neutral-50 dark:bg-black border rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-colors resize-none", errors.details ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800 focus:border-brand-accent')}
                  />
                  {errors.details && <p id="project-details-error" className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert"><AlertCircle size={12} aria-hidden="true" />{lang === 'ar' ? 'تفاصيل المشروع مطلوبة' : errors.details}</p>}
                </div>

                {(status === 'error' || submitError) && (
                  <div className="flex items-center gap-2 text-red-500 text-sm" role="alert">
                    <AlertCircle size={16} aria-hidden="true" />
                    {submitError || (i18n.language === 'ar' ? 'فشل الإرسال. حاول مرة أخرى.' : 'Failed to send. Try again.')}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                  className={cn(
                    "w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 dark:focus:ring-offset-neutral-900",
                    status === 'loading'
                      ? 'bg-neutral-400 text-white cursor-not-allowed'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98]'
                  )}
                >
                  {status === 'loading' ? <Loader2 size={24} className="animate-spin mr-2" aria-hidden="true" /> : null}
                  <span>{status === 'loading'
                    ? (i18n.language === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                    : (i18n.language === 'ar' ? 'إرسال الطلب' : 'Send Inquiry')
                  }</span>
                  {status !== 'loading' && (
                    <Send size={20} className={cn(
                      "ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform",
                      i18n.language === 'ar' && "rotate-180 mr-3 ml-0 group-hover:-translate-x-1"
                    )} aria-hidden="true" />
                  )}
                </button>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
