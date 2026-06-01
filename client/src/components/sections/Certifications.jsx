import Reveal from '@/components/ui/Reveal';
import { certifications } from '@/data/company';

/* Luxury trust section: certification & quality-assurance pillars. */
export default function Certifications() {
  return (
    <section className="py-20 lg:py-24 bg-cream">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal><span className="eyebrow justify-center">Certification & Assurance</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title mb-5">Confidence, <em>documented</em>.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead">
              Trust in fine gemstones is built on proof. Every stone we trade is backed by rigorous, independent assurance — from origin to grading.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl bg-white border border-line p-7 overflow-hidden hover:shadow-card hover:-translate-y-1.5 transition-all duration-500">
                <span className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-sapphire-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-ink text-white grid place-items-center mb-5 group-hover:bg-sapphire transition-colors duration-500">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2.5 leading-tight">{title}</h3>
                  <p className="text-ink-soft leading-relaxed text-[0.85rem]">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
