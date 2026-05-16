import type { ReactNode } from 'react'
import type { Lang } from '../types/common'

export interface LayoutProps {
  children: ReactNode
}

export interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

export interface BlurImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
}

export interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqAccordionProps {
  items: FaqItem[]
}

export interface ChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
  lang: Lang
}

export interface ChatMessageProps {
  message: import('../types/chat').ChatMessage
}

export interface GlowCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'a'
  href?: string
  onClick?: () => void
}

export interface ParallaxTiltProps {
  children: ReactNode
  className?: string
  intensity?: number
}
