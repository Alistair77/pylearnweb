import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Briefcase, ChartColumn, GraduationCap, Hammer, MessageSquareCode, Server, Sprout } from 'lucide-react';
import { ThinkingOrb } from 'thinking-orbs';
import { CodeComment, TypedChars } from './ui/Typewriter';
import { useTypedCount } from '../hooks/useTypedCount';

const QuantumScene = lazy(() => import('./hero3d/QuantumScene'));

/* REPL prompt shown instantly above the headline; only the headline types */
const PROMPT = [
  { text: 'learn_python', className: 'text-gray-900' },
  { text: '(', className: 'text-gray-500' },
  { text: 'practically', className: 'text-gray-600' },
  { text: '=', className: 'text-gray-500' },
  { text: 'True', className: 'text-brand' },
  { text: ')', className: 'text-gray-500' },
];
const LINE_1 = 'Code confidently.';
const LINE_2 = 'Ship real projects.';
const TYPE_TOTAL = LINE_1.length + LINE_2.length;
// ms per character, with a short beat before the second line (~1s for the whole headline)
const typeSpeed = (n) => (n === LINE_1.length ? 140 : 24);
// If WebGL fails or the model never arrives, stop showing the loader after this long
const SCENE_FALLBACK_MS = 15000;

const audiences = [
  { icon: Sprout, label: 'Beginners' },
  { icon: Briefcase, label: 'Career Switchers' },
  { icon: ChartColumn, label: 'Data & ML' },
  { icon: Server, label: 'Backend Devs' },
  { icon: GraduationCap, label: 'Educators' },
];

const products = [
  {
    icon: BookOpen,
    title: 'Interactive Lessons',
    desc: 'Bite-sized, structured lessons that build real Python skills step by step.',
    cta: 'Browse the tracks',
    target: 'products',
  },
  {
    icon: Hammer,
    title: 'Hands-on Projects',
    desc: 'Apply what you learn immediately with guided, real-world coding projects.',
    cta: 'See what you’ll build',
    target: 'projects',
  },
  {
    icon: MessageSquareCode,
    title: 'Mentor Code Review',
    desc: 'Get real feedback on your code from experienced mentors, not just autograders.',
    cta: 'How review works',
    target: 'two-pronged-approach',
  },
];

const stats = ['50K+ Learners', '120+ Countries', '4.8/5 Rating', '2M+ Exercises Solved', 'Est. 2021'];

/* Typed headline in its own component: typing re-renders only these spans */
function TypedHeadline() {
  const typed = useTypedCount(TYPE_TOTAL, { delay: 150, speed: typeSpeed });
  const caret = typed < TYPE_TOTAL ? 'solid' : 'blink';
  return (
    <h1
      className="font-display font-bold text-gray-900"
      style={{ fontSize: 'clamp(2.6rem, 6.2vw, 5.4rem)', lineHeight: 0.98, letterSpacing: '-0.045em' }}
    >
      <TypedChars tokens={LINE_1} shown={Math.min(typed, LINE_1.length)} caret={typed < LINE_1.length && caret} />
      <br />
      <span className="text-brand">
        <TypedChars
          tokens={LINE_2}
          shown={Math.max(typed - LINE_1.length, 0)}
          caret={typed >= LINE_1.length && caret}
        />
      </span>
    </h1>
  );
}

/* Only re-render the 3D scene when its own props change */
const Scene = memo(QuantumScene);

/* Pause the WebGL render loop while the hero is scrolled out of view */
function useInView(ref) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
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
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const focus = useStageFocus(heroRef, stageRef);

  const heroInView = useInView(heroRef);

  const [sceneReady, setSceneReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSceneReady(true), SCENE_FALLBACK_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden text-gray-900"
      style={{ background: 'radial-gradient(90% 70% at 50% 72%, var(--hero-glow) 0%, var(--bg) 70%)' }}
    >
      {/* ===================== FULL-SCREEN HERO ===================== */}
      <div ref={heroRef} className="relative isolate flex min-h-[100svh] flex-col">
        {/* 3D scene fills the whole hero; pointer events come from the hero so the shield tilts even over the text */}
        <div
          className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 ${sceneReady ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <Scene focus={focus} eventSource={heroRef} onReady={setSceneReady} active={heroInView} />
          </Suspense>
        </div>

        {/* Centered copy — sits above the stage, never on top of the shield */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-28 text-center md:pt-32 animate-reveal-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-surface/70 px-3.5 py-1.5 font-mono text-[13px] font-medium text-gray-700 backdrop-blur-sm">
            <span className="text-brand" aria-hidden="true">&gt;&gt;&gt;</span>
            <span>
              {PROMPT.map((t) => (
                <span key={t.text} className={t.className}>
                  {t.text}
                </span>
              ))}
            </span>
          </p>
          <TypedHeadline />
          <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-gray-600 sm:text-[19px]">
            PyLearnWeb teaches Python through structured lessons and hands-on projects: the skills that
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
        <div ref={stageRef} className="relative flex flex-1 min-h-[340px] items-center justify-center lg:min-h-[300px]">
          {/* Loader while the 3D scene downloads; fades out (and pauses) once the scene has rendered */}
          <div
            role="status"
            aria-hidden={sceneReady}
            className={`inline-flex h-[60px] items-center gap-3 rounded-full border border-gray-200/80 bg-surface/60 pl-1.5 pr-6 backdrop-blur-md transition-opacity duration-500 ${sceneReady ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          >
            <span className="[&_canvas]:!size-12">
              <ThinkingOrb state="solving" size={64} paused={sceneReady} />
            </span>
            <span className="font-mono text-sm text-gray-500">Solving…</span>
          </div>
        </div>
      </div>

      {/* Built for real skills + audiences */}
      <div className="relative mx-auto max-w-[1400px] px-6 pt-10 pb-16 text-center animate-reveal-up delay-200">
        <CodeComment className="mb-0">built_for_real_learners</CodeComment>
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
        <div className="grid grid-cols-1 gap-y-8 rounded-3xl border border-gray-200/80 bg-surface/90 p-6 sm:p-8 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)] md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
          {products.map((p, i) => (
            <div key={p.title} className={i > 0 ? 'lg:pl-10' : ''}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <p.icon className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{p.desc}</p>
              <button
                type="button"
                onClick={() => handleScroll(p.target)}
                className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand"
              >
                {p.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </button>
            </div>
          ))}

          {/* Week one, in real code: shows the product instead of a vanity metric */}
          <div className="lg:pl-10">
            <CodeComment className="mb-3">your_first_week</CodeComment>
            <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-[13px] leading-relaxed text-gray-800">
              <code>
                <span className="text-brand">&gt;&gt;&gt;</span> name = <span className="text-brand">&quot;Ada&quot;</span>
                {'\n'}
                <span className="text-brand">&gt;&gt;&gt;</span> print(f<span className="text-brand">&quot;Hi, {'{'}name{'}'}!&quot;</span>)
                {'\n'}
                <span className="text-gray-600">Hi, Ada!</span>
              </code>
            </pre>
            <button
              type="button"
              onClick={() => handleScroll('projects')}
              className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand"
            >
              See student projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ===================== TRUSTED-BY STATS ===================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 pb-16">
        <div className="flex flex-col items-start gap-8 border-t border-gray-200 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <CodeComment className="mb-0 max-w-[16rem]">trusted_by_learners_worldwide</CodeComment>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10">
            {stats.map((stat) => (
              <span key={stat} className="font-display text-lg font-semibold tracking-tight text-gray-500">
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
