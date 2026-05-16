'use client'

import { useState, type FormEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { LogIn, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Reveal from '@/components/effects/Reveal'
import Seo from '@/components/effects/Seo'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'ar' | 'en'
  const { login, register } = useAuth()
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      router.push('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = useCallback(() => {
    setIsRegister(prev => !prev)
    setError('')
  }, [])

  return (
    <Layout>
      <Seo title={isRegister ? (lang === 'ar' ? 'إنشاء حساب' : 'Register') : (lang === 'ar' ? 'تسجيل دخول' : 'Login')} description="" path="/login" />
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-md">
          <Reveal>
            <div className="glass p-8 md:p-10 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-brand-accent/10 rounded-2xl">
                  {isRegister ? <UserPlus size={28} className="text-brand-accent" aria-hidden="true" /> : <LogIn size={28} className="text-brand-accent" aria-hidden="true" />}
                </div>
              </div>
              <h1 className="text-2xl font-display font-bold text-center mb-8">
                {isRegister ? (lang === 'ar' ? 'إنشاء حساب جديد' : 'Create Account') : (lang === 'ar' ? 'تسجيل دخول' : 'Sign In')}
              </h1>

              {error && (
                <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm text-center" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {isRegister && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                    <div className="relative">
                      <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-12 py-3.5 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                        placeholder={lang === 'ar' ? 'الاسم كامل' : 'Full name'}
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-12 py-3.5 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                      placeholder="email@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-bold mb-2">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl px-12 py-3.5 outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                      placeholder="••••••••"
                      required
                      autoComplete={isRegister ? 'new-password' : 'current-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:text-neutral-600"
                      aria-label={showPassword ? (lang === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password') : (lang === 'ar' ? 'إظهار كلمة المرور' : 'Show password')}
                    >
                      {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                >
                  {loading ? (lang === 'ar' ? 'جاري...' : 'Loading...') : isRegister ? (lang === 'ar' ? 'إنشاء حساب' : 'Create Account') : (lang === 'ar' ? 'تسجيل دخول' : 'Sign In')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={toggleMode}
                  className="text-sm text-brand-accent hover:underline focus:outline-none focus:ring-2 focus:ring-brand-accent rounded px-2 py-1"
                >
                  {isRegister
                    ? (lang === 'ar' ? 'لديك حساب؟ سجل دخول' : 'Already have an account? Sign in')
                    : (lang === 'ar' ? 'ليس لديك حساب؟ إنشاء حساب' : "Don't have an account? Create one")}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}
