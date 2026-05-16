'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const COLORS = ['#0070f3', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
const PARTICLE_COUNT = 40;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  xEnd: number;
  yEnd: number;
  duration: number;
}

export default function SuccessConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: randomBetween(0, 360),
      scale: randomBetween(0.3, 1),
      xEnd: randomBetween(-200, 200),
      yEnd: randomBetween(-200, 200),
      duration: randomBetween(0.6, 1.4),
    }));
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: p.x, y: p.y, rotate: 0, opacity: 1 }}
          animate={{
            x: p.x + p.xEnd,
            y: p.y + p.yEnd,
            rotate: p.rotation,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
