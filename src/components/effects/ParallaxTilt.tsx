'use client'

import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ParallaxTiltProps } from '@/interfaces'

export default function ParallaxTilt({ children, className, intensity = 10 }: ParallaxTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * intensity);
    y.set(-((e.clientY - cy) / rect.height) * intensity);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: springY, rotateY: springX }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
