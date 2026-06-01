import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { useCountUp } from '@/hooks/useCountUp';

export default function WhatWeDo() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const carats = useCountUp(572, { start: inView, duration: 1800 });
  const dealers = useCountUp(100, { start: inView, duration: 1800 });

  return (
    <section
      className="py-24 lg:py-32 relative"
      style={{
        background:
          'radial-gradient(1200px 600px at 90% -10%, #e8edff 0%, transparent 60%), #fff',
      }}
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-center">
          <div ref={ref}>
            <Reveal><span className="eyebrow">What We Do</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title mb-6">
                Bringing Ceylon's <em>brilliance</em> to the world's finest collectors.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[1.1rem] text-ink-soft max-w-xl mb-8">
                We are Abeywardana Gems — exposing Ceylon's gems to the global market, arranging immersive gem tourism in Sri Lanka, designing bespoke jewellery on request, and championing the very best value for every Ceylon stone we touch.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Button to="/services" variant="dark">Find Out More</Button>
            </Reveal>

            <div className="mt-14 pt-12 border-t border-line grid sm:grid-cols-2 gap-10">
              <Stat value={carats} target={572} label="Carats of rough gems" sub="Over the last 2 years" />
              <Stat value={dealers} target={100} label="Dealers worldwide" sub="Who trusted us" />
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-deep group">
              <img
                src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=900&q=80"
                alt="Hand-cut Ceylon sapphire"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div className="absolute bottom-7 left-7 text-white">
                <span className="block w-7 h-px bg-gold mb-2.5" />
                <span className="font-display italic text-xl">Cut & polished<br />in Sri Lanka</span>
              </div>

              <div className="absolute top-7 -right-4 sm:right-6 lg:-right-6 bg-white px-5 py-4 rounded-xl shadow-card flex items-center gap-3 max-w-[240px]">
                <div className="w-11 h-11 rounded-full bg-sapphire-light grid place-items-center text-sapphire shrink-0">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <strong className="block text-sm text-ink">Certified Authentic</strong>
                  <span className="text-xs text-muted">Gemologist verified</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, sub }) {
  return (
    <div>
      <div className="font-display font-medium text-5xl lg:text-6xl leading-none text-sapphire flex items-start gap-1">
        <span>{value}</span>
        <sup className="text-[0.45em] font-semibold mt-2">+</sup>
      </div>
      <div className="mt-3 font-semibold text-ink">{label}</div>
      <div className="text-sm text-muted">{sub}</div>
    </div>
  );
}
