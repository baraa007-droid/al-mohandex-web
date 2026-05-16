'use client';

import { useEffect } from 'react';

interface Props {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://almohandex.com'
const SITE_SUFFIX = ' | المهندكس Al-Mohandex';

export default function Seo({ title, description, path = '', image }: Props) {
  const fullTitle = `${title}${SITE_SUFFIX}`;
  const url = `${BASE_URL}${path}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    const setMeta = (selector: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const attr = selector.includes('[name') ? 'name' : 'property';
        const key = selector.match(/["']([^"']+)["']/)?.[1] ?? '';
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      (el as HTMLMetaElement).content = value;
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);

    if (image) {
      setMeta('meta[property="og:image"]', image);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [fullTitle, description, url, image]);

  return null;
}
