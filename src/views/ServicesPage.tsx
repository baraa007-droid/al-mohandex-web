'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, ExternalLink, Layout as LayoutIcon, Smartphone, Brain, Megaphone, Palette, ShoppingCart, ArrowRight, Home, School, Utensils, Building2, Globe } from 'lucide-react';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';
import { cn } from '@/lib/utils';

const industryProjects = {
  'real-estate': {
    ar: 'عقارات', en: 'Real Estate',
    icon: <Home size={32} />,
    projects: [
      { id: 1, titleAr: 'منصة عقارات ذكية', titleEn: 'Smart Real Estate Platform', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', descAr: 'منصة شاملة لإدارة وعرض العقارات مع جولات افتراضية 360 ونظام بحث متقدم.', descEn: 'Comprehensive real estate platform with 360 virtual tours and advanced search.', tech: 'Next.js, Node.js, Elastic Search' },
      { id: 5, titleAr: 'تطبيق إدارة عقارات', titleEn: 'Real Estate Management App', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', descAr: 'تطبيق جوال لإدارة المحفظة العقارية بالكامل من إيجارات وصيانة وعقود.', descEn: 'Mobile app for full property portfolio management - rentals, maintenance, contracts.', tech: 'React Native, Firebase' },
    ]
  },
  'education': {
    ar: 'تعليم', en: 'Education',
    icon: <School size={32} />,
    projects: [
      { id: 3, titleAr: 'بوابة تعليم إلكتروني', titleEn: 'E-Learning Portal', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', descAr: 'منصة تعليمية متكاملة مع بث مباشر واختبارات تفاعلية وإدارة محتوى.', descEn: 'Complete e-learning platform with live streaming, interactive tests, and CMS.', tech: 'Vue.js, Laravel, WebSockets' },
      { id: 10, titleAr: 'تطبيق تعليم تفاعلي', titleEn: 'Interactive Learning App', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', descAr: 'تطبيق تعليمي للأطفال يدمج بين الترفيه والتعليم بأسلوب تفاعلي.', descEn: 'Educational kids app blending entertainment with interactive learning.', tech: 'Flutter, Firebase, AI' },
    ]
  },
  'restaurants': {
    ar: 'مطاعم', en: 'Restaurants',
    icon: <Utensils size={32} />,
    projects: [
      { id: 4, titleAr: 'تطبيق توصيل طلبات', titleEn: 'Food Delivery App', img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80', descAr: 'تطبيق متكامل لطلب وتوصيل الطعام مع تتبع مباشر وتقييمات فورية.', descEn: 'Complete food delivery app with real-time tracking and instant ratings.', tech: 'Flutter, Node.js, Socket.io' },
      { id: 8, titleAr: 'هوية مقهى ومطعم', titleEn: 'Café & Restaurant Branding', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80', descAr: 'هوية بصرية كاملة تشمل الشعار، القائمة، التغليف، وديكور المحل.', descEn: 'Complete visual identity including logo, menu, packaging, and interior design.', tech: 'Branding, Packaging, Interior Design' },
    ]
  },
  'corporate': {
    ar: 'شركات', en: 'Corporate',
    icon: <Building2 size={32} />,
    projects: [
      { id: 7, titleAr: 'هوية شركة تقنية', titleEn: 'Tech Startup Identity', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', descAr: 'هوية بصرية كاملة لشركة ناشئة في الذكاء الاصطناعي.', descEn: 'Complete visual identity for an AI startup.', tech: 'Branding, Guidelines, Web' },
      { id: 11, titleAr: 'نظام ERP محاسبي', titleEn: 'ERP Accounting System', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', descAr: 'نظام متكامل لإدارة الحسابات والمخزون والمبيعات للشركات.', descEn: 'Integrated system for accounting, inventory, and sales management.', tech: 'React, Node.js, PostgreSQL' },
    ]
  },
  'ecommerce': {
    ar: 'تجارة إلكترونية', en: 'E-Commerce',
    icon: <ShoppingCart size={32} />,
    projects: [
      { id: 2, titleAr: 'متجر إلكتروني متكامل', titleEn: 'Full E-Commerce Platform', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', descAr: 'منتج متكامل يدعم آلاف المنتجات مع بوابات دفع متعددة.', descEn: 'Full platform supporting thousands of products with multiple payment gateways.', tech: 'Next.js, Shopify, Stripe' },
      { id: 9, titleAr: 'هوية متجر أزياء', titleEn: 'Fashion Brand Identity', img: 'https://images.unsplash.com/photo-1432889821006-3149402abc77?w=800&q=80', descAr: 'إطلاق علامة تجارية كاملة لمتجر أزياء مع تصميم الألبوم.', descEn: 'Full brand launch for a fashion store with lookbook design.', tech: 'Branding, Social Media, Web' },
    ]
  },
  'travel': {
    ar: 'سياحة', en: 'Travel & Tourism',
    icon: <Globe size={32} />,
    projects: [
      { id: 12, titleAr: 'منصة حجوزات سياحية', titleEn: 'Travel Booking Platform', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', descAr: 'منصة متكاملة لحجز الفنادق والرحلات والجولات السياحية.', descEn: 'Complete platform for booking hotels, flights, and tours.', tech: 'Next.js, Node.js, Payment API' },
      { id: 13, titleAr: 'تطبيق دليل سياحي', titleEn: 'Tourist Guide App', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', descAr: 'تطبيق جوال يقدم أدلة سياحية ذكية مع خرائط تفاعلية وتوصيات.', descEn: 'Mobile app with smart tourist guides, interactive maps, and recommendations.', tech: 'Flutter, Google Maps API, AI' },
    ]
  },
};

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const allServices = [
    { icon: <LayoutIcon size={40} />, title: t('services.web'), desc: t('services.webDesc'), link: '/services/web', cat: 'dev' },
    { icon: <Smartphone size={40} />, title: t('services.mobile'), desc: t('services.mobileDesc'), link: '/services/mobile', cat: 'dev' },
    { icon: <Brain size={40} />, title: t('services.systems'), desc: t('services.systemsDesc'), link: '/services/systems', cat: 'dev' },
    { icon: <Palette size={40} />, title: t('services.design'), desc: t('services.designDesc'), link: '/services/ui-ux', cat: 'design' },
    { icon: <ShoppingCart size={40} />, title: t('services.ecommerce'), desc: t('services.ecommerceDesc'), link: '/services/ecommerce', cat: 'biz' },
    { icon: <Megaphone size={40} />, title: t('services.marketing'), desc: t('services.marketingDesc'), link: '/services/marketing', cat: 'biz' },
  ];

  const filterCats = [
    { key: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { key: 'dev', label: lang === 'ar' ? 'تطوير' : 'Development' },
    { key: 'design', label: lang === 'ar' ? 'تصميم' : 'Design' },
    { key: 'biz', label: lang === 'ar' ? 'أعمال' : 'Business' },
  ];

  const services = serviceFilter === 'all' ? allServices : allServices.filter(s => s.cat === serviceFilter);

  const industries = [
    { key: 'real-estate', icon: <Home size={24} />, name: lang === 'ar' ? 'عقارات' : 'Real Estate' },
    { key: 'education', icon: <School size={24} />, name: lang === 'ar' ? 'تعليم' : 'Education' },
    { key: 'restaurants', icon: <Utensils size={24} />, name: lang === 'ar' ? 'مطاعم' : 'Restaurants' },
    { key: 'corporate', icon: <Building2 size={24} />, name: lang === 'ar' ? 'شركات' : 'Corporate' },
    { key: 'ecommerce', icon: <ShoppingCart size={24} />, name: lang === 'ar' ? 'تجارة إلكترونية' : 'E-Commerce' },
    { key: 'travel', icon: <Globe size={24} />, name: lang === 'ar' ? 'سياحة' : 'Travel & Tourism' },
  ];

  const current = selectedIndustry ? industryProjects[selectedIndustry as keyof typeof industryProjects] : null;

  return (
    <Layout>
      <Seo title={lang === 'ar' ? 'خدماتنا' : 'Our Services'} description={lang === 'ar' ? 'خدماتنا الرقمية المتكاملة - تطوير مواقع، تطبيقات جوال، تصميم، تسويق، وأنظمة أعمال' : 'Our comprehensive digital services - web dev, mobile apps, design, marketing, and business systems'} path="/services" />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-8xl font-display font-bold mb-8">
              {lang === 'ar' ? 'خدماتنا الرقمية' : 'Our Digital Services'}
            </h1>
            <p className="text-xl text-neutral-500 max-w-3xl mx-auto">
              {lang === 'ar' 
                ? 'نقدم مجموعة متكاملة من الخدمات التقنية التي تساعدك على التحول الرقمي الكامل والنمو السريع.'
                : 'We offer a comprehensive set of tech services that help you achieve full digital transformation and rapid growth.'}
            </p>
          </motion.div>

           {/* Service Filter */}
           <div className="flex flex-wrap justify-center gap-3 mb-12">
             {filterCats.map((cat) => (
               <button
                 key={cat.key}
                 onClick={() => setServiceFilter(cat.key)}
                 className={cn(
                   'px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 border',
                   serviceFilter === cat.key
                     ? 'bg-brand-accent text-white border-brand-accent shadow-lg'
                     : 'bg-white dark:bg-neutral-900 text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-brand-accent hover:text-brand-accent'
                 )}
               >
                 {cat.label}
               </button>
             ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
             {services.map((service, idx) => (
               <Reveal key={idx} delay={idx * 0.08} direction="up">
                 <Link href={service.link}>
                   <div className="group p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                     <div className="text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-300 origin-left">
                       {service.icon}
                     </div>
                     <h3 className="text-3xl font-bold mb-6 group-hover:text-brand-accent transition-colors">{service.title}</h3>
                     <p className="text-neutral-500 text-lg leading-relaxed mb-6">{service.desc}</p>
                     <div className="flex items-center text-brand-accent font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                       <span>{lang === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
                       <ArrowRight size={16} className={cn(lang === 'ar' ? "rotate-180 mr-2" : "ml-2 group-hover:translate-x-1", "transition-transform")} />
                     </div>
                   </div>
                 </Link>
               </Reveal>
             ))}
           </div>

          {/* Industry Specialization */}
          <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 italic">
                {lang === 'ar' ? 'نتخصص في مجالك.' : 'Specialized in your field.'}
              </h2>
              <p className="text-xl text-neutral-400 mb-16 max-w-2xl">
                {lang === 'ar' 
                   ? 'اضغط على أي قطاع لترى مشاريعنا فيه.'
                   : 'Click any sector to see our projects in it.'}
              </p>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {industries.map((ind, idx) => (
                    <Reveal key={ind.key} delay={idx * 0.08} direction="up">
                      <button
                        onClick={() => setSelectedIndustry(ind.key)}
                        className="flex flex-col items-center p-8 bg-neutral-900 rounded-2xl hover:bg-brand-accent hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer group border border-transparent hover:border-white/20 w-full"
                      >
                        <div className="mb-4 text-neutral-400 group-hover:text-white transition-colors group-hover:scale-110 transition-transform">{ind.icon}</div>
                        <span className="text-lg font-bold">{ind.name}</span>
                        <span className="text-xs text-neutral-500 group-hover:text-white/60 mt-2 transition-colors">
                          {lang === 'ar' ? 'مشروعين' : '2 Projects'}
                        </span>
                      </button>
                    </Reveal>
                  ))}
               </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/20 blur-[150px] rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Industry Projects Modal */}
      <AnimatePresence>
        {selectedIndustry && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              onClick={e => e.stopPropagation()}
              className="bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-brand-accent">{current.icon}</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold">
                      {lang === 'ar' ? current.ar : current.en}
                    </h2>
                  </div>
                  <p className="text-neutral-500">
                    {lang === 'ar' ? `مشاريعنا في قطاع ${current.ar}` : `Our projects in ${current.en}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {current.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-neutral-800"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.img}
                        alt={lang === 'ar' ? project.titleAr : project.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3">
                        {lang === 'ar' ? project.titleAr : project.titleEn}
                      </h3>
                      <p className="text-neutral-500 mb-4 leading-relaxed">
                        {lang === 'ar' ? project.descAr : project.descEn}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="text-xs text-brand-accent font-bold bg-brand-accent/10 px-4 py-2 rounded-full">
                          {project.tech}
                        </span>
                        <Link
                          href={`/portfolio/${project.id}`}
                          className="inline-flex items-center text-sm font-bold hover:text-brand-accent transition-colors"
                        >
                          {lang === 'ar' ? 'التفاصيل' : 'Details'}
                          <ExternalLink size={14} className={lang === 'ar' ? "mr-1" : "ml-1"} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
