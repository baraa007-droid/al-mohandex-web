'use client'

import { useEffect, useRef, memo } from 'react'

function CustomCursorInner() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select')
      if (isClickable) {
        cursor.classList.add('scale-150', 'opacity-60')
        dot.classList.add('opacity-0')
      } else {
        cursor.classList.remove('scale-150', 'opacity-60')
        dot.classList.remove('opacity-0')
      }
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border-2 border-brand-accent/60 transition-all duration-200 ease-out"
        style={{ transform: 'translate(-16px, -16px)' }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="custom-cursor fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-brand-accent transition-opacity duration-200"
        style={{ transform: 'translate(-4px, -4px)' }}
        aria-hidden="true"
      />
    </>
  )
}

export default memo(CustomCursorInner)
