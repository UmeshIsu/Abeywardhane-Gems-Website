import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { useCountUp } from '@/hooks/useCountUp';
import { stats, markets } from '@/data/company';

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Stat({ stat, start }) {
  const value = useCountUp(stat.value, { start, duration: 1800 });
  return (
    <div>
      <div className="font-display font-medium leading-none text-shimmer flex items-start" style={{ fontSize: 'clamp(2.6rem,5vw,3.6rem)' }}>
        <span>{value}</span>
        <span className="text-[0.5em] font-semibold mt-1">{stat.suffix}</span>
      </div>
      <div className="mt-2 font-semibold text-white text-[0.95rem]">{stat.label}</div>
      <div className="text-sm text-white/55">{stat.sub}</div>
    </div>
  );
}

/* Hub-and-spoke arcs radiating from Sri Lanka to export markets. */
function ReachGraphic() {
  const nodes = [
    { x: 70, y: 60, label: 'Europe' },
    { x: 88, y: 105, label: 'Middle East' },
    { x: 250, y: 80, label: 'Asia Pacific' },
    { x: 60, y: 150, label: 'Americas' },
  ];
  const hub = { x: 170, y: 130 };
  return (
    <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="Global export reach">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {nodes.map((n, i) => {
        const mx = (hub.x + n.x) / 2;
        const my = Math.min(hub.y, n.y) - 30;
        const d = `M ${hub.x} ${hub.y} Q ${mx} ${my} ${n.x} ${n.y}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#3B82F6" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />
            <motion.circle
              r="2.4" fill="#93b4ff"
              initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0] }} viewport={{ once: false }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
            >
              <animateMotion dur={`${2.4}s`} repeatCount="indefinite" path={d} begin={`${i * 0.5}s`} />
            </motion.circle>
            <circle cx={n.x} cy={n.y} r="3.5" fill="#fff" />
            <circle cx={n.x} cy={n.y} r="6.5" fill="none" stroke="#fff" strokeOpacity="0.25" />
            <text x={n.x} y={n.y - 11} fill="#cdd9f5" fontSize="8" textAnchor="middle" fontWeight="600">{n.label}</text>
          </g>
        );
      })}
      <circle cx={hub.x} cy={hub.y} r="26" fill="url(#hubGlow)" />
      <circle cx={hub.x} cy={hub.y} r="5" fill="#3B82F6" />
      <circle cx={hub.x} cy={hub.y} r="5" fill="none" stroke="#93b4ff" strokeWidth="1">
        <animate attributeName="r" from="5" to="18" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <text x={hub.x} y={hub.y + 18} fill="#fff" fontSize="8" textAnchor="middle" fontWeight="700">Sri Lanka</text>
    </svg>
  );
}

export default function GlobalReach() {
  const [ref, inView] = useInView(0.3);
  return (
    <section className="relative py-24 lg:py-32 bg-ink text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(800px 500px at 80% 10%, rgba(37,99,235,0.45), transparent 60%), radial-gradient(600px 400px at 0% 100%, rgba(59,130,246,0.18), transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid-faint [background-size:56px_56px] opacity-[0.08]" />

      <div className="relative container-x" ref={ref}>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center mb-16 lg:mb-20">
          <div>
            <Reveal><span className="eyebrow !text-electric before:!bg-electric">Global Reach</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-medium leading-[1.08] tracking-tight mb-6" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}>
                Ceylon gems, delivered to the<br className="hidden sm:block" /> world's <span className="italic text-frost">leading markets</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/70 text-lg max-w-xl mb-8">
                Our trading network connects Sri Lanka's finest stones to established wholesalers, retailers and collectors across four continents — moving gems securely and transparently, wherever demand is highest.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {markets.map((m) => (
                  <div key={m.region} className="flex items-start gap-3">
                    <MapPin size={18} className="text-electric mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-white">{m.region}</div>
                      <div className="text-sm text-white/55">{m.cities}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} x={30}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:p-8 backdrop-blur-sm">
              <ReachGraphic />
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 pt-12 border-t border-white/10">
          {stats.map((s) => (
            <Stat key={s.label} stat={s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
