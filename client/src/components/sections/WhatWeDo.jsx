import { useEffect, useRef, useState } from 'react';
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
      className="py-14 sm:py-20 lg:py-24 relative"
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
                We are Abeywardhane Gems — exposing Ceylon's gems to the global market, arranging immersive gem tourism in Sri Lanka, designing bespoke jewellery on request, and championing the very best value for every Ceylon stone we touch.
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
                src="/team.jpg"
                alt="The Abeywardhane Gems team representing Ceylon at an international gem fair"
                className="w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <span className="block w-6 h-px bg-gold mb-2" />
                <span className="font-display italic text-lg">Showcasing Ceylon<br />to the world</span>
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
