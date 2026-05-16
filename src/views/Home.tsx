'use client';

import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import Reveal from '@/components/effects/Reveal';
import AnimatedCounter from '@/components/effects/AnimatedCounter';
import FaqAccordion from '@/components/effects/FaqAccordion';
import BlurImage from '@/components/effects/BlurImage';
import Seo from '@/components/effects/Seo';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Quote, ArrowRight, BarChart3, Users, Award, Building2, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const statsData = [
  { icon: <BarChart3 size={32} />, end: 100, suffix: '+', key: 'stats.projects' },
  { icon: <Users size={32} />, end: 50, suffix: '+', key: 'stats.clients' },
  { icon: <Award size={32} />, end: 25, suffix: '+', key: 'stats.experts' },
  { icon: <Building2 size={32} />, end: 8, suffix: '+', key: 'stats.years' },
];

export default function Home() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{ name: string; role: string; text: string }>;

  return (
    <Layout>
      <Seo title={lang === 'ar' ? 'الرئيسية' : 'Home'} description={t('hero.subtitle')} path="/" />
      <Hero />

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-black border-y border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.1} direction="up">
                <div className="text-center p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="text-brand-accent mb-4 flex justify-center">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </div>
                  <p className="text-neutral-500 font-medium">{t(stat.key)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesPreview />

      {/* How We Work / Process */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                {t('process.title')}
              </h2>
              <p className="text-xl text-neutral-500">{t('process.subtitle')}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: t('process.step1'), desc: t('process.step1Desc') },
              { num: '02', title: t('process.step2'), desc: t('process.step2Desc') },
              { num: '03', title: t('process.step3'), desc: t('process.step3Desc') },
              { num: '04', title: t('process.step4'), desc: t('process.step4Desc') },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.15} direction="up">
                <div className="relative p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <span className="text-7xl font-display font-black text-brand-accent/5 absolute top-4 right-6 group-hover:text-brand-accent/10 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent font-bold text-xl mb-6 relative group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all duration-300">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-neutral-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                {t('testimonials.title')}
              </h2>
              <p className="text-xl text-neutral-500">{t('testimonials.subtitle')}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1} direction="up">
                <div className="relative p-10 bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <Quote size={32} className="text-brand-accent/20 mb-6 group-hover:text-brand-accent/30 transition-colors" />
                  <p className="text-lg leading-relaxed mb-8 text-neutral-600 dark:text-neutral-400">
                    "{item.text}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-neutral-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Reveal>
             <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                  {t('projects.title')}
                </h2>
                <p className="text-xl text-neutral-500">
                  {t('projects.subtitle')}
                </p>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[1, 2].map((project) => (
                <Reveal key={project} delay={(project - 1) * 0.15} direction="up">
                  <div className="group relative overflow-hidden rounded-3xl bg-black aspect-video hover:shadow-2xl transition-shadow duration-500">
                    <BlurImage
                      src={`https://picsum.photos/seed/project${project}/1200/800`}
                      alt="Project"
                      className="opacity-60 group-hover:scale-110 transition-transform duration-700"
                      containerClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                      <span className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">
                         {lang === 'ar' ? 'تطوير ويب' : 'Web Development'}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                         {lang === 'ar' ? 'منصة لوجستية ذكية' : 'Smart Logistics Platform'}
                      </h3>
                      <Link
                        href={`/portfolio/${project}`}
                        className="inline-flex items-center bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 group/btn w-fit"
                      >
                         {lang === 'ar' ? 'عرض دراسة الحالة' : 'View Case Study'}
                         <ExternalLink size={18} className={cn(
                           "transition-transform duration-300",
                           lang === 'ar' ? "mr-2" : "ml-2 group-hover/btn:translate-x-1"
                         )} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* Trust Section / Tech Stack */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <Reveal>
             <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-12">
               {lang === 'ar' ? 'نستخدم أفضل التقنيات العالمية' : 'Powered by Industry Leading Tech'}
             </p>
           </Reveal>
           <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['Vercel', 'Next.js', 'React', 'Node.js', 'AWS', 'Firebase', 'Flutter', 'Tailwind'].map((tech, idx) => (
                <Reveal key={tech} delay={idx * 0.05} direction="up">
                  <span className="text-2xl md:text-3xl font-display font-bold hover:text-brand-accent transition-colors duration-300 cursor-default">{tech}</span>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={28} className="text-brand-accent" />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-xl text-neutral-500">
                {lang === 'ar' ? 'إجابات سريعة عن أكثر الأسئلة شيوعاً' : 'Quick answers to the most common questions'}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <FaqAccordion items={
              lang === 'ar' ? [
                { question: 'كم يستغرق تطوير موقع إلكتروني؟', answer: 'تختلف المدة حسب تعقيد المشروع، لكن في المتوسط نتراوح بين 4-12 أسبوعاً. نوفر جدولاً زمنياً مفصلاً قبل بدء العمل.' },
                { question: 'هل تقدمون دعماً بعد الإطلاق؟', answer: 'نعم، نقدم حزم دعم وصيانة شهرية تشمل التحديثات، المراقبة، والدعم الفني.' },
                { question: 'ما هي تكلفة المشروع؟', answer: 'التكلفة تعتمد على نطاق المشروع ومتطلباته. نقدم عرض سعر مجاني بعد جلسة استشارية لفهم احتياجاتك.' },
                { question: 'هل يمكنني الحصول على استشارة مجانية؟', answer: 'بالتأكيد! نقدم استشارة مجانية لمناقشة فكرتك وتقديم التوصيات الأولية.' },
              ] : [
                { question: 'How long does web development take?', answer: 'It depends on project complexity, but typically ranges from 4-12 weeks. We provide a detailed timeline before starting.' },
                { question: 'Do you offer post-launch support?', answer: 'Yes, we offer monthly maintenance packages including updates, monitoring, and technical support.' },
                { question: 'How much does a project cost?', answer: 'Cost depends on scope and requirements. We provide a free quote after a consultation to understand your needs.' },
                { question: 'Can I get a free consultation?', answer: 'Absolutely! We offer a free consultation to discuss your idea and provide initial recommendations.' },
              ]
            } />
          </Reveal>
        </div>
      </section>

      {/* Team CTA */}
      <Reveal>
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-accent to-purple-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
             <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-display font-bold mb-8">
                  {t('cta.title')}
                </h2>
                <p className="text-xl md:text-2xl italic mb-12 opacity-90">
                  {t('cta.subtitle')}
                </p>
                <Link
                  href="/start-project"
                  className="relative inline-block bg-white text-brand-accent px-12 py-5 rounded-full text-xl font-bold hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 overflow-hidden group/btn"
                >
                  <span className="relative z-10">{t('cta.button')}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </Link>
             </div>
             <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
             <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl" />
          </div>
        </section>
      </Reveal>
    </Layout>
  );
}
