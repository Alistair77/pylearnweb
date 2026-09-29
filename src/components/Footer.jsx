import { useLocation, useNavigate } from 'react-router-dom';
import footerLogoImg from '../assets/images/logo.svg';
import { TypeOnView, TypedChars } from './ui/Typewriter';

const LINK_COLUMNS = [
  {
    title: 'courses',
    links: [
      { label: 'Beginner Track', section: 'products' },
      { label: 'Practitioner Track', section: 'products' },
      { label: 'Professional Track', section: 'products' },
      { label: 'How It Works', section: 'two-pronged-approach' },
    ],
  },
  {
    title: 'community',
    links: [
      { label: 'Blog', section: 'about' },
      { label: 'Discussion Forum', section: 'about' },
      { label: 'Documentation', section: 'products' },
    ],
  },
  {
    title: 'company',
    links: [
      { label: 'About Us', section: 'about' },
      { label: 'Contact', section: 'contact' },
      { label: 'Why Python', section: 'technologies' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'X (Twitter)',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];

const QUESTION = 'Have you learnt your Python yet?';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (sectionId) => {
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="relative isolate z-10 overflow-hidden bg-zinc-950 text-zinc-400">
      {/* Atmosphere: blurred brand glows, a giant soft wordmark, film grain. All static. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-[12%] h-[28rem] w-[28rem] rounded-full bg-brand opacity-35 blur-[120px]" />
        <div className="absolute top-32 right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-accent-on-dark opacity-15 blur-[120px]" />
        <p className="absolute inset-x-0 top-10 select-none text-center font-display text-[24vw] font-bold leading-none tracking-[-0.06em] text-white/[0.035] blur-[3px]">
          python
        </p>
        <div className="footer-grain absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* ===================== TERMINAL ===================== */}
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6 md:pt-32">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-accent-on-dark/60" />
            <span className="ml-3 truncate font-mono text-xs text-zinc-500">learner@pylearnweb: ~ · python3</span>
          </div>

          {/* Session */}
          <div className="terminal-scanlines px-5 py-8 font-mono sm:px-10 sm:py-12">
            <p className="text-[13px] text-zinc-500 sm:text-sm">
              <span className="text-accent-on-dark">~/pylearnweb</span> <span className="text-zinc-600">$</span>{' '}
              <span className="text-zinc-300">python3</span>
            </p>
            <p className="mt-1 text-[13px] text-zinc-600 sm:text-sm">Python 3.13 · type help() for more</p>
            <p className="mt-4 text-[13px] text-zinc-400 sm:text-sm">
              <span className="text-accent-on-dark">&gt;&gt;&gt;</span> <span className="text-zinc-200">print</span>(
              <span className="text-emerald-300/90">&quot;{QUESTION}&quot;</span>)
            </p>

            <h2 className="mt-5 font-mono text-[clamp(1.75rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-50">
              <TypeOnView text={QUESTION} speed={30} />
            </h2>

            <p className="mt-6 text-[13px] text-zinc-400 sm:text-sm">
              <span className="text-accent-on-dark">&gt;&gt;&gt;</span>&nbsp;<TypedChars tokens="" shown={0} caret="blink" />
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => handleNavClick('products')}
                aria-label="Start learning: explore courses"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/30 transition-colors hover:bg-brand-hover active:translate-y-px"
              >
                <span className="text-white/60">$</span> pip install pylearnweb
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <button
                onClick={() => handleNavClick('two-pronged-approach')}
                aria-label="How it works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5 active:translate-y-px"
              >
                <span className="text-zinc-500">$</span> python -m how_it_works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== LINKS ===================== */}
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-10 border-t border-white/10 pt-12 md:flex-row">
          <div className="max-w-sm flex-shrink-0">
            <img src={footerLogoImg} alt="PyLearnWeb" className="h-8 w-auto object-contain" />
            <p className="mt-4 text-sm text-zinc-500">Making Python approachable, one project at a time.</p>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              <span className="font-semibold text-zinc-100">Remote-first team</span> · serving learners worldwide.
            </p>
          </div>

          <nav aria-label="Footer" className="grid flex-grow grid-cols-2 gap-8 md:grid-cols-3">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 font-mono text-xs font-medium text-zinc-500">
                  <span className="text-accent-on-dark">#</span> {col.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleNavClick(link.section)}
                        className="cursor-pointer border-0 bg-transparent p-0 text-left text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p className="font-mono">
            © {new Date().getFullYear()} PyLearnWeb <span className="text-zinc-600">·</span> exit(0)
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-zinc-500 transition-colors hover:text-white"
                aria-label={s.label}
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
