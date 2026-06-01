import Reveal from '@/components/ui/Reveal';
import { certifications } from '@/data/company';

/* Luxury trust section: certification & quality-assurance pillars. */
export default function Certifications() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-16">
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
              <div className="group relative h-full rounded-3xl bg-white border border-line p-9 overflow-hidden hover:shadow-card hover:-translate-y-1.5 transition-all duration-500">
                <span className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-sapphire-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-ink text-white grid place-items-center mb-7 group-hover:bg-sapphire transition-colors duration-500">
                    <Icon size={24} strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ink mb-3 leading-tight">{title}</h3>
                  <p className="text-ink-soft leading-relaxed text-[0.95rem]">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
