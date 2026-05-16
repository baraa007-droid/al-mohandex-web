import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let lastScrollY = 0

    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setIsAtTop(currentScrollY < 50)

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setIsAtBottom(currentScrollY >= maxScroll - 50)

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollY, scrollDirection, isAtTop, isAtBottom }
}
