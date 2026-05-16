'use client'

import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie, X } from 'lucide-react'
import Link from 'next/link'

function GdprBannerInner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('muhandex-cookies')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('muhandex-cookies', 'accepted')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="max-w-5xl mx-auto glass-strong rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50">
            <div className="hidden sm:flex w-10 h-10 bg-brand-accent/10 rounded-xl items-center justify-center flex-shrink-0">
              <Cookie size={20} className="text-brand-accent" aria-hidden="true" />
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-1 text-center sm:text-left">
              We use cookies to enhance your experience. By continuing, you agree to our{' '}
              <Link href="/privacy" className="text-brand-accent font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded">Privacy Policy</Link>.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={accept}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label="Accept cookies"
              >
                Accept
              </button>
              <button
                onClick={accept}
                className="p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label="Dismiss cookie banner"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default memo(GdprBannerInner)
