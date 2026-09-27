import { useEffect, useRef, useState } from 'react';
import { useTypedCount } from '../../hooks/useTypedCount';

/* Terminal caret; zero-width anchor so it never pushes text around */
function Caret({ mode }) {
  return <span className={`type-caret${mode === 'solid' ? ' type-caret--solid' : ''}`} />;
}

/**
 * Renders text as per-character spans. Untyped characters are invisible but still take
 * their final space, so wrapping and layout never shift while typing. Screen readers get
 * the full text at once.
 * tokens: a string, or [{ text, className }] for syntax colouring.
 * caret: false | 'solid' | 'blink'
 */
export function TypedChars({ tokens, shown, caret = false }) {
  const parts = typeof tokens === 'string' ? [{ text: tokens }] : tokens;
  let index = 0;
  return (
    <>
      <span className="sr-only">{parts.map((p) => p.text).join('')}</span>
      <span aria-hidden="true">
        {caret && shown === 0 && (
          <span className="relative">
            <Caret mode={caret} />
          </span>
        )}
        {parts.map((part, pi) => (
          <span key={pi} className={part.className}>
            {[...part.text].map((ch) => {
              const i = index++;
              const hasCaret = caret && i === shown - 1;
              return (
                <span key={i} className={`${i < shown ? '' : 'opacity-0'}${hasCaret ? ' relative' : ''}`}>
                  {ch}
                  {hasCaret && <Caret mode={caret} />}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}

/* Types its text the first time it scrolls into view (section headings) */
export function TypeOnView({ text, speed = 28 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const shown = useTypedCount(text.length, { start: inView, speed });
  return (
    <span ref={ref}>
      <TypedChars tokens={text} shown={shown} caret={shown < text.length && 'solid'} />
    </span>
  );
}

/* Python-comment section label: "# how_it_works" */
export function CodeComment({ children, className = '' }) {
  return (
    <p className={`mb-4 font-mono text-[13px] font-medium text-gray-500 ${className}`}>
      <span className="text-brand">#</span> {children}
    </p>
  );
}
