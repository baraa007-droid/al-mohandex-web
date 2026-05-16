'use client';

import { useTranslation } from 'react-i18next';
import { Code, Smartphone, Palette, BarChart, ShoppingCart, Megaphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlowCard from '@/components/effects/GlowCard';
import Reveal from '@/components/effects/Reveal';
import { cn } from '@/lib/utils';

export default function ServicesPreview() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';

  const services = [
    { icon: <Code className="w-8 h-8" />, title: t('services.web'), desc: t('services.webDesc'), color: "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white", link: '/services/web' },
    { icon: <Smartphone className="w-8 h-8" />, title: t('services.mobile'), desc: t('services.mobileDesc'), color: "bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white", link: '/services/mobile' },
    { icon: <Palette className="w-8 h-8" />, title: t('services.design'), desc: t('services.designDesc'), color: "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white", link: '/services/ui-ux' },
    { icon: <BarChart className="w-8 h-8" />, title: t('services.systems'), desc: t('services.systemsDesc'), color: "bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white", link: '/services/systems' },
    { icon: <ShoppingCart className="w-8 h-8" />, title: t('services.ecommerce'), desc: t('services.ecommerceDesc'), color: "bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white", link: '/services/ecommerce' },
    { icon: <Megaphone className="w-8 h-8" />, title: t('services.marketing'), desc: t('services.marketingDesc'), color: "bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white", link: '/services/marketing' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                {t('services.title')}
              </h2>
              <p className="text-xl text-neutral-500 dark:text-neutral-400">
                {t('services.subtitle')}
              </p>
            </div>
            <Link
              href="/services"
              className="group flex items-center gap-2 text-lg font-bold text-brand-accent hover:gap-3 transition-all"
            >
              <span>{t('services.viewAll')}</span>
              <ArrowRight className={cn(
                "transition-transform duration-300",
                lang === 'ar' ? "rotate-180" : "group-hover:translate-x-1"
              )} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 0.08} direction="up">
              <Link href={service.link} className="group block">
                <GlowCard className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 hover:border-brand-accent hover:shadow-xl hover:-translate-y-1 h-full transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">{service.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="text-sm font-bold flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-brand-accent translate-y-2 group-hover:translate-y-0">
                     {lang === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                     <ArrowRight size={14} className={lang === 'ar' ? "rotate-180 mr-1" : "ml-1 group-hover:translate-x-1 transition-transform"} />
                  </div>
                </GlowCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
