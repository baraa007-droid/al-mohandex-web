'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { BlurImageProps } from '@/interfaces'

export default function BlurImage({ src, alt, className, containerClassName }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-neutral-200 dark:bg-neutral-800', containerClassName)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-700',
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-xl',
          className
        )}
      />
    </div>
  );
}
