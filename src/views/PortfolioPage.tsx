'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ExternalLink, Globe } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import Seo from '@/components/effects/Seo'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

export default function PortfolioPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ar' | 'en'
  const [filter, setFilter] = useState('all')

  const categories = [
    { id: 'all', name: t('projects.all') },
    { id: 'web', name: t('projects.web') },
    { id: 'mobile', name: t('projects.mobile') },
    { id: 'branding', name: t('projects.branding') },
  ]

  const filtered = filter === 'all' ? projects : projects.filter((p: Project) => p.category === filter)

  return (
    <Layout>
      <Seo
        title={lang === 'ar' ? 'أعمالنا' : 'Portfolio'}
        description={lang === 'ar' ? 'تصفح أحدث مشاريعنا' : 'Browse our latest projects'}
        path="/portfolio"
      />
      <section className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter">
                  {t('projects.title')}
                </h1>
                <p className="text-xl text-neutral-500">{t('projects.subtitle')}</p>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100/80 dark:bg-neutral-900/80 glass p-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm" role="group" aria-label="Filter projects">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    aria-pressed={filter === cat.id}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent ${filter === cat.id ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-500'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.img}
                      alt={lang === 'ar' ? project.titleAr : project.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-brand-accent text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full">
                      {lang === 'ar' ? project.subtitleAr : project.subtitleEn}
                    </span>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white border border-white/30 p-2 rounded-full hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={`Live demo of ${lang === 'ar' ? project.titleAr : project.titleEn}`}
                      >
                        <Globe size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {lang === 'ar' ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                      {lang === 'ar' ? project.descAr : project.descEn}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1 mb-5">
                      {(lang === 'ar' ? project.featuresAr : project.featuresEn).slice(0, 3).map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-neutral-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="flex-1 text-center text-sm font-bold bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-xl hover:opacity-80 transition-all inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      >
                        {t('projects.details')}
                        <ExternalLink size={13} aria-hidden="true" />
                      </Link>
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center text-sm font-bold border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        >
                          <Globe size={13} aria-hidden="true" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
