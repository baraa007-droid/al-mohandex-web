'use client';

import Layout from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Clock, User, ArrowRight } from 'lucide-react';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';

export const blogPosts = [
  {
    id: '1',
    titleAr: 'أهمية تجربة المستخدم في نجاح المتاجر الإلكترونية',
    titleEn: 'Importance of UX in E-Commerce Success',
    date: 'Oct 12, 2023',
    author: 'Sarah Ahmed',
    contentAr: `تجربة المستخدم (UX) هي العامل الحاسم في نجاح أي متجر إلكتروني. أظهرت الدراسات أن 88٪ من المتسوقين عبر الإنترنت لا يعودون إلى موقع بعد تجربة استخدام سيئة. في هذا المقال، نستعرض أهم مبادئ تجربة المستخدم التي يجب تطبيقها في متجرك الإلكتروني لضمان أعلى معدلات تحويل.

أولاً: سرعة التحميل - كل ثانية تأخير في تحميل الصفحة تكلفك 7٪ من المبيعات. ثانياً: سهولة التنقل - يجب أن يجد المستخدم المنتج الذي يبحث عنه في أقل من 3 نقرات. ثالثاً: عملية الدفع السلسة - 70٪ من عربات التسوق تُهجر بسبب عمليات الدفع المعقدة.

في المهندكس، نركز على تصميم تجارب مستخدم مدروسة تجمع بين الجماليات والوظائف العملية، مما يضمن لعملائنا متاجر إلكترونية تحقق أعلى عائد استثمار.`,
    contentEn: `User Experience (UX) is the critical factor in e-commerce success. Studies show that 88% of online shoppers won't return to a site after a poor experience. In this article, we explore key UX principles you must implement in your online store for maximum conversion rates.

First: Loading speed - every second of delay costs you 7% in sales. Second: Easy navigation - users should find products in 3 clicks or less. Third: Seamless checkout - 70% of carts are abandoned due to complex checkout processes.

At Al-Mohandex, we design thoughtful user experiences that balance aesthetics with practical functionality, ensuring our clients get e-commerce stores that deliver the highest ROI.`,
  },
  {
    id: '2',
    titleAr: 'مستقبل الذكاء الاصطناعي في تطوير الويب',
    titleEn: 'Future of AI in Web Development',
    date: 'Oct 10, 2023',
    author: 'Basel M.',
    contentAr: `الذكاء الاصطناعي ليس مجرد موضة عابرة، بل هو تحول جذري في طريقة بناء وتطوير تطبيقات الويب. من أدوات كتابة الكود مثل GitHub Copilot إلى منصات التصميم الذكية، أصبح بإمكان المطورين إنجاز المهام بشكل أسرع وأكثر كفاءة.

التطبيقات الرئيسية للذكاء الاصطناعي في تطوير الويب تشمل: إنشاء أكواد برمجية ذكية، تحليل سلوك المستخدم لتقديم توصيات مخصصة، تحسين محركات البحث (SEO) بتحليل البيانات، واختبار الجودة الآلي.

في المهندكس، نستخدم الذكاء الاصطناعي لتسريع عملية التطوير وتحسين جودة المنتج النهائي، مع الحفاظ على التحكم البشري والإبداعي في جميع مراحل المشروع.`,
    contentEn: `AI is not just a passing trend—it's a fundamental shift in how we build and develop web applications. From code-writing tools like GitHub Copilot to intelligent design platforms, developers can now accomplish tasks faster and more efficiently.

Key AI applications in web development include: intelligent code generation, user behavior analysis for personalized recommendations, data-driven SEO optimization, and automated quality testing.

At Al-Mohandex, we leverage AI to accelerate development and improve final product quality, while maintaining human creativity and control at every stage.`,
  },
  {
    id: '3',
    titleAr: 'لماذا تختار Flutter لتطبيقك القادم؟',
    titleEn: 'Why Choose Flutter for Your Next App?',
    date: 'Oct 5, 2023',
    author: 'Omar K.',
    contentAr: `Flutter هو إطار تطوير تطبيقات مفتوح المصدر من Google، يسمح ببناء تطبيقات أصلية لنظامي Android و iOS من قاعدة كود واحدة. هذا يعني توفير كبير في الوقت والجهد والتكلفة.

مزايا Flutter: أداء قريب من التطبيقات الأصلية، مكتبة واسعة من الأدوات الجاهزة، دعم ممتاز للغة العربية والاتجاه من اليمين لليسار، ومجتمع مطورين نشط ومتنامي.

في المهندكس، نستخدم Flutter لبناء تطبيقات جوال عالية الجودة لعملائنا، مما يوفر عليهم تكلفة تطوير تطبيقين منفصلين مع ضمان تجربة مستخدم متسقة على كلا النظامين.`,
    contentEn: `Flutter is Google's open-source UI framework for building native applications for Android and iOS from a single codebase. This means significant savings in time, effort, and cost.

Flutter advantages: near-native performance, extensive widget library, excellent RTL/Arabic language support, and a vibrant growing developer community.

At Al-Mohandex, we use Flutter to build high-quality mobile applications for our clients, saving them the cost of developing two separate apps while ensuring a consistent user experience on both platforms.`,
  },
];

export default function BlogPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';

  return (
    <Layout>
      <Seo title={lang === 'ar' ? 'المدونة' : 'Blog'} description={lang === 'ar' ? 'أحدث المقالات في عالم التقنية، البرمجة، والتحول الرقمي' : 'Latest articles on technology, programming, and digital transformation'} path="/blog" />
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
           <Reveal>
             <div className="text-center mb-20">
                <h1 className="text-5xl md:text-8xl font-display font-bold mb-6">
                   {lang === 'ar' ? 'المدونة التقنية' : 'Tech Blog'}
                </h1>
                <p className="text-xl text-neutral-500">
                   {lang === 'ar' ? 'مقالات وأفكار حول أحدث التقنيات وطرق نمو الأعمال الرقمية.' : 'Articles and thoughts on the latest tech and digital business growth.'}
                </p>
             </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
                <Reveal key={post.id} delay={idx * 0.1} direction="up">
                  <Link href={`/blog/${post.id}`}>
                    <div className="group bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full"
                  >
                     <div className="relative overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-800">
                        <img 
                          src={`https://picsum.photos/seed/blog${idx}/800/450`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                     </div>
                     <div className="p-6">
                       <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4 font-bold uppercase tracking-widest">
                         <span className="flex items-center gap-1"><Clock size={14} /> {post.date}</span>
                         <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                       </div>
                       <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">
                          {lang === 'ar' ? post.titleAr : post.titleEn}
                       </h3>
                       <p className="text-neutral-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                         {lang === 'ar' ? `نستكشف في هذا المقال أحدث التوجهات التقنية وأثرها على مستقبل الأعمال الرقمية.` : `In this article, we explore the latest tech trends and their impact on the future of digital business.`}
                       </p>
                       <div className="flex items-center font-bold text-sm text-brand-accent">
                          {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                          <ArrowRight size={16} className={lang === 'ar' ? "rotate-180 mr-2" : "ml-2"} />
                       </div>
                     </div>
                   </div>
                  </Link>
                </Reveal>
              ))}
           </div>
         </div>
       </section>
     </Layout>
   );
 }
