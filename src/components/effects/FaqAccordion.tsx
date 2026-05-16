'use client'

import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FaqAccordionProps } from '@/interfaces'

function FaqAccordionInner({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        const panelId = `faq-panel-${idx}`
        return (
          <div
            key={idx}
            className={cn(
              'rounded-2xl border transition-all duration-300',
              isOpen
                ? 'border-brand-accent/30 bg-brand-accent/5 dark:bg-brand-accent/5 shadow-lg'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-md'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left font-bold text-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-t-2xl"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                className={cn(
                  'transition-transform duration-300 flex-shrink-0 ml-4',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-neutral-500 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default memo(FaqAccordionInner)
