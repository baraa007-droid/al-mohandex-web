'use client';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-neutral-700 flex items-center justify-center">
        <span className="text-white text-xs font-bold">AI</span>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-md px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
