import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import ScrollToTopWrapper from './scroll-to-top-wrapper';

export const metadata: Metadata = {
  title: {
    default: 'Al-Mohandex | المهندكس',
    template: '%s | المهندكس Al-Mohandex',
  },
  description: 'Al-Mohandex – Engineering & Technology company delivering modern digital solutions.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Al-Mohandex | المهندكس',
    description: 'Al-Mohandex – Engineering & Technology company delivering modern digital solutions.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Al-Mohandex',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al-Mohandex | المهندكس',
    description: 'Al-Mohandex – Engineering & Technology company delivering modern digital solutions.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ScrollToTopWrapper />
          <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
