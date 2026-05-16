'use client'

import { useRef, type MouseEvent, type KeyboardEvent, memo } from 'react'
import { motion } from 'motion/react'
import type { GlowCardProps } from '@/interfaces'

function GlowCardInner({ children, className = '', as = 'div', href, onClick }: GlowCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLAnchorElement>(null)

  const getCard = () => as === 'a' ? aRef.current : divRef.current

  const handleMouseMove = (e: MouseEvent) => {
    const card = getCard()
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const glowClass = `relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,112,243,0.06),transparent_40%)] ${className}`

  if (as === 'a') {
    return (
      <motion.a
        href={href}
        ref={aRef}
        onMouseMove={handleMouseMove}
        className={glowClass}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={glowClass}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  )
}

export default memo(GlowCardInner)
