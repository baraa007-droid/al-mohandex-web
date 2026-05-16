'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, Moon, Sun, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false
  const saved = localStorage.getItem('muhandex-theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const lang = i18n.language as 'ar' | 'en'

  useEffect(() => {
    setIsDark(getInitialTheme())
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      if (currentY > 100) {
        setHidden(currentY > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('muhandex-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleLang = useCallback(() => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(nextLang)
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = nextLang
  }, [i18n])

  const navLinks = useMemo(() => [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ], [t])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        hidden ? '-translate-y-full' : 'translate-y-0',
        scrolled
          ? 'glass-strong shadow-sm border-neutral-200/50 dark:border-neutral-800/50'
          : 'bg-transparent border-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group" aria-label={lang === 'ar' ? 'المهندكس - الرئيسية' : 'Al-Mohandex - Home'}>
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <span className="text-white dark:text-black font-display font-bold text-xl">{lang === 'ar' ? 'م' : 'A'}</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter group-hover:text-brand-accent transition-colors">
              {lang === 'ar' ? 'المهندكس' : 'Al-Mohandex'}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1" role="menubar">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  role="menuitem"
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950",
                    pathname === link.path
                      ? "text-brand-accent bg-brand-accent/5"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  )}
                  aria-current={pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {user?.role === 'admin' && (
              <Link href="/admin"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-accent hover:bg-brand-accent/5 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label={lang === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}>
                <LayoutDashboard size={16} aria-hidden="true" />
                <span className="hidden lg:inline">{lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Link>
            )}
            <div className="flex items-center gap-3 border-s border-neutral-200 dark:border-neutral-800 ps-6 h-6">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label={isDark ? (lang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode') : (lang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode')}
              >
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
                </motion.div>
              </button>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium hover:text-brand-accent hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <Globe size={16} aria-hidden="true" />
                <span className="uppercase tracking-wider">{lang === 'ar' ? 'EN' : 'AR'}</span>
              </button>
              <Link
                href="/start-project"
                className="relative overflow-hidden bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                aria-label={t('nav.startProject') as string}
              >
                <span className="relative z-10">{t('nav.startProject')}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-label={isDark ? (lang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode') : (lang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode')}
            >
              {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-all text-neutral-600 dark:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-label={isOpen ? (lang === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (lang === 'ar' ? 'فتح القائمة' : 'Open menu')}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 glass-strong md:hidden overflow-hidden shadow-xl"
            role="dialog"
            aria-label={lang === 'ar' ? 'قائمة التنقل' : 'Navigation menu'}
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "block text-2xl font-display font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg px-2 -mx-2",
                    pathname === link.path ? "text-brand-accent" : ""
                  )}
                  aria-current={pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col space-y-4">
                {user?.role === 'admin' && (
                  <Link href="/admin"
                    className="flex items-center gap-2 text-lg font-medium text-brand-accent py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg px-2 -mx-2">
                    <LayoutDashboard size={20} aria-hidden="true" />
                    {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  </Link>
                )}
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 text-lg font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg px-2 -mx-2"
                  aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                >
                  <Globe size={20} aria-hidden="true" />
                  <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                </button>
                <Link
                  href="/start-project"
                  className="w-full bg-brand-accent text-white py-4 rounded-xl text-center font-bold text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  aria-label={t('nav.startProject') as string}
                >
                  {t('nav.startProject')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
