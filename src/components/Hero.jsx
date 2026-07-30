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

export default function Hero() {
  const [linesWritten] = useCountUp(9384217);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden text-gray-900"
      style={{ background: 'radial-gradient(120% 100% at 75% 30%, #ffffff 0%, #f6f7f9 55%, #eef0f3 100%)' }}
    >
      {/* ===================== HERO ROW ===================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 pt-28 md:pt-32">
        <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.25fr)] min-h-[64vh]">
          {/* Left copy */}
          <div className="relative z-20 animate-reveal-up">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-quantasphere-red">
                Learn Python, Practically
              </span>
            </div>
            <span className="block h-[3px] w-12 bg-quantasphere-red mb-7" />
            <h1
              className="font-extrabold tracking-tight text-gray-900"
              style={{ fontSize: 'clamp(2.6rem, 4.4vw, 4rem)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
            >
              Code confidently.
              <br />
              <span className="text-quantasphere-red">Ship real projects.</span>
            </h1>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-gray-600 text-pretty">
              PythonSphere teaches Python through structured lessons and hands-on projects — the skills that
              actually stick, not tutorials you forget by tomorrow. Guided practice today. Real projects tomorrow.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleScroll('products')}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-quantasphere-red px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-quantasphere-red-hover active:translate-y-px"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </button>
              <button
                onClick={() => handleScroll('two-pronged-approach')}
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white/70 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-gray-800 backdrop-blur-sm transition-colors hover:border-gray-400 hover:bg-white active:translate-y-px"
              >
                How It Works
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </button>
            </div>
            <div className="mt-10 flex items-center gap-2.5 text-sm text-gray-500">
              <Shield className="w-4 h-4 text-quantasphere-red" strokeWidth={1.75} />
              Trusted by a growing global community
            </div>
          </div>

          {/* Right: live 3D scene */}
          <div className="relative h-[440px] sm:h-[520px] lg:h-[600px]">
            <Suspense fallback={null}>
              <QuantumScene />
            </Suspense>

            {/* floating side labels */}
            <div className="pointer-events-none absolute left-0 top-[24%] hidden max-w-[150px] md:block">
              <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-gray-700">
                Concepts<br />Learned
              </p>
              <span className="my-2 block h-5 w-px bg-gray-900/30" />
              <p className="text-xs leading-snug text-gray-500">Syntax. Logic. Real code.</p>
            </div>
            <div className="pointer-events-none absolute right-0 top-[22%] hidden max-w-[150px] text-right md:block">
              <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-quantasphere-red">
                Projects<br />Shipped
              </p>
              <span className="my-2 ml-auto block h-5 w-px bg-quantasphere-red/40" />
              <p className="text-xs leading-snug text-gray-500">Scripts. APIs. Apps. Automation. Data tools.</p>
            </div>
          </div>
        </div>

        {/* Built for real skills + audiences */}
        <div className="relative z-10 mt-6 mb-16 text-center animate-reveal-up delay-200">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Built for Real Skills</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {audiences.map((a) => (
              <div key={a.label} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                <a.icon className="w-5 h-5 text-gray-900" strokeWidth={1.6} />
                {a.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== PRODUCT STRIP ===================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16">
        <div className="grid grid-cols-1 gap-y-8 rounded-3xl border border-gray-200/80 bg-white/80 p-8 backdrop-blur-sm shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)] md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
          {products.map((p, i) => (
            <div key={p.title} className={i > 0 ? 'lg:pl-10' : ''}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-quantasphere-red-50 text-quantasphere-red">
                <Shield className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-base font-bold uppercase tracking-wide text-gray-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.desc}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-quantasphere-red hover:gap-2.5 transition-all">
                Learn More <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          ))}

          {/* Lines of code counter */}
          <div className="lg:pl-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Lines of Code Written Today</h3>
            <p className="mt-3 font-mono text-3xl font-bold tabular-nums text-quantasphere-red">
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
            <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-quantasphere-red hover:gap-2.5 transition-all">
              See student projects <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ===================== TRUSTED-BY STATS ===================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16">
        <div className="flex flex-col items-start gap-8 border-t border-gray-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[14rem] text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-gray-500">
            Trusted by a growing global community
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {stats.map((stat) => (
              <span key={stat} className="text-base font-semibold tracking-tight text-gray-400 transition-colors hover:text-gray-600">
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
