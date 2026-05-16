'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ParallaxTilt from '@/components/effects/ParallaxTilt';

const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 500;

const expertiseEn = ['Web Development', 'Mobile Apps', 'UI/UX Design', 'AI Solutions', 'Branding'];
const expertiseAr = ['تطوير المواقع', 'تطبيقات الجوال', 'تصميم UI/UX', 'حلول الذكاء الاصطناعي', 'الهوية البصرية'];

function useTypingEffect(words: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIdx] || '';
    if (!isDeleting) {
      setDisplayed(currentWord.substring(0, displayed.length + 1));
      if (displayed.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
        return;
      }
    } else {
      setDisplayed(currentWord.substring(0, displayed.length - 1));
      if (displayed.length - 1 === 0) {
        setIsDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
        return;
      }
    }
  }, [displayed, isDeleting, wordIdx, words]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return displayed;
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';
  const words = lang === 'ar' ? expertiseAr : expertiseEn;
  const typedText = useTypingEffect(words);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-cyan-500/5 rounded-full blur-[80px] animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-neutral-100/80 dark:bg-neutral-900/80 glass px-5 py-2 rounded-full mb-8 group hover:shadow-lg transition-all duration-300"
          >
            <Star size={14} className="text-yellow-500 fill-yellow-500 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {lang === 'ar' ? 'المهندكس لحلول البرمجيات والذكاء الاصطناعي' : 'Almohandex for Software & AI Solutions'}
            </span>
            <Sparkles size={12} className="text-brand-accent opacity-0 group-hover:opacity-100 transition-all" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter leading-none mb-6"
          >
            {lang === 'ar' ? (
              <>
                تحويل الرؤى إلى <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-shimmer">
                  واقع رقمي
                </span>
              </>
            ) : (
              <>
                Turning Visions into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-shimmer">
                  Digital Reality
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-medium mb-4"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-10 md:h-12 flex items-center justify-center mb-10"
          >
            <span className="text-2xl md:text-3xl font-display font-bold text-brand-accent">
              {typedText}
            </span>
            <span className="w-[3px] h-8 md:h-10 bg-brand-accent ml-1 animate-blink self-center" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <ParallaxTilt intensity={5}>
              <Link
                href="/start-project"
                className="group relative inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-10 py-4.5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{t('hero.cta')}</span>
                <ArrowRight className={cn(
                  "relative z-10 ml-2 group-hover:translate-x-1.5 transition-transform duration-300",
                  lang === 'ar' && "rotate-180 mr-2 ml-0 group-hover:-translate-x-1.5"
                )} />
              </Link>
            </ParallaxTilt>
            <Link
              href="/portfolio"
              className="group inline-flex items-center text-lg font-bold text-neutral-500 dark:text-neutral-400 hover:text-brand-accent transition-all duration-300 px-6 py-4 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {t('hero.secondaryCta')}
              <ChevronRight className={cn(
                "ml-1.5 group-hover:translate-x-1 transition-transform duration-300",
                lang === 'ar' && "rotate-180 mr-1.5 ml-0 group-hover:-translate-x-1"
              )} />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-[-1] opacity-20 dark:opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </section>
  );
}
