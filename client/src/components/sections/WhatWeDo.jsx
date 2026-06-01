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
      className="py-20 lg:py-24 relative"
      style={{
        background:
          'radial-gradient(1200px 600px at 90% -10%, #e8edff 0%, transparent 60%), #fff',
      }}
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div ref={ref}>
            <Reveal><span className="eyebrow">What We Do</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title mb-5">
                Bringing Ceylon's <em>brilliance</em> to the world's finest collectors.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[0.95rem] text-ink-soft max-w-xl mb-6">
                We are Abeywardana Gems — exposing Ceylon's gems to the global market, arranging immersive gem tourism in Sri Lanka, designing bespoke jewellery on request, and championing the very best value for every Ceylon stone we touch.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Button to="/services" variant="dark">Find Out More</Button>
            </Reveal>

            <div className="mt-10 pt-10 border-t border-line grid sm:grid-cols-2 gap-8">
              <Stat value={carats} target={572} label="Carats of rough gems" sub="Over the last 2 years" />
              <Stat value={dealers} target={100} label="Dealers worldwide" sub="Who trusted us" />
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-deep group">
              <img
                src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=900&q=80"
                alt="Hand-cut Ceylon sapphire"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <span className="block w-6 h-px bg-gold mb-2" />
                <span className="font-display italic text-lg">Cut & polished<br />in Sri Lanka</span>
              </div>

              <div className="absolute top-5 -right-3 sm:right-5 lg:-right-5 bg-white px-4 py-3 rounded-xl shadow-card flex items-center gap-2.5 max-w-[210px]">
                <div className="w-9 h-9 rounded-full bg-sapphire-light grid place-items-center text-sapphire shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <strong className="block text-xs text-ink">Certified Authentic</strong>
                  <span className="text-[0.68rem] text-muted">Gemologist verified</span>
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
      <div className="font-display font-medium text-4xl lg:text-5xl leading-none text-sapphire flex items-start gap-1">
        <span>{value}</span>
        <sup className="text-[0.45em] font-semibold mt-2">+</sup>
      </div>
      <div className="mt-3 font-semibold text-ink">{label}</div>
      <div className="text-sm text-muted">{sub}</div>
    </div>
  );
}
