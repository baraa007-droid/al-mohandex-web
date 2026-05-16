'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, X, Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'
import type { ChatMessage as ChatMessageType, ChatHistoryItem, ChatApiResponse } from '@/types'
import type { Lang } from '@/types'

const STORAGE_KEY = 'muhandex-chat'

function loadHistory(): ChatMessageType[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as ChatMessageType[]
  } catch {
    // ignore parse errors
  }
  return []
}

function saveHistory(messages: ChatMessageType[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)))
  } catch {
    // ignore storage errors
  }
}

export default function ChatWidget() {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<ChatMessageType[]>([])

  messagesRef.current = messages

  useEffect(() => {
    const saved = loadHistory()
    const welcome: ChatMessageType = {
      id: 'welcome',
      role: 'assistant',
      content:
        lang === 'ar'
          ? 'مرحباً بك في المهندكس! أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم؟'
          : "Welcome to Al-Mohandex! I'm the AI assistant. How can I help you today?",
      timestamp: Date.now(),
    }
    setMessages(saved.length > 0 ? saved : [welcome])
  }, [lang])

  useEffect(() => {
    if (messages.length > 0) saveHistory(messages)
  }, [messages])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = useCallback(
    async (text: string): Promise<void> => {
      const userMsg: ChatMessageType = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, userMsg])
      setLoading(true)

      try {
        const history: ChatHistoryItem[] = messagesRef.current.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
        })

        const data: ChatApiResponse = await res.json()
        const reply = data.reply || '...'

        const aiMsg: ChatMessageType = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, aiMsg])
      } catch {
        const errMsg: ChatMessageType = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content:
            lang === 'ar'
              ? 'عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.'
              : 'Sorry, a connection error occurred. Please try again.',
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, errMsg])
      } finally {
        setLoading(false)
      }
    },
    [lang]
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 right-6 z-45 w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-accent"
        aria-label="Open AI chat"
      >
        <MessageCircle size={26} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            role="dialog"
            aria-label="AI Chat"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-black dark:bg-white text-white dark:text-black">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-accent rounded-xl flex items-center justify-center">
                  <Bot size={20} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold">{lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}</p>
                  <p className="text-[10px] opacity-70">Al-Mohandex</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close chat"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
                  {lang === 'ar' ? 'ابدأ المحادثة...' : 'Start a conversation...'}
                </div>
              )}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {loading && <TypingIndicator />}
            </div>

            <ChatInput onSend={sendMessage} disabled={loading} lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
