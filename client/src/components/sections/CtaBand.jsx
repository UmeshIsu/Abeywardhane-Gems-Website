import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { whatsappHref } from '@/lib/whatsapp';

/* Closing conversion block. */
export default function CtaBand() {
  return (
    <section className="py-16 lg:py-20 bg-ink text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ background: 'radial-gradient(700px 400px at 85% 50%, rgba(37,99,235,0.4), transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-[0.08]" />
      <div className="relative container-x">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <Reveal>
            <div>
              <div className="text-xs tracking-[0.28em] uppercase text-electric font-bold mb-3">Begin a partnership</div>
              <h2 className="font-display font-medium leading-[1.1] mb-4" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)' }}>
                Source Ceylon's finest gems with <span className="italic text-frost">complete confidence</span>.
              </h2>
              <p className="text-white/70 max-w-xl text-sm">
                Whether you're buying, selling, or planning a visit to the source — talk to our gemologists. An expert opinion costs nothing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-white text-ink hover:bg-cream transition-all"
              >
                Contact Us <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappHref("Hi! I'd like to discuss sourcing Ceylon gemstones.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-white/25 text-white hover:bg-white/10 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
