'use client'

import { useState, useEffect, memo } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

function BackToTopInner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-24 right-6 z-50 p-3.5 rounded-2xl shadow-xl',
            'bg-black dark:bg-white text-white dark:text-black',
            'hover:scale-110 active:scale-95 transition-all duration-200',
            'backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent'
          )}
          aria-label="Back to top"
        >
          <ArrowUp size={22} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default memo(BackToTopInner)
