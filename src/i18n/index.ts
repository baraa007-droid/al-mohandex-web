import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        portfolio: 'Portfolio',
        about: 'About Us',
        blog: 'Blog',
        pricing: 'Pricing',
        contact: 'Contact',
        startProject: 'Start Your Project'
      },
      hero: {
        title: 'We Build Future-Ready Digital Solutions',
        subtitle: 'Almohandex for Software & AI Solutions — نحول الأفكار إلى حلول رقمية وذكية.',
        cta: 'Get Started',
        secondaryCta: 'View Projects'
      },
      stats: {
        projects: 'Projects Delivered',
        clients: 'Happy Clients',
        experts: 'Team Experts',
        years: 'Years Experience'
      },
      services: {
        title: 'Our Strategic Services',
        subtitle: 'We don\'t just build software, we build tools for your business growth.',
        viewAll: 'View All Services',
        web: 'Web Development',
        mobile: 'Mobile Apps',
        design: 'UI/UX Design',
        systems: 'Business Systems',
        ecommerce: 'E-Commerce',
        marketing: 'Digital Marketing',
        branding: 'Branding',
        webDesc: 'Fast, responsive websites built with cutting-edge tech.',
        mobileDesc: 'Native performance and smooth UX for iOS and Android.',
        designDesc: 'User-centric interfaces designed for conversion.',
        systemsDesc: 'Custom solutions for operations and sales management.',
        ecommerceDesc: 'Full online stores with secure payments.',
        marketingDesc: 'SEO, ads, and social media management.',
        brandingDesc: 'Visual identities that leave a mark.'
      },
      projects: {
        title: 'Selected Works',
        subtitle: 'A glimpse into the digital solutions we built for our clients.',
        all: 'All',
        web: 'Web',
        mobile: 'Mobile',
        branding: 'Branding',
        details: 'Details'
      },
      testimonials: {
        title: 'What Our Clients Say',
        subtitle: 'Trusted by businesses across the region.',
        items: [
          { name: 'Ahmed Al-Qahtani', role: 'CEO, SaudiTech', text: 'Al-Mohandex transformed our business. The platform they built increased our sales by 40%.' },
          { name: 'Laila Al-Rashid', role: 'Founder, CreativeLab', text: 'Professional team with exceptional UI/UX skills. They truly understand the user.' },
          { name: 'Khaled Al-Otaibi', role: 'CTO, FutureGate', text: 'The best decision we made was choosing Al-Mohandex for our digital transformation.' }
        ]
      },
      process: {
        title: 'How We Work',
        subtitle: 'A proven methodology that delivers results.',
        step1: 'Discovery',
        step1Desc: 'We analyze your business, goals, and competitors.',
        step2: 'Design',
        step2Desc: 'Crafting wireframes and prototypes for your approval.',
        step3: 'Develop',
        step3Desc: 'Agile development with weekly progress updates.',
        step4: 'Launch',
        step4Desc: 'Deployment, testing, and ongoing optimization.'
      },
      cta: {
        title: 'Ready to Start Your Project?',
        subtitle: 'We have the multi-disciplinary team to bring your idea to life.',
        button: 'Talk to Our Experts'
      },
      footer: {
        description: 'Almohandex for Software & AI Solutions — web, mobile, UI/UX, branding, and intelligent systems.',
        rights: 'All rights reserved.',
        quickLinks: 'Quick Links',
        services: 'Services',
        contact: 'Contact Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },
      contact: {
        title: 'Let\'s Talk Project.',
        subtitle: 'Our team is ready to answer your inquiries and provide a free consultation.',
        email: 'Email Us',
        call: 'Call Us',
        location: 'Location',
        formName: 'Name',
        formEmail: 'Email',
        formSubject: 'Subject',
        formMessage: 'Message',
        formSubmit: 'Send Message',
        formError: 'Failed to send. Please try again.'
      },
      errors: {
        postNotFound: 'Post not found',
        backToBlog: 'Back to Blog',
        serviceNotFound: 'Service not found'
      },
      legal: {
        privacyTitle: 'Privacy Policy',
        privacyLastUpdate: 'Last updated: January 2026',
        privacyIntro: 'At Almohandex for Software & AI Solutions, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.',
        privacyCollect: 'Information We Collect',
        privacyCollectDesc: 'We collect information you provide directly, such as your name, email address, phone number, and project details when you fill out our contact forms. We also collect usage data including pages visited and time spent on our website.',
        privacyUse: 'How We Use Your Information',
        privacyUseDesc: 'We use your information to respond to your inquiries, provide our services, improve our website, send relevant communications (with your consent), and comply with legal obligations.',
        privacyShare: 'Information Sharing',
        privacyShareDesc: 'We do not sell your personal information. We may share it with trusted third-party service providers who assist us in operating our website and business, subject to strict confidentiality agreements.',
        privacyCookies: 'Cookies',
        privacyCookiesDesc: 'We use cookies to improve your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.',
        privacyRights: 'Your Rights',
        privacyRightsDesc: 'You have the right to access, correct, or delete your personal data. You may also withdraw consent at any time. Contact us at support@almohandex.com for any privacy-related requests.',
        privacyContact: 'Contact Us',
        privacyContactDesc: 'If you have questions about this privacy policy, please reach out to us at support@almohandex.com or call +966 55 123 4567.',
        termsTitle: 'Terms of Service',
        termsLastUpdate: 'Last updated: January 2026',
        termsIntro: 'These Terms of Service govern your use of the Almohandex website and services. By using our services, you agree to these terms.',
        termsAcceptance: 'Acceptance of Terms',
        termsAcceptanceDesc: 'By accessing or using our website and services, you confirm that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.',
        termsServices: 'Services Description',
        termsServicesDesc: 'Almohandex provides software development, UI/UX design, mobile app development, branding, digital marketing, and business systems solutions. The scope and deliverables of each project are defined in a separate agreement.',
        termsObligations: 'Client Obligations',
        termsObligationsDesc: 'Clients agree to provide accurate and complete information, cooperate promptly, and grant necessary access for project execution. Delays caused by the client may affect project timelines.',
        termsIP: 'Intellectual Property',
        termsIPDesc: 'Upon full payment, clients receive full ownership of the final deliverables. Almohandex retains the right to display completed work in its portfolio unless otherwise agreed in writing.',
        termsPayment: 'Payment Terms',
        termsPaymentDesc: 'Payment terms are specified in the project agreement. Late payments may result in project suspension. All fees are non-refundable unless otherwise stated.',
        termsLimitation: 'Limitation of Liability',
        termsLimitationDesc: 'Almohandex shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid by the client for the specific service giving rise to the claim.',
        termsContact: 'Contact Us',
        termsContactDesc: 'For questions about these terms, contact us at support@almohandex.com or call +966 55 123 4567.'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        services: 'خدماتنا',
        portfolio: 'أعمالنا',
        about: 'من نحن',
        blog: 'المدونة',
        pricing: 'الأسعار',
        contact: 'تواصل معنا',
        startProject: 'ابدأ مشروعك'
      },
      hero: {
        title: 'نبني حلول تقنية جاهزة للمستقبل',
        subtitle: 'المهندكس لحلول البرمجيات والذكاء الاصطناعي — فريقنا يحول أفكارك إلى حلول رقمية وذكية.',
        cta: 'ابدأ الآن',
        secondaryCta: 'شاهد أعمالنا'
      },
      stats: {
        projects: 'مشروع تم التسليم',
        clients: 'عميل سعيد',
        experts: 'خبير تقني',
        years: 'سنوات خبرة'
      },
      services: {
        title: 'خدماتنا الاستراتيجية',
        subtitle: 'نحن لا نبني برمجيات فحسب، بل نبني أدوات لنمو أعمالك.',
        viewAll: 'استعرض جميع الخدمات',
        web: 'تطوير المواقع',
        mobile: 'تطبيقات الجوال',
        design: 'تصميم UI/UX',
        systems: 'أنظمة الأعمال',
        ecommerce: 'المتاجر الإلكترونية',
        marketing: 'التسويق الرقمي',
        branding: 'الهوية البصرية',
        webDesc: 'مواقع سريعة، متجاوبة، ومبنية على أحدث التقنيات.',
        mobileDesc: 'تطبيقات Android و iOS بأداء مذهل وتجربة مستخدم سلسة.',
        designDesc: 'تصميم واجهات احترافية تركز على المستخدم والتحويل.',
        systemsDesc: 'حلول مخصصة لإدارة العمليات والمبيعات (ERP, CRM).',
        ecommerceDesc: 'متاجر إلكترونية متكاملة مع أنظمة دفع آمنة.',
        marketingDesc: 'تحسين محركات البحث وإدارة الحملات الإعلانية.',
        brandingDesc: 'هويات بصرية تترك أثراً لا يُنسى.'
      },
      projects: {
        title: 'مشاريع مختارة',
        subtitle: 'لمحة عن أحدث الحلول الرقمية التي قدمناها لعملائنا.',
        all: 'الكل',
        web: 'مواقع',
        mobile: 'تطبيقات',
        branding: 'هوية',
        details: 'التفاصيل'
      },
      testimonials: {
        title: 'ماذا يقول عملاؤنا',
        subtitle: 'موثوق من قبل شركات في جميع أنحاء المنطقة.',
        items: [
          { name: 'أحمد القحطاني', role: 'الرئيس التنفيذي - تك سعودي', text: 'المهندكس غيرت شكل أعمالنا. المنصة التي بنوها زادت مبيعاتنا بنسبة 40٪.' },
          { name: 'ليلى الرشيد', role: 'مؤسسة - كرييتيف لاب', text: 'فريق محترف مع مهارات استثنائية في UI/UX. يفهمون المستخدم حقاً.' },
          { name: 'خالد العتيبي', role: 'المدير التقني - فيوتشر غيت', text: 'أفضل قرار اتخذناه هو اختيار المهندكس لتحولنا الرقمي.' }
        ]
      },
      process: {
        title: 'كيف نعمل',
        subtitle: 'منهجية مثبتة تحقق النتائج.',
        step1: 'الاكتشاف',
        step1Desc: 'نحلل أعمالك وأهدافك والمنافسين.',
        step2: 'التصميم',
        step2Desc: 'نصنع الهيكل والنماذج الأولية لموافقتك.',
        step3: 'التطوير',
        step3Desc: 'تطوير سريع مع تحديثات أسبوعية.',
        step4: 'الإطلاق',
        step4Desc: 'نشر واختبار وتحسين مستمر للأداء.'
      },
      cta: {
        title: 'جاهز لنبدأ مشروعك؟',
        subtitle: 'لدينا الفريق المتكامل لتحويل فكرتك إلى حقيقة.',
        button: 'تحدث مع خبرائنا'
      },
      footer: {
        description: 'المهندكس لحلول البرمجيات والذكاء الاصطناعي — تطوير ويب، تطبيقات جوال، تصميم، هوية بصرية، وأنظمة ذكية.',
        rights: 'جميع الحقوق محفوظة.',
        quickLinks: 'روابط سريعة',
        services: 'الخدمات',
        contact: 'تواصل معنا',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      },
      contact: {
        title: 'لنتحدث عن مشروعك.',
        subtitle: 'فريقنا جاهز للإجابة على استفساراتك وتقديم استشارة مجانية.',
        email: 'البريد الإلكتروني',
        call: 'اتصل بنا',
        location: 'مقرنا',
        formName: 'الاسم',
        formEmail: 'البريد',
        formSubject: 'الموضوع',
        formMessage: 'رسالتك',
        formSubmit: 'إرسال الرسالة',
        formError: 'فشل الإرسال. حاول مرة أخرى.'
      },
      errors: {
        postNotFound: 'المقال غير موجود',
        backToBlog: 'العودة للمدونة',
        serviceNotFound: 'الخدمة غير موجودة'
      },
      legal: {
        privacyTitle: 'سياسة الخصوصية',
        privacyLastUpdate: 'آخر تحديث: يناير 2026',
        privacyIntro: 'في المهندكس لحلول البرمجيات والذكاء الاصطناعي، نأخذ خصوصيتك على محمل الجد. تصف هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.',
        privacyCollect: 'المعلومات التي نجمعها',
        privacyCollectDesc: 'نجمع المعلومات التي تقدمها مباشرة، مثل اسمك وبريدك الإلكتروني ورقم هاتفك وتفاصيل مشروعك عند ملء نماذج الاتصال. كما نجمع بيانات الاستخدام بما في ذلك الصفحات التي تمت زيارتها والوقت المستغرق على موقعنا.',
        privacyUse: 'كيف نستخدم معلوماتك',
        privacyUseDesc: 'نستخدم معلوماتك للرد على استفساراتك، تقديم خدماتنا، تحسين موقعنا، إرسال اتصالات ذات صلة (بموافقتك)، والامتثال للالتزامات القانونية.',
        privacyShare: 'مشاركة المعلومات',
        privacyShareDesc: 'نحن لا نبيع معلوماتك الشخصية. قد نشاركها مع مقدمي خدمات خارجيين موثوقين يساعدوننا في تشغيل موقعنا وأعمالنا، مع الالتزام باتفاقيات السرية الصارمة.',
        privacyCookies: 'ملفات تعريف الارتباط',
        privacyCookiesDesc: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة الموقع. يمكنك التحكم في تفضيلات ملفات تعريف الارتباط من خلال إعدادات المتصفح.',
        privacyRights: 'حقوقك',
        privacyRightsDesc: 'لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. يمكنك أيضاً سحب الموافقة في أي وقت. تواصل معنا على support@almohandex.com لأي استفسارات تتعلق بالخصوصية.',
        privacyContact: 'اتصل بنا',
        privacyContactDesc: 'إذا كان لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على support@almohandex.com أو الاتصال على +966 55 123 4567.',
        termsTitle: 'شروط الخدمة',
        termsLastUpdate: 'آخر تحديث: يناير 2026',
        termsIntro: 'تحكم شروط الخدمة هذه استخدامك لموقع وخدمات المهندكس. باستخدامك لخدماتنا، فإنك توافق على هذه الشروط.',
        termsAcceptance: 'القبول بالشروط',
        termsAcceptanceDesc: 'باستخدامك لموقعنا وخدماتنا، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط. إذا كنت لا توافق، يرجى عدم استخدام خدماتنا.',
        termsServices: 'وصف الخدمات',
        termsServicesDesc: 'تقدم المهندكس تطوير البرمجيات، تصميم UI/UX، تطوير تطبيقات الجوال، الهوية البصرية، التسويق الرقمي، وحلول أنظمة الأعمال. يتم تحديد نطاق كل مشروع ومخرجاته في اتفاقية منفصلة.',
        termsObligations: 'التزامات العميل',
        termsObligationsDesc: 'يوافق العميل على تقديم معلومات دقيقة وكاملة، والتعاون الفوري، ومنح الوصول اللازم لتنفيذ المشروع. التأخيرات الناتجة عن العميل قد تؤثر على الجداول الزمنية للمشروع.',
        termsIP: 'الملكية الفكرية',
        termsIPDesc: 'بعد الدفع الكامل، يحصل العميل على الملكية الكاملة للتسليمات النهائية. تحتفظ المهندكس بحق عرض الأعمال المنجزة في محفظتها ما لم يتم الاتفاق على خلاف ذلك كتابياً.',
        termsPayment: 'شروط الدفع',
        termsPaymentDesc: 'شروط الدفع محددة في اتفاقية المشروع. قد يؤدي التأخير في السداد إلى تعليق المشروع. جميع الرسوم غير قابلة للاسترداد ما لم ينص على خلاف ذلك.',
        termsLimitation: 'حدود المسؤولية',
        termsLimitationDesc: 'المهندكس غير مسؤولة عن الأضرار غير المباشرة أو العرضية أو التبعية. مسؤوليتنا الإجمالية محدودة بالمبلغ المدفوع من قبل العميل للخدمة المحددة.',
        termsContact: 'اتصل بنا',
        termsContactDesc: 'للاستفسار عن هذه الشروط، تواصل معنا على support@almohandex.com أو الاتصال على +966 55 123 4567.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
