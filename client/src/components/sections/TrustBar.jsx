import { trustMarks } from '@/data/company';

/* Slim navy marquee of trust marks — sits directly beneath the hero. */
export default function TrustBar() {
  const row = [...trustMarks, ...trustMarks];
  return (
    <section className="bg-ink py-3.5 overflow-hidden border-y border-ink-line">
      <div className="relative flex">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap motion-reduce:animate-none">
          {row.map((mark, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2.5 text-white/70 text-xs font-semibold tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-electric" />
              {mark}
            </span>
          ))}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>
    </section>
  );
}
