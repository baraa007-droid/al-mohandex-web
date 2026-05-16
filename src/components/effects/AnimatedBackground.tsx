'use client'

import { useEffect, useRef, useCallback, memo } from 'react'

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

function AnimatedBackgroundInner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  const initParticle = useCallback((w: number, h: number): Particle => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.4 + 0.1,
    life: 0,
    maxLife: Math.random() * 200 + 100,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Seed initial particles
    const w = () => canvas.width;
    const h = () => canvas.height;
    particlesRef.current = Array.from({ length: 60 }, () => initParticle(w(), h()));

    const animate = () => {
      ctx.clearRect(0, 0, w(), h());

      const { x: mx, y: my } = mouseRef.current;

      // Cursor glow
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      gradient.addColorStop(0, 'rgba(0, 112, 243, 0.08)');
      gradient.addColorStop(0.5, 'rgba(0, 112, 243, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 112, 243, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w(), h());

      // Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.alpha = Math.max(0, Math.min(0.5, p.alpha + (Math.random() - 0.5) * 0.01));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 112, 243, ${p.alpha})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 112, 243, ${(1 - dist2 / 100) * 0.08})`;
            ctx.stroke();
          }
        }

        // Reset dead particles
        if (p.life > p.maxLife || p.x < -50 || p.x > w() + 50 || p.y < -50 || p.y > h() + 50) {
          particles[i] = initParticle(w(), h());
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [initParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}

export default memo(AnimatedBackgroundInner)
