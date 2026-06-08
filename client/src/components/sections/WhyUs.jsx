import Reveal from '@/components/ui/Reveal';
import { differentiators } from '@/data/company';

/* "Why international buyers choose us" — credibility differentiators. */
export default function WhyUs() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <Reveal><span className="eyebrow">Why Abeywardhane</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">
                A partner the world's finest<br />buyers <em>trust</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="lead max-w-md">
              We pair the heritage of Ceylon's gem trade with the rigour, transparency and reach that international clients expect.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentiators.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-cream/50 p-6 hover:bg-white hover:border-transparent hover:shadow-card hover:-translate-y-1.5 transition-all duration-500">
                <div className="w-[2.75rem] h-[2.75rem] rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-5 group-hover:bg-sapphire group-hover:text-white transition-colors duration-500">
                  <Icon size={20} strokeWidth={1.7} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-2.5 leading-tight">{title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
