import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '@/data/heroSlides';
import gemVideo from '@/assets/Object_rotating_360_degrees_202606011636.mp4';

const TYPE_SPEED = 55;
const TYPE_START_DELAY = 250;
const READING_PAUSE = 2800;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const timerRef = useRef(null);

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
    <header className="relative overflow-hidden bg-white">
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

      <div className="relative z-10 container-x pt-0 pb-20 lg:pt-0 lg:pb-16 lg:min-h-0 lg:flex lg:items-center" style={{ minHeight: 'min(88vh, 820px)' }}>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center w-full">
          {/* Text column */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <SlideText key={current} slide={slide} onTypingComplete={() => setTypingComplete(true)} />
            </AnimatePresence>
          </div>

          {/* Visual column: 3D gem + framed slide photo */}
          <div className="relative">
            <HeroVisual slide={slide} slideKey={current} />
          </div>
        </div>
      </div>

      {/* Premium 4-up pager */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-t-2xl overflow-hidden border-t border-line/80">
            {heroSlides.map((s, i) => {
              const active = i === current;
              return (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`relative flex items-center gap-3 text-left py-5 px-4 md:px-6 transition-all duration-300 ${active ? 'bg-ink text-white' : 'glass text-muted hover:bg-tint hover:text-ink'
                    }`}
                >
                  <span className={`font-display text-lg ${active ? 'text-frost' : 'text-sapphire'}`}>{s.pagerNum}</span>
                  <span className={`text-[0.76rem] md:text-sm font-semibold leading-tight whitespace-pre-line ${active ? 'text-white' : 'text-ink'}`}>
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
      </div>
    </header>
  );
}

/* ---------------- Sub-components ---------------- */

function SlideText({ slide, onTypingComplete }) {
  const [typingDone, setTypingDone] = useState(false);
  useEffect(() => setTypingDone(false), [slide]);

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
        className="inline-flex items-center gap-2.5 text-[0.74rem] tracking-[0.32em] uppercase text-sapphire font-bold mb-6"
      >
        <span className="block w-9 h-px bg-sapphire" />
        {slide.eyebrow}
      </motion.span>

      <h1 className="font-display font-medium text-ink tracking-tight max-w-[680px] min-h-[2.1em] mb-7" style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)', lineHeight: 1.04 }}>
        <TypingHeadline prefix={slide.prefix} em={slide.em} suffix={slide.suffix} onDone={handleTypingDone} />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="lead max-w-[540px] mb-9"
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
          className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-[0.92rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all"
        >
          {slide.cta.label}
          <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to={slide.ctaSecondary.to}
          className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-[0.92rem] border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 transition-all"
        >
          {slide.ctaSecondary.label}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-9 flex items-center gap-2.5 text-sm text-muted"
      >
        <ShieldCheck size={17} className="text-sapphire" />
        Gemologist-verified · Ethically sourced · Trusted by 100+ dealers worldwide
      </motion.div>
    </motion.div>
  );
}

function HeroVisual({ slide, slideKey }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[660px] aspect-square lg:aspect-auto lg:max-h-[min(64vh,520px)] flex items-center justify-center">
      {/* Rotating sapphire gemstone video */}
      <div className="relative w-full max-w-[780px]" style={{ perspective: '1200px' }}>
        <motion.div
          animate={reduce ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChromaKeyVideo
            src={gemVideo}
            className="w-full h-auto select-none pointer-events-none"
            cropBottom={0.15}
          />
        </motion.div>
      </div>

      {/* Framed slide photo (preserves the original imagery / content) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideKey}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute -bottom-4 -left-14 sm:-left-34 w-[46%] max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden shadow-deep ring-4 ring-white/90"
        >
          <motion.img
            src={slide.image}
            alt={slide.tag}
            loading="eager"
            initial={{ scale: 1 }}
            animate={reduce ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 9, ease: 'linear' }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2.5 left-2.5 right-2.5 inline-flex items-center gap-2 glass px-3 py-2 rounded-full text-[0.62rem] font-bold tracking-[0.12em] uppercase text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-sapphire ring-4 ring-sapphire/20" />
            {slide.tag}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

/* ---- Chroma-key (green screen removal) video player ---- */

function ChromaKeyVideo({ src, className = '', cropBottom = 0 }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const processFrame = () => {
      if (video.paused || video.ended) {
        rafRef.current = requestAnimationFrame(processFrame);
        return;
      }

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) {
        rafRef.current = requestAnimationFrame(processFrame);
        return;
      }

      // Crop bottom portion to remove watermark
      const cropH = Math.floor(vh * (1 - cropBottom));

      if (canvas.width !== vw || canvas.height !== cropH) {
        canvas.width = vw;
        canvas.height = cropH;
      }

      // Draw only the top portion (excluding bottom crop)
      ctx.drawImage(video, 0, 0, vw, cropH, 0, 0, vw, cropH);

      const frame = ctx.getImageData(0, 0, vw, cropH);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Convert RGB to HSL for reliable green detection across all brightness levels
        const rn = r / 255;
        const gn = g / 255;
        const bn = b / 255;
        const max = Math.max(rn, gn, bn);
        const min = Math.min(rn, gn, bn);
        const delta = max - min;
        const lightness = (max + min) / 2;

        let hue = 0;
        let saturation = 0;

        if (delta > 0) {
          saturation = delta / (1 - Math.abs(2 * lightness - 1));
          if (max === gn) {
            hue = 60 * (((bn - rn) / delta) % 6);
          } else if (max === rn) {
            hue = 60 * (((gn - bn) / delta) % 6);
          } else {
            hue = 60 * (((rn - gn) / delta) + 4);
          }
          if (hue < 0) hue += 360;
        }

        // Green hue range: ~60° to ~170° covers all greens
        const isGreenHue = hue >= 55 && hue <= 175;

        if (isGreenHue && saturation > 0.15) {
          data[i + 3] = 0;
        } else if (isGreenHue && saturation > 0.05) {
          const alpha = Math.max(0, Math.min(255, ((0.15 - saturation) / 0.10) * 255));
          data[i + 3] = alpha;
          data[i + 1] = Math.min(g, Math.max(r, b) + 5);
        } else {
          const greenExcess = g - Math.max(r, b);
          if (greenExcess > 15) {
            data[i + 3] = 0;
          } else if (greenExcess > 5) {
            const alpha = Math.max(0, Math.min(255, 255 - ((greenExcess - 5) / 10) * 255));
            data[i + 3] = alpha;
            data[i + 1] = Math.min(g, Math.max(r, b) + 5);
          }
        }
      }

      ctx.putImageData(frame, 0, 0);
      rafRef.current = requestAnimationFrame(processFrame);
    };

    const handlePlay = () => {
      rafRef.current = requestAnimationFrame(processFrame);
    };

    const startVideo = () => {
      video.play().catch(() => { });
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('loadeddata', startVideo);
    video.addEventListener('canplay', startVideo);

    // Try to play immediately in case already loaded
    if (video.readyState >= 2) {
      video.play().catch(() => { });
    }
    if (!video.paused) {
      rafRef.current = requestAnimationFrame(processFrame);
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadeddata', startVideo);
      video.removeEventListener('canplay', startVideo);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cropBottom]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', overflow: 'hidden' }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 'auto', display: 'block', imageRendering: 'auto' }}
      />
    </div>
  );
}

function TypingHeadline({ prefix, em, suffix, onDone }) {
  const full = prefix + em + suffix;
  const [charIndex, setCharIndex] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
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
  }, [full]);

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

