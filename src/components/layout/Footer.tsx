'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Github, Twitter, Linkedin, Instagram } from '@/lib/social-icons'

const SOCIAL_LINKS = [
  { href: 'https://twitter.com/almohandex', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/almohandex', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/almohandex', icon: Github, label: 'GitHub' },
  { href: 'https://instagram.com/almohandex', icon: Instagram, label: 'Instagram' },
]

export default function Footer() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ar' | 'en'

  const sections = useMemo(() => [
    {
      title: t('footer.quickLinks'),
      links: [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.portfolio'), path: '/portfolio' },
        { name: t('nav.blog'), path: '/blog' },
      ],
    },
    {
      title: t('footer.services'),
      links: [
        { name: t('services.web'), path: '/services/web' },
        { name: t('services.mobile'), path: '/services/mobile' },
        { name: t('services.design'), path: '/services/ui-ux' },
        { name: t('services.branding'), path: '/services/branding' },
      ],
    },
  ], [t])

  return (
    <footer className="bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg" aria-label={lang === 'ar' ? 'المهندكس - الرئيسية' : 'Al-Mohandex - Home'}>
              <div className="w-8 h-8 bg-black dark:bg-white rounded flex items-center justify-center">
                <span className="text-white dark:text-black font-bold">{lang === 'ar' ? 'م' : 'A'}</span>
              </div>
              <span className="text-xl font-bold tracking-tighter">
                {lang === 'ar' ? 'المهندكس' : 'Al-Mohandex'}
              </span>
            </Link>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-4" aria-label={lang === 'ar' ? 'روابط التواصل الاجتماعي' : 'Social media links'}>
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg hover:bg-brand-accent hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  aria-label={label}
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.path} className="text-neutral-500 dark:text-neutral-400 hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg px-1 -mx-1">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-neutral-500 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-accent flex-shrink-0" aria-hidden="true" />
                <span>Riyadh, Saudi Arabia / Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-accent flex-shrink-0" aria-hidden="true" />
                <a href="tel:+966551234567" className="hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded">+966 55 123 4567</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-accent flex-shrink-0" aria-hidden="true" />
                <a href="mailto:almohandex@gmail.com" className="hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded">almohandex@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Al-Mohandex. {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-sm text-neutral-500">
            <Link href="/privacy" className="hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
