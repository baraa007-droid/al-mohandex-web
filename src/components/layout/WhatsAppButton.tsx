'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

const WHATSAPP_NUMBER = '+966551234567'

export default function WhatsAppButton() {
  const { i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  const message = isAr
    ? 'مرحباً فريق المهندكس، أود الاستفسار عن خدماتكم.'
    : 'Hi Al-Mohandex Team, I would like to inquire about your services.'

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors flex items-center justify-center hover:shadow-green-500/25 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
      aria-label={isAr ? 'تواصل معنا عبر واتساب' : 'Contact us via WhatsApp'}
    >
      <MessageCircle size={32} aria-hidden="true" />
    </motion.a>
  )
}
