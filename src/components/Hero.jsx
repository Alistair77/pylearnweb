import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, HeartPulse, Landmark, Building, Zap } from 'lucide-react';

const QuantumScene = lazy(() => import('./hero3d/QuantumScene'));

const audiences = [
  { icon: HeartPulse, label: 'Beginners' },
  { icon: Shield, label: 'Career Switchers' },
  { icon: Landmark, label: 'Data & ML' },
  { icon: Building, label: 'Backend Devs' },
  { icon: Zap, label: 'Educators' },
];

const products = [
  {
    title: 'Interactive Lessons',
    desc: 'Bite-sized, structured lessons that build real Python skills step by step.',
  },
  {
    title: 'Hands-on Projects',
    desc: 'Apply what you learn immediately with guided, real-world coding projects.',
  },
  {
    title: 'Mentor Code Review',
    desc: 'Get real feedback on your code from experienced mentors, not just autograders.',
  },
];

const stats = ['50K+ Learners', '120+ Countries', '4.8/5 Rating', '2M+ Exercises Solved', 'Est. 2021'];

/* Animated count-up for the "lines of code" figure (demo data) */
function useCountUp(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return [val, ref];
}

function handleScroll(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* Track where the shield "stage" sits inside the hero so the 3D scene can place itself there */
function useStageFocus(heroRef, stageRef) {
  const [focus, setFocus] = useState(null);
  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return undefined;
    const measure = () => setFocus({ y: stage.offsetTop + stage.offsetHeight / 2, h: stage.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [heroRef, stageRef]);
  return focus;
}

export default function Hero() {
  const [linesWritten] = useCountUp(9384217);
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const focus = useStageFocus(heroRef, stageRef);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden text-gray-900"
      style={{ background: 'radial-gradient(90% 70% at 50% 72%, var(--hero-glow) 0%, var(--bg) 70%)' }}
    >
      {/* ===================== FULL-SCREEN HERO ===================== */}
      <div ref={heroRef} className="relative isolate flex min-h-[100svh] flex-col">
        {/* 3D scene fills the whole hero; pointer events come from the hero so the shield tilts even over the text */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <Suspense fallback={null}>
            <QuantumScene focus={focus} eventSource={heroRef} />
          </Suspense>
        </div>

        {/* Centered copy — sits above the stage, never on top of the shield */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-28 text-center md:pt-32 animate-reveal-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-surface/70 px-3.5 py-1.5 font-mono text-[13px] font-medium text-gray-700 backdrop-blur-sm">
            <span className="text-brand" aria-hidden="true">&gt;&gt;&gt;</span>
            learn_python(practically=True)
          </p>
          <h1
            className="font-display font-bold text-gray-900"
            style={{ fontSize: 'clamp(2.6rem, 6.2vw, 5.4rem)', lineHeight: 0.98, letterSpacing: '-0.045em' }}
          >
            Code confidently.
            <br />
            <span className="text-brand">Ship real projects.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-gray-600 sm:text-[19px]">
            PyLearnWeb teaches Python through structured lessons and hands-on projects — the skills that
            actually stick, not tutorials you forget by tomorrow.
          </p>
          <div className="mx-auto mt-8 flex max-w-xs flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <button
              onClick={() => handleScroll('products')}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-brand-hover active:translate-y-px sm:px-7 sm:py-4"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
            <button
              onClick={() => handleScroll('two-pronged-approach')}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-surface/70 px-5 py-3.5 text-[15px] font-semibold text-gray-800 backdrop-blur-sm transition-colors hover:border-gray-400 hover:bg-surface active:translate-y-px sm:px-7 sm:py-4"
            >
              How It Works
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Stage: empty space the shield is centred in (measured by useStageFocus) */}
        <div ref={stageRef} className="flex-1 min-h-[340px] lg:min-h-[300px]" />
      </div>

      {/* Built for real skills + audiences */}
      <div className="relative mx-auto max-w-[1400px] px-6 pt-10 pb-16 text-center animate-reveal-up delay-200">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gray-500">Built for real skills</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10">
          {audiences.map((a) => (
            <div key={a.label} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
              <a.icon className="w-5 h-5 text-gray-900" strokeWidth={1.6} />
              {a.label}
            </div>
          ))}
        </div>
      </div>

      {/* ===================== PRODUCT STRIP ===================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16">
        <div className="grid grid-cols-1 gap-y-8 rounded-3xl border border-gray-200/80 bg-surface/80 p-6 sm:p-8 backdrop-blur-sm shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)] md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
          {products.map((p, i) => (
            <div key={p.title} className={i > 0 ? 'lg:pl-10' : ''}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Shield className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{p.desc}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all">
                Learn More <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          ))}

          {/* Lines of code counter */}
          <div className="lg:pl-10">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-gray-500">Lines of code written today</h3>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-brand">
              {linesWritten.toLocaleString('en-US')}
            </p>
            <svg viewBox="0 0 220 70" className="mt-3 w-full" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points="0,58 28,52 56,55 84,44 112,47 140,36 168,40 196,26 220,14"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[[28, 52], [84, 44], [140, 36], [196, 26], [220, 14]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.6" fill="#dc2626" />
              ))}
            </svg>
            <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all">
              See student projects <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ===================== TRUSTED-BY STATS ===================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16">
        <div className="flex flex-col items-start gap-8 border-t border-gray-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[14rem] font-mono text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-gray-500">
            Trusted by a growing global community
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10">
            {stats.map((stat) => (
              <span key={stat} className="font-display text-lg font-semibold tracking-tight text-gray-400 transition-colors hover:text-gray-600">
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
