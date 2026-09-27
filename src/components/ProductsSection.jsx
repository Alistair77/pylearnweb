import { Shield, Landmark, Zap, Factory, HeartPulse, Building, ArrowRight, Atom } from 'lucide-react';
import { CodeComment, TypeOnView } from './ui/Typewriter';

const products = [
  {
    id: 'trustless',
    title: 'Professional Track',
    tier: 'Professional Tier',
    description: 'Our most advanced track — build production systems, APIs, and data pipelines with full mentor code review.',
    stack: 'APIs · Testing · Deployment',
    industries: [
      { icon: Landmark, label: 'Backend Devs' },
      { icon: Zap, label: 'Fast-Track Learners' },
      { icon: Shield, label: 'Job Seekers' },
      { icon: Factory, label: 'Freelancers' },
    ],
    href: '#contact',
  },
  {
    id: 'embedded',
    title: 'Practitioner Track',
    tier: 'Practitioner Tier',
    description: 'Real projects, testing, and clean-code practices that turn syntax knowledge into job-ready skills.',
    stack: 'Projects · Testing · Git',
    industries: [
      { icon: HeartPulse, label: 'Career Switchers' },
      { icon: Factory, label: 'Bootcamp Grads' },
      { icon: Building, label: 'Self-Taught Devs' },
      { icon: Shield, label: 'Students' },
    ],
    href: '#contact',
  },
  {
    id: 'lite',
    title: 'Beginner Track',
    tier: 'Beginner Tier',
    description: 'Start from zero — syntax, logic, and your first working programs, one guided lesson at a time.',
    stack: 'Syntax · Logic · Practice',
    industries: [
      { icon: Building, label: 'Complete Beginners' },
      { icon: Zap, label: 'Quick Starters' },
      { icon: Building, label: 'Hobbyists' },
      { icon: Factory, label: 'Curious Minds' },
    ],
    href: '#contact',
  },
];

const shieldLines = {
  trustless: [11, 13, 15],
  embedded: [12, 14],
  lite: [13],
};

function ShieldGlyph({ id, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 21.5l-8 -4.5v-9l8 -4.5l8 4.5v9l-8 4.5" />
      {(shieldLines[id] || shieldLines.lite).map((y) => (
        <line key={y} x1="8" y1={y} x2="16" y2={y} stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export function ProductsSection() {
  const featured = products[0];
  const supporting = products.slice(1);

  return (
    <section id="products" className="py-28 md:py-40 px-6 bg-gray-50/90">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric editorial header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-14 animate-reveal-up">
          <div className="lg:col-span-7">
            <CodeComment>learning_tracks</CodeComment>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.04] text-balance">
              <TypeOnView text="PyLearnWeb Tracks" />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg text-gray-600 leading-relaxed max-w-[48ch]">
              A learning track for every stage, from your first line of code to production-ready projects.
            </p>
          </div>
        </div>

        {/* Industry-aligned curriculum — bordered, icon-led callout */}
        <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-surface/70 px-6 py-5 mb-14 max-w-4xl animate-reveal-up delay-200">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand">
            <Shield className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Industry-Aligned Curriculum</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-pretty">
              Our curriculum is updated regularly to match the tools and practices real Python teams use today, so what you learn stays relevant as the ecosystem evolves.
            </p>
          </div>
        </div>

        {/* Flagship tier — wide, dark, sets hierarchy */}
        <a
          href={featured.href}
          className="group relative block overflow-hidden rounded-2xl bg-zinc-950 text-white p-8 md:p-12 mb-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 active:translate-y-0 animate-reveal-up delay-300"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.22),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="relative grid md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-accent-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <ShieldGlyph id={featured.id} className="w-7 h-7" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-on-dark">
                  {featured.tier}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{featured.title}</h3>
              <p className="text-zinc-300 leading-relaxed max-w-[46ch] mb-7">{featured.description}</p>
              <div className="inline-flex items-center font-mono text-sm text-zinc-300 bg-white/5 ring-1 ring-white/10 rounded-lg px-3 py-1.5">
                {featured.stack}
              </div>
            </div>
            <div className="md:border-l md:border-white/10 md:pl-14">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 mb-5">Ideal For</p>
              <div className="grid grid-cols-2 gap-3">
                {featured.industries.map((ind) => (
                  <div
                    key={ind.label}
                    className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-zinc-200"
                  >
                    <ind.icon className="w-4 h-4 text-accent-on-dark flex-none" strokeWidth={1.5} />
                    {ind.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span className="relative mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white">
            Explore {featured.title}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>

        {/* Supporting tiers — two-column, premium light cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {supporting.map((product, index) => (
            <a
              key={product.id}
              href={product.href}
              className="group flex flex-col rounded-2xl bg-surface border border-gray-200 p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)] active:translate-y-0 animate-reveal-up"
              style={{ animationDelay: `${(index + 4) * 120}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 border border-gray-200 text-brand">
                  <ShieldGlyph id={product.id} className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{product.title}</h3>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand mt-0.5">{product.tier}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{product.description}</p>
              <div className="inline-flex w-fit items-center font-mono text-sm text-gray-700 bg-gray-100 rounded-lg px-3 py-1.5 mb-6">
                {product.stack}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.industries.map((ind) => (
                  <div key={ind.label} className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                    <ind.icon className="w-3 h-3 text-gray-500" strokeWidth={1.5} />
                    {ind.label}
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-reveal-up delay-700">
          <button
            type="button"
            onClick={() => document.getElementById('two-pronged-approach')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors active:translate-y-px"
          >
            See how it works
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors active:translate-y-px"
          >
            Meet the team
            <Atom className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
