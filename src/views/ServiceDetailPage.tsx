'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Reveal from '@/components/effects/Reveal';
import Seo from '@/components/effects/Seo';
import { cn } from '@/lib/utils';

const servicesData = {
  'web': {
    icon: '💻',
    titleKey: { ar: 'تطوير المواقع', en: 'Web Development' },
    descKey: { ar: 'نبني مواقع إلكترونية احترافية وسريعة وآمنة تناسب جميع الأنشطة التجارية. من المواقع التعريفية إلى المنصات المعقدة.', en: 'We build professional, fast, and secure websites for all business activities. From corporate sites to complex platforms.' },
    features: {
      ar: ['تصميم متجاوب 100%', 'سرعة عالية في الأداء', 'لوحة تحكم سهلة الإدارة', 'ربط مع بوابات الدفع', 'تحسين محركات البحث SEO', 'دعم فني مستمر'],
      en: ['100% Responsive Design', 'High Performance', 'Easy CMS Dashboard', 'Payment Gateway Integration', 'SEO Optimization', 'Ongoing Support']
    },
    techs: ['React', 'Next.js', 'Vue.js', 'Laravel', 'WordPress', 'Node.js'],
    projects: [1, 4]
  },
  'mobile': {
    icon: '📱',
    titleKey: { ar: 'تطبيقات الجوال', en: 'Mobile Apps' },
    descKey: { ar: 'نطور تطبيقات جوال عالية الأداء لأنظمة iOS و Android باستخدام أحدث التقنيات.', en: 'We develop high-performance mobile apps for iOS and Android using cutting-edge tech.' },
    features: {
      ar: ['تطبيقات Native', 'واجهة مستخدم سلسة', 'أداء عالي', 'ربط مع APIs', 'إشعارات فورية', 'متجر إلكتروني متكامل'],
      en: ['Native Performance', 'Smooth UI/UX', 'High Performance', 'API Integration', 'Push Notifications', 'Full E-commerce']
    },
    techs: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase'],
    projects: [2, 5]
  },
  'ui-ux': {
    icon: '🎨',
    titleKey: { ar: 'تصميم UI/UX', en: 'UI/UX Design' },
    descKey: { ar: 'نصمم واجهات مستخدم إبداعية تركز على تجربة المستخدم وتحقيق أعلى معدلات التحويل.', en: 'We design creative interfaces focused on user experience and maximum conversion rates.' },
    features: {
      ar: ['تصميم واجهات احترافية', 'تجربة مستخدم سلسة', 'نماذج أولية تفاعلية', 'هوية بصرية متكاملة', 'اختبارات قابلية الاستخدام', 'تصاميم جاهزة للتطوير'],
      en: ['Professional Interface Design', 'Seamless UX', 'Interactive Prototypes', 'Complete Visual Identity', 'Usability Testing', 'Dev-Ready Designs']
    },
    techs: ['Figma', 'Adobe XD', 'Sketch', 'After Effects', 'Principle'],
    projects: [3, 6]
  },
  'branding': {
    icon: '🏷️',
    titleKey: { ar: 'الهوية البصرية', en: 'Branding' },
    descKey: { ar: 'نبني هويات بصرية قوية تعكس شخصية علامتك التجارية وتترك انطباعاً لا يُنسى.', en: 'We build strong visual identities that reflect your brand personality and leave a lasting impression.' },
    features: {
      ar: ['شعار احترافي', 'دليل الهوية البصرية', 'بطاقات وأدوات مكتبية', 'حسابات التواصل الاجتماعي', 'تصاميم تسويقية', 'استراتيجية العلامة'],
      en: ['Professional Logo', 'Brand Guidelines', 'Stationery Design', 'Social Media Assets', 'Marketing Materials', 'Brand Strategy']
    },
    techs: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects'],
    projects: [3, 6]
  },
  'ecommerce': {
    icon: '🛒',
    titleKey: { ar: 'المتاجر الإلكترونية', en: 'E-Commerce' },
    descKey: { ar: 'نطلق متاجر إلكترونية متكاملة مع أنظمة دفع وشحن وإدارة مخزون تنمي أعمالك.', en: 'We launch full e-commerce platforms with payment, shipping, and inventory management systems.' },
    features: {
      ar: ['منتجات غير محدودة', 'بوابات دفع متعددة', 'إدارة المخزون', 'الشحن والتوصيل', 'تقارير ومبيعات', 'تطبيق جوال'],
      en: ['Unlimited Products', 'Multiple Payment Gateways', 'Inventory Management', 'Shipping Integration', 'Sales Reports', 'Mobile App']
    },
    techs: ['Shopify', 'WooCommerce', 'Magento', 'Custom PHP', 'Next.js'],
    projects: [4]
  },
  'marketing': {
    icon: '📢',
    titleKey: { ar: 'التسويق الرقمي', en: 'Digital Marketing' },
    descKey: { ar: 'نساعدك على الوصول لجمهورك المستهدف عبر استراتيجيات تسويق رقمي متكاملة.', en: 'We help you reach your target audience through comprehensive digital marketing strategies.' },
    features: {
      ar: ['تحسين محركات البحث SEO', 'إدارة حملات إعلانية', 'تسويق عبر التواصل', 'تحليل البيانات', 'استراتيجية المحتوى', 'تحسين معدل التحويل'],
      en: ['SEO Optimization', 'Ad Campaign Management', 'Social Media Marketing', 'Data Analytics', 'Content Strategy', 'CRO']
    },
    techs: ['Google Ads', 'Meta Ads', 'SEO Tools', 'Analytics', 'Ahrefs'],
    projects: []
  }
};

