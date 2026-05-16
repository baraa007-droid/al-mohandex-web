'use client'

import type { LayoutProps } from '@/interfaces'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import FloatingOrbs from '@/components/effects/FloatingOrbs'
import AnimatedBackground from '@/components/effects/AnimatedBackground'
import ReadingProgress from '@/components/effects/ReadingProgress'
import CustomCursor from '@/components/effects/CustomCursor'
import BackToTop from '@/components/effects/BackToTop'
import GdprBanner from '@/components/effects/GdprBanner'
import ChatWidget from '@/components/chat/ChatWidget'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      <ReadingProgress />
      <FloatingOrbs />
      <AnimatedBackground />
      <CustomCursor />
      <ChatWidget />
      <BackToTop />
      <GdprBanner />
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
