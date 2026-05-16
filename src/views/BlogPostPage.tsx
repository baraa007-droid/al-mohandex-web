'use client';

import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';
import { blogPosts } from './BlogPage';

export default function BlogPostPage({ id }: { id: string }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <Layout>
        <section className="pt-32 pb-24 text-center">
          <h1 className="text-4xl font-bold">{t('errors.postNotFound')}</h1>
          <Link href="/blog" className="text-brand-accent mt-8 inline-block">{t('errors.backToBlog')}</Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title={lang === 'ar' ? post.titleAr : post.titleEn} description={lang === 'ar' ? `اقرأ أحدث المقالات في عالم التقنية` : `Read the latest articles in tech`} path={`/blog/${id}`} />
      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-brand-accent mb-12"
          >
            <ArrowLeft size={16} className={lang === 'ar' ? "rotate-180 ml-2" : "mr-2"} />
            {lang === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>

          <Reveal>
            <article>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mb-6">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">
                {lang === 'ar' ? post.titleAr : post.titleEn}
              </h1>
              <div className="aspect-video rounded-[2rem] overflow-hidden mb-12 bg-neutral-100 dark:bg-neutral-800 shadow-xl">
                <img
                  src={`https://picsum.photos/seed/blog${post.id}/1200/675`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4">
                {(lang === 'ar' ? post.contentAr : post.contentEn).split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