export default function ServiceDetailPage({ serviceId }: { serviceId: string }) {
  const { i18n, t } = useTranslation();
  
  const service = servicesData[serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <Layout>
        <Seo title={i18n.language === 'ar' ? 'الخدمة غير موجودة' : 'Service Not Found'} description="" />
        <div className="pt-40 text-center">
          <h1 className="text-4xl font-bold">{t('errors.serviceNotFound')}</h1>
          <Link href="/services" className="text-brand-accent mt-4 inline-block">{t('nav.services')}</Link>
        </div>
      </Layout>
    );
  }

  const lang = i18n.language as 'ar' | 'en';

  return (
    <Layout>
      <Seo title={lang === 'ar' ? service.titleKey.ar : service.titleKey.en} description={lang === 'ar' ? service.descKey.ar : service.descKey.en} path={`/services/${serviceId}`} />
      <section className="pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <Link href="/services" className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-brand-accent mb-12">
              <ArrowLeft size={16} className={lang === 'ar' ? "rotate-180 ml-2" : "mr-2"} />
              {lang === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <Reveal>
              <div>
                <span className="text-6xl mb-6 block">{service.icon}</span>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
                  {service.titleKey[lang]}
                </h1>
                <p className="text-xl text-neutral-500 leading-relaxed mb-8">
                  {service.descKey[lang]}
                </p>
                <Link
                  href="/start-project"
                  className="group relative inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">{lang === 'ar' ? 'اطلب الخدمة الآن' : 'Request This Service'}</span>
                  <ArrowRight size={18} className={cn("relative z-10", lang === 'ar' ? "rotate-180 mr-2" : "ml-2 group-hover:translate-x-1 transition-transform")} />
                </Link>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-[3rem] p-12 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-8">{lang === 'ar' ? 'المميزات' : 'Features'}</h3>
                <div className="space-y-4">
                  {service.features[lang].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <CheckCircle size={22} className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-lg font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Tech Stack */}
          <Reveal>
            <div className="mb-24">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 text-center">
                {lang === 'ar' ? 'التقنيات التي نستخدمها' : 'Technologies We Use'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {service.techs.map((tech, idx) => (
                  <Reveal key={idx} delay={idx * 0.05} direction="up">
                    <span className="inline-block px-8 py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-lg font-bold hover:border-brand-accent hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                      {tech}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Related Projects */}
          {service.projects.length > 0 && (
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-10">
                  {lang === 'ar' ? 'مشاريع ذات صلة' : 'Related Projects'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.projects.map((pid) => (
                    <Link
                      key={pid}
                      href={`/portfolio/${pid}`}
                      className="group aspect-video rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={`https://picsum.photos/seed/servp${pid}/800/450`}
                        alt="Project"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </Layout>
  );
}
