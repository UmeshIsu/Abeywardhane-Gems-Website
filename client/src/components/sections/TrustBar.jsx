import { trustMarks } from '@/data/company';

/* Slim navy marquee of trust marks, sits directly beneath the hero. */
export default function TrustBar() {
  return (
    <section className="bg-ink-deep py-3.5 overflow-hidden border-y border-white/5">
      <div className="relative flex">
        {/* Two identical rows for a seamless infinite loop */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap motion-reduce:animate-none">
          {trustMarks.map((mark, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2.5 text-white text-xs font-semibold tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-electric" />
              {mark}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee whitespace-nowrap motion-reduce:animate-none" aria-hidden="true">
          {trustMarks.map((mark, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2.5 text-white text-xs font-semibold tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-electric" />
              {mark}
            </span>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-deep to-transparent" />
      </div>
    </section>
  );
}
