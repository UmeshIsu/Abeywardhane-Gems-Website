import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import { services } from '@/data/services';
import SEO from '@/components/layout/SEO';
import { graph, serviceSchema } from '@/lib/seo';

export default function Services() {
  const servicesSchema = graph(
    ...services.map((s) =>
      serviceSchema({
        name: s.title.replace(/\n/g, ' '),
        description: s.description,
        path: s.slug,
      }),
    ),
  );

  return (
    <>
      <SEO
        title="Ceylon Gem Services: Purchasing, Export, Gemology & Tourism"
        description="Sri Lanka gem services from Abeywardhane Gems: buying & selling certified Ceylon gemstones, international gem-market coordination, gemology internships and guided gem tourism."
        path="/services"
        schema={servicesSchema}
      />
      <PageHeader
        eyebrow="What We Offer"
        title="Our Services"
        breadcrumb={[{ label: 'Abeywardhane Gems', to: '/' }, { label: 'Services' }]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <p className="lead max-w-3xl mb-14">
              From sourcing and selling to gemology education and immersive tourism, we are your trusted partner at every step of the Ceylon gem journey.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, ...s }, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link
                  id={s.id}
                  to={s.slug}
                  className="group relative flex items-start gap-6 bg-cream/60 rounded-3xl p-8 lg:p-10 border border-line hover:bg-white hover:border-transparent hover:shadow-card hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <span className="w-16 h-16 rounded-2xl bg-white text-sapphire grid place-items-center shadow-soft shrink-0 group-hover:bg-sapphire group-hover:text-white transition-colors duration-500">
                    <Icon size={28} strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs tracking-[0.25em] uppercase text-muted font-semibold mb-2">{s.tag}</div>
                    <h2 className="font-display text-2xl lg:text-3xl font-semibold text-ink mb-3 whitespace-pre-line leading-tight group-hover:text-sapphire transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-ink-soft text-[0.95rem] leading-relaxed">{s.description}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sapphire font-semibold text-sm">
                      Explore <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
