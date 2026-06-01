import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-24 bg-cream overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-10">
          <div>
            <Reveal><span className="eyebrow">Our Services</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">
                A complete journey<br />through the world of <em>Ceylon gems</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-muted max-w-md text-sm">
              From sourcing and selling to gemology education and immersive tourism — we are your partner at every step.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, tag, title, description, slug }) {
  return (
    <Link
      to={slug}
      className="group relative block bg-white rounded-2xl p-6 pb-7 border border-line hover:border-transparent hover:-translate-y-2 hover:shadow-deep transition-all duration-500 overflow-hidden min-h-[280px] flex flex-col"
    >
      {/* Gradient overlay on hover */}
      <span className="absolute inset-0 bg-gradient-to-br from-sapphire to-sapphire-deep opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col flex-1">
        <div className="w-11 h-11 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-5 group-hover:bg-white/15 group-hover:text-white transition-colors duration-500">
          <Icon size={22} strokeWidth={1.6} />
        </div>
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-muted font-semibold mb-2 group-hover:text-white/70 transition-colors duration-500">
          {tag}
        </div>
        <h3 className="font-display text-xl font-semibold text-ink leading-tight mb-2.5 whitespace-pre-line group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        <p className="text-xs text-muted flex-1 mb-5 group-hover:text-white/85 transition-colors duration-500">
          {description}
        </p>
        <span className="self-start w-9 h-9 rounded-full bg-tint text-sapphire grid place-items-center transition-all duration-500 group-hover:bg-white group-hover:text-sapphire group-hover:rotate-[-45deg]">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
