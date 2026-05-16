'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/effects/Seo';

export default function NotFoundPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';

  const links = [
    { to: '/',          label: lang === 'ar' ? 'الرئيسية'  : 'Home'      },
    { to: '/services',  label: lang === 'ar' ? 'خدماتنا'   : 'Services'  },
    { to: '/portfolio', label: lang === 'ar' ? 'أعمالنا'   : 'Portfolio' },
    { to: '/contact',   label: lang === 'ar' ? 'تواصل'     : 'Contact'   },
  ];

  return (
    <Layout>
      <Seo title={lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'} description="" />
      <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">

        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
            className="relative mb-6 select-none"
          >
            <span className="text-[160px] md:text-[220px] font-display font-black leading-none text-neutral-100 dark:text-neutral-900">404</span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center text-[160px] md:text-[220px] font-display font-black leading-none text-brand-accent/10"
            >
              404
            </motion.span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {lang === 'ar' ? 'هذه الصفحة غير موجودة' : 'This page does not exist'}
            </h1>
            <p className="text-lg text-neutral-500 mb-10">
              {lang === 'ar'
                ? 'يبدو أن الرابط معطوب أو أن الصفحة تم حذفها.'
                : 'The link you followed may be broken or the page has been removed.'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {links.map(link => (
              <Link key={link.to} href={link.to}
                className="px-5 py-2.5 rounded-full text-sm font-bold border border-neutral-200 dark:border-neutral-800 hover:border-brand-accent hover:text-brand-accent transition-all">
                {link.label}
              </Link>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-xl active:scale-95 transition-all">
              <Home size={18} />
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
            <button onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-accent font-bold px-6 py-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all">
              <ArrowLeft size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
              {lang === 'ar' ? 'الصفحة السابقة' : 'Go Back'}
            </button>
          </motion.div>

        </div>
      </section>
    </Layout>
  );
}
