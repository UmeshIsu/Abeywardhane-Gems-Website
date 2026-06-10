import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-cream overflow-hidden">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1} className="h-full">
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ image, tag, title, description, slug }) {
  return (
    <Link
      to={slug}
      className="group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-2xl bg-white border border-line hover:border-transparent hover:-translate-y-2 hover:shadow-deep transition-all duration-500"
    >
      {/* Image header */}
      <div className="relative h-52 lg:h-56 overflow-hidden shrink-0">
        <img
          src={image}
          alt={title.replace('\n', ' ')}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6 pb-7">
        <div className="text-[0.7rem] tracking-[0.25em] uppercase text-sapphire font-semibold mb-2">
          {tag}
        </div>
        <h3 className="font-display text-xl font-semibold text-ink leading-tight mb-2.5 whitespace-pre-line">
          {title}
        </h3>
        <p className="text-xs text-muted flex-1 mb-5">
          {description}
        </p>
        <span className="self-start w-9 h-9 rounded-full bg-tint text-sapphire grid place-items-center transition-all duration-500 group-hover:bg-sapphire group-hover:text-white group-hover:rotate-[-45deg]">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
