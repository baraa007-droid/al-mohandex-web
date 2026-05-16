'use client'

import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ArrowLeft, Globe, CheckCircle2, Clock, User2, FolderX } from 'lucide-react'
import { Github } from '@/lib/social-icons'
import Reveal from '@/components/effects/Reveal'
import Seo from '@/components/effects/Seo'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

export default function CaseStudyPage({ id }: { id: string }) {
  const { i18n } = useTranslation()

  const lang = i18n.language as 'ar' | 'en'
  const project = projects.find((p: Project) => p.id === Number(id))

  if (!project) {
    return (
      <Layout>
        <Seo title={lang === 'ar' ? 'مشروع غير موجود' : 'Project Not Found'} description="" path={`/portfolio/${id}`} />
        <section className="pt-32 pb-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-4">
            <Reveal>
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-brand-accent mb-12 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">
                <ArrowLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} aria-hidden="true" />
                {lang === 'ar' ? 'العودة للأعمال' : 'Back to Portfolio'}
              </Link>
            </Reveal>
            <div className="text-center py-20">
              <FolderX size={64} className="mx-auto mb-6 text-neutral-300 dark:text-neutral-700" aria-hidden="true" />
              <h1 className="text-3xl font-bold mb-4">{lang === 'ar' ? 'المشروع غير موجود' : 'Project Not Found'}</h1>
              <p className="text-neutral-500 mb-8">{lang === 'ar' ? 'لم يتم العثور على هذا المشروع' : 'The requested project could not be found'}</p>
              <Link href="/portfolio" className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent">
                {lang === 'ar' ? 'عرض جميع الأعمال' : 'View All Projects'}
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo
        title={lang === 'ar' ? project.titleAr : project.titleEn}
        description={lang === 'ar' ? project.descAr : project.descEn}
        path={`/portfolio/${id}`}
      />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">

          <Reveal>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-brand-accent mb-12 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">
              <ArrowLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} aria-hidden="true" />
              {lang === 'ar' ? 'العودة للأعمال' : 'Back to Portfolio'}
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <Reveal direction="left">
              <div>
                <span className="text-brand-accent font-bold uppercase tracking-widest mb-4 block text-sm">
                  {lang === 'ar' ? project.subtitleAr : project.subtitleEn}
                </span>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter">
                  {lang === 'ar' ? project.titleAr : project.titleEn}
                </h1>
                <p className="text-lg text-neutral-500 mb-10 leading-relaxed">
                  {lang === 'ar' ? project.descAr : project.descEn}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-brand-accent">
                      <User2 size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'العميل' : 'Client'}</p>
                      <p className="font-bold">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-brand-accent">
                      <Clock size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">{lang === 'ar' ? 'المدة' : 'Duration'}</p>
                      <p className="font-bold">{project.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      aria-label={lang === 'ar' ? 'عرض المشروع مباشرة' : 'View live demo'}>
                      <Globe size={16} aria-hidden="true" /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-xl font-bold hover:border-brand-accent hover:text-brand-accent transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      aria-label={lang === 'ar' ? 'عرض الكود على جيتهب' : 'View source on GitHub'}>
                      <Github size={16} aria-hidden="true" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800">
                <img src={project.img} alt={lang === 'ar' ? project.titleAr : project.titleEn}
                  className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mb-10 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-2xl font-bold mb-6">{lang === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-4 py-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-bold hover:border-brand-accent hover:text-brand-accent transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-10 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-2xl font-bold mb-6">{lang === 'ar' ? 'أبرز المميزات' : 'Key Features'}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(lang === 'ar' ? project.featuresAr : project.featuresEn).map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-white dark:bg-black p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <CheckCircle2 size={18} className="text-brand-accent flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: lang === 'ar' ? 'التحدي' : 'The Challenge', desc: lang === 'ar' ? project.challengeAr : project.challengeEn, color: 'text-red-500' },
              { num: '02', title: lang === 'ar' ? 'الحل' : 'The Solution', desc: lang === 'ar' ? project.solutionAr : project.solutionEn, color: 'text-brand-accent' },
              { num: '03', title: lang === 'ar' ? 'النتيجة' : 'The Result', desc: lang === 'ar' ? project.resultAr : project.resultEn, color: 'text-green-500' },
            ].map((box, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up">
                <div className="p-8 bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <span className={`text-5xl font-black ${box.color} opacity-20 block mb-4`}>{box.num}</span>
                  <h3 className="text-xl font-bold mb-4">{box.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{box.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </Layout>
  )
}
