export const SITE_NAME = 'Al-Mohandex'
export const SITE_NAME_AR = 'المهندكس'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const SITE_DESCRIPTION = 'Engineering & Technology company delivering modern digital solutions.'

export const NAV_LINKS = [
  { label: 'Home', labelAr: 'الرئيسية', href: '/' },
  { label: 'About', labelAr: 'من نحن', href: '/about' },
  { label: 'Services', labelAr: 'الخدمات', href: '/services' },
  { label: 'Portfolio', labelAr: 'أعمالنا', href: '/portfolio' },
  { label: 'Blog', labelAr: 'المدونة', href: '/blog' },
  { label: 'Contact', labelAr: 'اتصل بنا', href: '/contact' },
]

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/al-mohandex',
  twitter: 'https://twitter.com/almohandex',
  github: 'https://github.com/almohandex',
}

export const CONTACT_INFO = {
  email: 'almohandex@gmail.com',
  phone: '+962-XXX-XXX-XXX',
  address: 'Amman, Jordan',
}

export const RATE_LIMITS = {
  chat: { max: 20, windowMs: 60 * 1000 },
  contact: { max: 10, windowMs: 60 * 1000 },
  login: { max: 5, windowMs: 60 * 1000 },
  register: { max: 3, windowMs: 60 * 1000 },
}

export const STORAGE_KEYS = {
  theme: 'muhandex-theme',
  language: 'muhandex-lang',
  chatHistory: 'muhandex-chat',
  cookieConsent: 'muhandex-cookies',
}

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
}
