'use client';

import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { Target, Users } from 'lucide-react';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';

export default function AboutPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';

  const team = [
    { name: 'Eng. Basel', role: 'Full Stack Tech Lead', img: 'https://picsum.photos/seed/basel/400/400' },
    { name: 'Sarah Ahmed', role: 'Lead UI/UX Designer', img: 'https://picsum.photos/seed/sarah/400/400' },
    { name: 'Omar Khaled', role: 'Backend Expert', img: 'https://picsum.photos/seed/omar/400/400' },
    { name: 'Noura Hassan', role: 'Marketing & SEO Specialist', img: 'https://picsum.photos/seed/noura/400/400' },
  ];

  const methodology = [
    { title: lang === 'ar' ? 'الاكتشاف والتحليل' : 'Discovery & Analysis', desc: lang === 'ar' ? 'نفهم عملك ونحدد الأهداف التقنية والتجارية.' : 'We understand your business and define tech/business objectives.' },
    { title: lang === 'ar' ? 'التصميم والتخطيط' : 'Design & Planning', desc: lang === 'ar' ? 'نبني تجربة المستخدم والهيكل البرمجي قبل الكود.' : 'We build UX and software architecture before coding.' },
    { title: lang === 'ar' ? 'التطوير السريع' : 'Agile Development', desc: lang === 'ar' ? 'نكتب كود نظيف وقابل للتطوير مع متابعة مستمرة.' : 'Clean, scalable code with continuous progress tracking.' },
    { title: lang === 'ar' ? 'الإطلاق والدعم' : 'Launch & Support', desc: lang === 'ar' ? 'لا ننتهي بالإطلاق، بل نستمر في تطوير أداء مشروعك.' : 'We don\'t stop at launch; we continuously optimize performance.' },
  ];

  return (
    <Layout>
      <Seo title={lang === 'ar' ? 'من نحن' : 'About Us'} description={lang === 'ar' ? 'تعرف على المهندكس - فريقنا وخبراتنا في تطوير البرمجيات والذكاء الاصطناعي' : 'Learn about Al-Mohandex - our team and expertise in software development and AI'} path="/about" />
      <section className="pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <Reveal>
             <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                <div className="lg:w-1/2">
                  <span className="text-brand-accent font-bold uppercase tracking-widest mb-4 block">
                    {lang === 'ar' ? 'من نحن' : 'About Us'}
                  </span>
                  <h1 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter">
                    {lang === 'ar' ? 'المهندكس لحلول البرمجيات والذكاء الاصطناعي.' : 'Almohandex for Software & AI Solutions.'}
                  </h1>
                  <p className="text-xl text-neutral-500 leading-relaxed mb-8">
                     {lang === 'ar' 
                       ? 'تأسست "المهندكس" لسد الفجوة بين التقنيات المعقدة وتجربة المستخدم السلسة. نحن نجمع بين الشغف الهندسي والرؤية التجارية لخلق منتجات رقمية تترك أثراً.'
                       : 'Al-Mohandex was founded to bridge the gap between complex tech and seamless UX. We combine engineering passion with business vision to create digital products that leave a mark.'}
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-3 group">
                      <Users className="text-brand-accent group-hover:scale-110 transition-transform" size={32} />
                      <div>
                        <h3 className="font-bold text-2xl">25+</h3>
                        <p className="text-neutral-500 text-sm">Experts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <Target className="text-brand-accent group-hover:scale-110 transition-transform" size={32} />
                      <div>
                        <h3 className="font-bold text-2xl">100+</h3>
                        <p className="text-neutral-500 text-sm">Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 relative group">
                   <div className="absolute inset-0 bg-brand-accent blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                   <img 
                      src="https://picsum.photos/seed/muhandex-office/1000/1000" 
                      alt="Team" 
                      className="rounded-[3rem] shadow-2xl relative z-10 group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                   />
                </div>
             </div>
           </Reveal>

           <Reveal>
             <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-center">
               {lang === 'ar' ? 'كيف نعمل؟' : 'How We Work?'}
             </h2>
           </Reveal>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
              {methodology.map((step, idx) => (
                <Reveal key={idx} delay={idx * 0.1} direction="up">
                  <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <span className="text-6xl font-display font-black text-brand-accent/10 mb-4 block group-hover:text-brand-accent/20 transition-colors">0{idx + 1}</span>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-neutral-500">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
           </div>

           <Reveal>
             <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-center">
               {lang === 'ar' ? 'فريق النخبة' : 'The Elite Team'}
             </h2>
           </Reveal>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <Reveal key={idx} delay={idx * 0.12} direction="up">
                  <div className="group text-center hover:-translate-y-1 transition-all duration-300">
                    <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-square shadow-xl">
                       <img 
                         src={member.img} 
                         alt={member.name} 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                         referrerPolicy="no-referrer"
                       />
                       <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-brand-accent transition-colors">{member.name}</h3>
                    <p className="text-neutral-500">{member.role}</p>
                  </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>
    </Layout>
  );
}
