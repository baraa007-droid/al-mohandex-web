'use client'

import { memo } from 'react'
import { Bot, User } from 'lucide-react'
import type { ChatMessageProps } from '@/interfaces'

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${isUser ? 'bg-brand-accent' : 'bg-neutral-700'}`}>
        {isUser ? <User size={16} className="text-white" aria-hidden="true" /> : <Bot size={16} className="text-white" aria-hidden="true" />}
      </div>
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser ? 'bg-brand-accent text-white rounded-tr-md' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-md'}`}>
          {message.content}
        </div>
        <span className="text-[10px] text-neutral-400 mt-1 px-1">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  )
})

export default ChatMessage
