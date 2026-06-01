import { Quote } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { testimonials } from '@/data/company';

/* Modern, trust-building testimonial layout. */
export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <Reveal><span className="eyebrow">In Their Words</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">Trusted across the<br /><em>global gem trade</em>.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="lead max-w-md">
              Relationships built on authenticity and transparency — the foundation of every partnership we form.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="h-full flex flex-col rounded-3xl border border-line bg-cream/50 p-8 hover:shadow-card transition-shadow duration-500">
                <Quote size={34} className="text-sapphire/30 mb-5" />
                <blockquote className="font-display text-xl lg:text-[1.35rem] leading-snug text-ink flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 pt-6 border-t border-line">
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="text-sm text-muted">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
