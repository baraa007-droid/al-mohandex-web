'use client'

import { useState, type KeyboardEvent, type FormEvent } from 'react'
import { Send, Sparkles } from 'lucide-react'
import type { ChatSuggestion } from '@/types'
import type { ChatInputProps } from '@/interfaces'

const SUGGESTIONS: ChatSuggestion[] = [
  { en: 'What services do you offer?', ar: 'ما هي الخدمات التي تقدمونها؟' },
  { en: 'Tell me about your team', ar: 'حدثني عن فريقكم' },
  { en: 'How can I start a project?', ar: 'كيف أبدأ مشروعاً معكم؟' },
]

export default function ChatInput({ onSend, disabled, lang }: ChatInputProps) {
  const [input, setInput] = useState('')

  const submit = (): void => {
    const text = input.trim()
    if (!text || disabled) return
    onSend(text)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
      <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label={lang === 'ar' ? 'رسائل مقترحة' : 'Suggested messages'}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => { onSend(s[lang]); setInput('') }}
            disabled={disabled}
            className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-brand-accent hover:bg-brand-accent/10 transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label={s[lang]}
          >
            <Sparkles size={10} aria-hidden="true" />
            {s[lang]}
          </button>
        ))}
      </div>
      <form onSubmit={(e: FormEvent) => { e.preventDefault(); submit() }} className="flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
          rows={1}
          disabled={disabled}
          className="flex-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-3 text-sm outline-none resize-none max-h-32 focus:ring-2 focus:ring-brand-accent/30 transition-all disabled:opacity-50"
          style={{ minHeight: 44 }}
          aria-label={lang === 'ar' ? 'اكتب رسالتك' : 'Type your message'}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-accent text-white flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          aria-label={lang === 'ar' ? 'إرسال الرسالة' : 'Send message'}
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
