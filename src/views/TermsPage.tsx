'use client';

import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';

export default function TermsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';

  const sections = [
    { title: t('legal.termsAcceptance'), desc: t('legal.termsAcceptanceDesc') },
    { title: t('legal.termsServices'), desc: t('legal.termsServicesDesc') },
    { title: t('legal.termsObligations'), desc: t('legal.termsObligationsDesc') },
    { title: t('legal.termsIP'), desc: t('legal.termsIPDesc') },
    { title: t('legal.termsPayment'), desc: t('legal.termsPaymentDesc') },
    { title: t('legal.termsLimitation'), desc: t('legal.termsLimitationDesc') },
    { title: t('legal.termsContact'), desc: t('legal.termsContactDesc') },
  ];

  return (
    <Layout>
      <Seo title={t('legal.termsTitle')} description={lang === 'ar' ? 'شروط خدمة المهندكس - تنظم استخدامك لموقعنا وخدماتنا' : 'Al-Mohandex terms of service - governing your use of our website and services'} path="/terms" />
      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand-accent/10 rounded-2xl">
                <Scale size={32} className="text-brand-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                {t('legal.termsTitle')}
              </h1>
            </div>
            <p className="text-neutral-500 mb-12">
              {t('legal.termsLastUpdate')}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed mb-12 text-neutral-600 dark:text-neutral-400">
              {t('legal.termsIntro')}
            </p>
          </Reveal>

          <div className="space-y-10">
            {sections.map((section, idx) => (
              <Reveal key={section.title} delay={0.1 * (idx + 2)}>
                <div className="glass p-6 rounded-2xl">
                  <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{section.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
