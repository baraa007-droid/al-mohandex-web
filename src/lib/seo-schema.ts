import type { Database } from '@/lib/database.types'

type ProjectRow = Database['public']['Tables']['projects']['Row']

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Al-Mohandex',
    alternateName: 'المهندكس',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+962-XXX-XXX-XXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://linkedin.com/company/al-mohandex',
      'https://twitter.com/almohandex',
    ],
  }
}

export function generateServiceSchema(service: { name: string; description: string; category: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    category: service.category,
    provider: {
      '@type': 'Organization',
      name: 'Al-Mohandex',
    },
  }
}

export function generateProjectSchema(project: ProjectRow) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image_url,
    dateCreated: project.created_at,
    keywords: project.technologies?.join(', '),
    author: {
      '@type': 'Organization',
      name: 'Al-Mohandex',
    },
  }
}

export function generateArticleSchema(article: { title: string; excerpt: string; coverImage?: string; datePublished: string; dateModified: string; author: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Al-Mohandex',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  }
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
