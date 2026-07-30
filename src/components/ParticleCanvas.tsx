'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  isRed: boolean;
}

export function ParticleCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        setDimensions({ width: canvas.width, height: canvas.height });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particleCount = Math.min(120, Math.floor((dimensions.width * dimensions.height) / 15000));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      isRed: Math.random() < 0.08,
    }));

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;

        const dx = p.x - mouseRef.current.x * window.devicePixelRatio;
        const dy = p.y - mouseRef.current.y * window.devicePixelRatio;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 * window.devicePixelRatio && p.isRed) {
          const force = (150 * window.devicePixelRatio - dist) / (150 * window.devicePixelRatio) * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * window.devicePixelRatio, 0, Math.PI * 2);
        if (p.isRed) {
          ctx.fillStyle = `rgba(220, 38, 38, ${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        }
        ctx.fill();
      });

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120 * window.devicePixelRatio) {
            const opacity = (1 - dist / (120 * window.devicePixelRatio)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            if (p1.isRed || p2.isRed) {
              ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            ctx.lineWidth = 0.5 * window.devicePixelRatio;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    />
  );
}