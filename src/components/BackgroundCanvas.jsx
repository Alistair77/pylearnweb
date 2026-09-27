import { useEffect, useRef } from 'react';

// Tuned for a steady 60fps: particle count stays low enough that the pairwise line pass
// (O(n²)) stays ~24k checks per frame (~0.3ms), and lines are stroked in a few alpha batches instead
// of one stroke() per line.
const AREA_PER_PARTICLE = 6000; // px² of viewport per particle
const MAX_PARTICLES = 220;
const LINK_DIST = 110;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const ALPHA_BUCKETS = 4;
const MOUSE_RADIUS = 150;
const DOT_COLOR = 'rgba(107, 114, 128, 0.6)';

function readThemeColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    accent: s.getPropertyValue('--accent-rgb').trim(),
    line: s.getPropertyValue('--line-rgb').trim(),
  };
}

function createParticles(width, height) {
  const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / AREA_PER_PARTICLE));
  const columns = Math.ceil(Math.sqrt(count * (width / height)));
  const rows = Math.ceil(count / columns);
  const cellW = width / columns;
  const cellH = height / rows;
  return Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 2 + 1;
    const gx = (i % columns) * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.8;
    const gy = Math.floor(i / columns) * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.8;
    return {
      x: Math.max(size, Math.min(width - size, gx)),
      y: Math.max(size, Math.min(height - size, gy)),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size,
    };
  });
}

function stepParticle(p, width, height, mouse) {
  if (p.x + p.size > width || p.x - p.size < 0) {
    p.vx = -p.vx * 0.9;
    p.x = Math.max(p.size, Math.min(width - p.size, p.x));
  }
  if (p.y + p.size > height || p.y - p.size < 0) {
    p.vy = -p.vy * 0.9;
    p.y = Math.max(p.size, Math.min(height - p.size, p.y));
  }
  if (mouse.active) {
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_RADIUS && dist > 0) {
      const push = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 3;
      p.vx -= (dx / dist) * push;
      p.vy -= (dy / dist) * push;
    }
  }
  p.vx *= 0.99;
  p.vy *= 0.99;
  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  if (speed > 3) {
    p.vx = (p.vx / speed) * 3;
    p.vy = (p.vy / speed) * 3;
  } else if (speed > 0 && speed < 0.1) {
    p.vx = (p.vx / speed) * 0.1;
    p.vy = (p.vy / speed) * 0.1;
  }
  p.x += p.vx;
  p.y += p.vy;
}

function collide(a, b, dx, dy, dist) {
  const nx = dx / dist;
  const ny = dy / dist;
  const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (rel > 0) return;
  const impulse = (2 * rel) / (a.size + b.size);
  a.vx += impulse * b.size * nx;
  a.vy += impulse * b.size * ny;
  b.vx -= impulse * a.size * nx;
  b.vy -= impulse * a.size * ny;
  const shift = (a.size + b.size - dist) / 2;
  a.x -= shift * nx;
  a.y -= shift * ny;
  b.x += shift * nx;
  b.y += shift * ny;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0, active: false };
    let particles = [];
    let colors = readThemeColors();
    let frame;

    // Line segments collected per alpha bucket, then stroked once per bucket
    const buckets = { accent: [], line: [] };
    for (let k = 0; k < ALPHA_BUCKETS; k++) {
      buckets.accent.push([]);
      buckets.line.push([]);
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = createParticles(canvas.width, canvas.height);
    };

    const strokeBuckets = (kind, rgb) => {
      buckets[kind].forEach((segs, k) => {
        if (!segs.length) return;
        ctx.strokeStyle = `rgb(${rgb} / ${(kind === 'line' ? 0.6 : 1) * ((k + 0.5) / ALPHA_BUCKETS)})`;
        ctx.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          ctx.moveTo(segs[s], segs[s + 1]);
          ctx.lineTo(segs[s + 2], segs[s + 3]);
        }
        ctx.stroke();
        segs.length = 0;
      });
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) stepParticle(p, width, height, mouse);

      const rSq = MOUSE_RADIUS * MOUSE_RADIUS;
      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK_DIST_SQ) continue;
          const dist = Math.sqrt(d2);
          if (dist > 0 && dist < pa.size + pb.size) collide(pa, pb, dx, dy, dist);
          const k = Math.min(ALPHA_BUCKETS - 1, Math.floor((1 - dist / LINK_DIST) * ALPHA_BUCKETS));
          const nearMouse =
            mouse.active &&
            ((mouse.x - pa.x) ** 2 + (mouse.y - pa.y) ** 2 < rSq || (mouse.x - pb.x) ** 2 + (mouse.y - pb.y) ** 2 < rSq);
          buckets[nearMouse ? 'accent' : 'line'][k].push(pa.x, pa.y, pb.x, pb.y);
        }
      }
      ctx.lineWidth = 1;
      strokeBuckets('line', colors.line);
      strokeBuckets('accent', colors.accent);

      ctx.fillStyle = DOT_COLOR;
      ctx.beginPath();
      for (const p of particles) {
        ctx.moveTo(p.x + p.size, p.y);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    // Theme colours only change on toggle — read them then, not every frame
    const themeObserver = new MutationObserver(() => {
      colors = readThemeColors();
    });

    resize();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) draw();
    else loop();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  );
}
