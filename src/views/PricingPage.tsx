'use client';

import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Check, Zap, Rocket, Star } from 'lucide-react';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';

export default function PricingPage() {
  const { i18n } = useTranslation();

  const tiers = [
    {
      name: i18n.language === 'ar' ? 'الانطلاقة' : 'Starter',
      price: i18n.language === 'ar' ? '2999 ريال' : '$799',
      icon: <Zap />,
      features: [
        i18n.language === 'ar' ? 'موقع تعريفي 5 صفحات' : '5 Page Corporate Site',
        i18n.language === 'ar' ? 'تصميم متجاوب بالكامل' : 'Fully Responsive Design',
        i18n.language === 'ar' ? 'ربط مع وسائل التواصل' : 'Social Media Integration',
        i18n.language === 'ar' ? 'دعم فني لمدة 3 أشهر' : '3 Months Support',
      ],
      cta: i18n.language === 'ar' ? 'ابدأ الآن' : 'Get Started',
      popular: false
    },
    {
      name: i18n.language === 'ar' ? 'احترافي' : 'Professional',
      price: i18n.language === 'ar' ? '6999 ريال' : '$1899',
      icon: <Rocket />,
      features: [
        i18n.language === 'ar' ? 'موقع متعدد اللغات' : 'Multilingual Site',
        i18n.language === 'ar' ? 'لوحة تحكم كاملة' : 'Full CMS Dashboard',
        i18n.language === 'ar' ? 'تحسين SEO أساسي' : 'Basic SEO Setup',
        i18n.language === 'ar' ? 'دعم فني لمدة 6 أشهر' : '6 Months Support',
      ],
      cta: i18n.language === 'ar' ? 'الأكثر طلباً' : 'Most Popular',
      popular: true
    },
    {
      name: i18n.language === 'ar' ? 'مخصص' : 'Enterprise',
      price: i18n.language === 'ar' ? 'مشروع مخصص' : 'Custom Quote',
      icon: <Star />,
      features: [
        i18n.language === 'ar' ? 'تطبيقات جوال Native' : 'Native Mobile Apps',
        i18n.language === 'ar' ? 'أنظمة ERP مخصصة' : 'Custom ERP Systems',
        i18n.language === 'ar' ? 'تحسين SEO متقدم' : 'Advanced SEO Solution',
        i18n.language === 'ar' ? 'دعم فني مفتوح' : 'Priority Support',
      ],
      cta: i18n.language === 'ar' ? 'تواصل معنا' : 'Contact Us',
      popular: false
    }
  ];

  return (
    <Layout>
      <Seo title={i18n.language === 'ar' ? 'الباقات والأسعار' : 'Pricing'} description={i18n.language === 'ar' ? 'باقات مرنة لجميع المشاريع - اختر الباقة المناسبة لبدء مشروعك الرقمي' : 'Flexible packages for all projects - choose the right plan for your digital project'} path="/pricing" />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-20">
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-6">
                 {i18n.language === 'ar' ? 'باقات مرنة' : 'Flexible Packages'}
              </h1>
              <p className="text-xl text-neutral-500">
                 {i18n.language === 'ar' ? 'أسعار شفافة تناسب جميع أحجام الأعمال، من الشركات الناشئة إلى الكبرى.' : 'Transparent pricing for all business sizes, from startups to enterprises.'}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier, idx) => (
                <Reveal key={idx} delay={idx * 0.12} direction="up">
                  <div 
                    className={`relative p-10 rounded-[2.5rem] border transition-all duration-300 hover:shadow-2xl ${tier.popular ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-2xl scale-105 hover:scale-[1.07]' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:-translate-y-1'}`}
                  >
                     {tier.popular && (
                       <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                          {i18n.language === 'ar' ? 'الأفضل قيمة' : 'Best Value'}
                       </span>
                     )}
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${tier.popular ? 'bg-white/10' : 'bg-neutral-100 dark:bg-neutral-800 text-brand-accent'}`}>
                        {tier.icon}
                     </div>
                     <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                     <div className="text-4xl font-bold mb-8">{tier.price}</div>
                     <ul className="space-y-4 mb-10">
                        {tier.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center text-sm font-medium opacity-80 gap-2">
                             <Check size={18} className="text-brand-accent flex-shrink-0" />
                             <span>{feature}</span>
                          </li>
                        ))}
                     </ul>
                      <Link href="/start-project" className={`block w-full py-4 rounded-xl font-bold text-center transition-all duration-200 ${tier.popular ? 'bg-brand-accent text-white hover:opacity-90 hover:shadow-lg' : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] hover:shadow-lg'}`}>
                         {tier.cta}
                      </Link>
                  </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>
    </Layout>
  );
}
