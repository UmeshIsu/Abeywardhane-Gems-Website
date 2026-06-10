import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '@/data/heroSlides';
import TrustBar from '@/components/sections/TrustBar';

const TYPE_SPEED = 55;
const TYPE_START_DELAY = 250;
const READING_PAUSE = 2800;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const timerRef = useRef(null);
  // The first slide renders fully on first paint (so the <h1> is present in the
  // prerendered HTML for SEO/LCP). Subsequent slides use the typewriter effect.
  const instantRef = useRef(true);
  useEffect(() => {
    instantRef.current = false;
  }, []);

  // Preload every slide photo so the crossfade never waits on a decode
  useEffect(() => {
    heroSlides.forEach((s) => {
      if (s.bgImage) {
        const img = new Image();
        img.src = s.bgImage;
      }
    });
  }, []);

  useEffect(() => {
    if (!typingComplete) return;
    timerRef.current = setTimeout(() => {
      setTypingComplete(false);
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, READING_PAUSE);
    return () => clearTimeout(timerRef.current);
  }, [typingComplete]);

  const jumpTo = (i) => {
    clearTimeout(timerRef.current);
    setTypingComplete(false);
    setCurrent(i);
  };

  const slide = heroSlides[current];

  return (
    <header className="relative overflow-hidden bg-white" style={{ minHeight: '100dvh' }}>
      {/* Atmospheric background: grid + sapphire glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-[0.5]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1100px 700px at 88% 6%, rgba(37,99,235,0.12) 0%, transparent 58%), radial-gradient(800px 560px at 4% 96%, rgba(59,130,246,0.07) 0%, transparent 60%), linear-gradient(180deg,#ffffff 0%, #f6f9fe 100%)',
          }}
        />
      </div>

      {/* Full-bleed per-slide photo — crossfades in sync with the slide timer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={slide.bgImage}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: slide.bgSize || 'cover',
              backgroundPosition: slide.bgPosition || 'center center',
              backgroundRepeat: 'no-repeat',
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 7, ease: 'linear' },
            }}
          />
        </AnimatePresence>

        {/* DESKTOP washes — heavy on the left so text stays crisp,
            light toward the right so the gem photo shines through */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(248,250,253,0.98) 0%, rgba(248,250,253,0.92) 26%, rgba(248,250,253,0.55) 46%, rgba(248,250,253,0.12) 70%, rgba(248,250,253,0) 100%)',
          }}
        />
        {/* Vertical vignette: melts into the navbar above and pager below */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(180deg, rgba(248,250,253,0.5) 0%, rgba(248,250,253,0) 18%, rgba(248,250,253,0) 64%, rgba(248,250,253,0.85) 100%)',
          }}
        />

        {/* MOBILE wash */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(248,250,253,0.97) 0%, rgba(248,250,253,0.9) 28%, rgba(248,250,253,0.82) 50%, rgba(248,250,253,0.8) 70%, rgba(248,250,253,0.97) 100%)',
          }}
        />
      </div>

      {/* Two-column content: text on left, open space (gem image visible) on right.
          padding-bottom reserves space for the absolutely-pinned pager + trustbar (~116px) */}
      <div
        className="relative z-10 container-x pt-24 lg:pt-28 flex flex-col justify-center"
        style={{ minHeight: '100dvh', paddingBottom: '168px' }}
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-24 items-center w-full">
          {/* Text column */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <SlideText
                key={current}
                slide={slide}
                instant={instantRef.current}
                onTypingComplete={() => setTypingComplete(true)}
              />
            </AnimatePresence>
          </div>

          {/* Right column — intentionally empty so the background gem photo shines through */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Pager + TrustBar — absolutely pinned to the bottom of the hero.
          This means slide transitions in the text area never move them. */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* 4-up pager */}
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-t-2xl overflow-hidden border-t border-line/80">
            {heroSlides.map((s, i) => {
              const active = i === current;
              return (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`relative flex items-center gap-2.5 text-left py-3.5 px-3 md:px-5 transition-all duration-300 ${
                    active ? 'bg-ink text-white' : 'glass text-muted hover:bg-tint hover:text-ink'
                  }`}
                >
                  <span className={`font-display text-base ${active ? 'text-frost' : 'text-sapphire'}`}>{s.pagerNum}</span>
                  <span className={`text-[0.68rem] md:text-xs font-semibold leading-tight whitespace-pre-line ${active ? 'text-white' : 'text-ink'}`}>
                    {s.pagerLabel}
                  </span>
                  {active && (
                    <motion.span
                      key={`fill-${i}-${current}`}
                      className="absolute top-0 left-0 h-[3px] bg-electric w-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: (READING_PAUSE + 2000) / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust marquee */}
        <TrustBar />
      </div>
    </header>
  );
}

/* ---------------- Sub-components ---------------- */

function SlideText({ slide, onTypingComplete, instant = false }) {
  // SlideText remounts per slide (key={current} in <Hero>), so initial state
  // already resets correctly — no reset effect needed.
  const [typingDone, setTypingDone] = useState(instant);

  const handleTypingDone = () => {
    setTypingDone(true);
    onTypingComplete && onTypingComplete();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.span
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.28em] uppercase text-sapphire font-bold mb-4"
      >
        <span className="block w-7 h-px bg-sapphire" />
        {slide.eyebrow}
      </motion.span>

      <h1
        className="font-display font-medium text-ink tracking-tight max-w-[560px] min-h-[2.1em] mb-5"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.06 }}
      >
        <TypingHeadline prefix={slide.prefix} em={slide.em} suffix={slide.suffix} onDone={handleTypingDone} instant={instant} />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="lead text-ink max-w-[460px] mb-7"
      >
        {slide.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
        className="flex flex-wrap items-center gap-4"
      >
        <Link
          to={slide.cta.to}
          className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all"
        >
          {slide.cta.label}
          <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to={slide.ctaSecondary.to}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 transition-all"
        >
          {slide.ctaSecondary.label}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-7 flex items-center gap-2 text-xs font-medium text-ink-soft"
      >
        <ShieldCheck size={15} className="text-sapphire" />
        Gemologist-verified · Ethically sourced · Trusted by 100+ dealers worldwide
      </motion.div>
    </motion.div>
  );
}

function TypingHeadline({ prefix, em, suffix, onDone, instant = false }) {
  const full = prefix + em + suffix;
  // When `instant`, start fully revealed so the headline is in the prerendered
  // HTML and paints immediately (no empty <h1>); otherwise type from empty.
  const [charIndex, setCharIndex] = useState(instant ? full.length : 0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (instant) {
      // Already fully shown — just signal completion so the subtitle/CTAs reveal.
      if (onDoneRef.current) onDoneRef.current();
      return;
    }
    setCharIndex(0);
    let cancelled = false;
    const cleanupRef = { current: null };
    const startTimer = setTimeout(() => {
      if (cancelled) return;
      const interval = setInterval(() => {
        setCharIndex((prev) => {
          const next = prev + 1;
          if (next >= full.length) {
            clearInterval(interval);
            requestAnimationFrame(() => {
              if (!cancelled && onDoneRef.current) onDoneRef.current();
            });
          }
          return next;
        });
      }, TYPE_SPEED);
      cleanupRef.current = () => clearInterval(interval);
    }, TYPE_START_DELAY);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [full, instant]);

  const shown = Math.min(charIndex, full.length);
  let preStr = '', emStr = '', sufStr = '';
  if (shown <= prefix.length) {
    preStr = full.slice(0, shown);
  } else if (shown <= prefix.length + em.length) {
    preStr = prefix;
    emStr = full.slice(prefix.length, shown);
  } else {
    preStr = prefix;
    emStr = em;
    sufStr = full.slice(prefix.length + em.length, shown);
  }

  return (
    <>
      <span>{preStr}</span>
      {emStr && <em className="not-italic text-sapphire" style={{ fontStyle: 'italic' }}>{emStr}</em>}
      <span>{sufStr}</span>
      <span className="typed-caret" aria-hidden="true" />
    </>
  );
}
