'use client'

import { memo } from 'react'
import { motion } from 'motion/react'
import type { RevealProps } from '@/interfaces'

const directionVariants = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
}

function RevealInner({ children, className, delay = 0, duration = 0.6, direction = 'up', once = true }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionVariants[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default memo(RevealInner)
