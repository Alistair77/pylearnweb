'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * devicePixelRatio;
      canvas!.height = h * devicePixelRatio;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    };

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(80, Math.floor((w * h) / 25000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawGlow = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx!.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.arc(x, y, radius, 0, Math.PI * 2);
      ctx!.fill();
    };

    const animate = () => {
      time += 0.016;
      ctx!.clearRect(0, 0, w, h);

      const cycle = (Math.sin(time * 0.15) + 1) / 2;
      const warmth = cycle;
      const r = Math.round(50 + warmth * 30);
      const g = Math.round(60 + warmth * 20);
      const b = Math.round(80 + warmth * 10);

      const baseGradient = ctx!.createRadialGradient(
        w * 0.5, h * 0.4, 0,
        w * 0.5, h * 0.4, Math.max(w, h) * 0.8
      );
      baseGradient.addColorStop(0, `rgb(${r + 20}, ${g + 15}, ${b + 10})`);
      baseGradient.addColorStop(0.3, `rgb(${r}, ${g}, ${b})`);
      baseGradient.addColorStop(0.7, `rgb(${Math.max(r - 30, 0)}, ${Math.max(g - 25, 0)}, ${Math.max(b - 20, 0)})`);
      baseGradient.addColorStop(1, `rgb(5, 5, 8)`);
      ctx!.fillStyle = baseGradient;
      ctx!.fillRect(0, 0, w, h);

      const glowX = w * (0.5 + Math.sin(time * 0.1) * 0.15);
      const glowY = h * (0.3 + Math.sin(time * 0.12 + 1) * 0.1);
      drawGlow(glowX, glowY, Math.max(w, h) * 0.4, `rgba(${r + 60}, ${g + 30}, ${b - 20}, 0.15)`);

      const glow2X = w * (0.7 + Math.sin(time * 0.08 + 2) * 0.12);
      const glow2Y = h * (0.6 + Math.sin(time * 0.09 + 3) * 0.08);
      drawGlow(glow2X, glow2Y, Math.max(w, h) * 0.3, `rgba(${r + 40}, ${g + 15}, ${b - 10}, 0.1)`);

      const glow3X = w * (0.3 + Math.sin(time * 0.11 + 4) * 0.1);
      const glow3Y = h * (0.7 + Math.sin(time * 0.13 + 5) * 0.06);
      drawGlow(glow3X, glow3Y, Math.max(w, h) * 0.25, `rgba(${r + 50}, ${g + 20}, ${b}, 0.08)`);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time * 0.5 + p.phase) * 0.1;
        p.y += p.vy + Math.cos(time * 0.6 + p.phase) * 0.1;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.3;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;

        const pulse = Math.sin(time * 0.8 + p.phase) * 0.15 + 0.85;
        const alpha = p.opacity * pulse;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx!.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx!.lineWidth = 0.3;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const onResize = () => {
      resize();
      initParticles();
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
