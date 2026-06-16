import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import CtaBand from '@/components/sections/CtaBand';
import { FaqSection } from '@/pages/GemExportServices';
import { whatsappHref } from '@/lib/whatsapp';
import { localPageBySlug } from '@/data/localPages';
import { graph, localBusinessSchema, faqSchema } from '@/lib/seo';

/** Renders a local / regional authority page from src/data/localPages.js. */
export default function LocalPage({ slug }) {
  const p = localPageBySlug[slug];
  if (!p) return null;

  const path = `/${p.slug}`;
  const schema = graph(localBusinessSchema(), faqSchema(p.faqs));

  return (
    <>
      <SEO title={p.seoTitle} description={p.metaDescription} path={path} schema={schema} />
      <PageHeader
        eyebrow={p.eyebrow}
        title={p.h1}
        breadcrumb={[{ label: 'Abeywardhane Gems', to: '/' }, { label: p.name }]}
      />

      {/* INTRO + HIGHLIGHTS */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div>
              <span className="eyebrow"><MapPin size={14} className="text-sapphire" /> Sri Lanka</span>
              <h2 className="section-title mb-5">{p.tagline}</h2>
              <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                {p.intro.map((para, i) => <p key={i}>{para}</p>)}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all">
                  Make an enquiry
                  <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={whatsappHref(`Hi! I'd like to enquire about ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 transition-all">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-3">
              {p.highlights.map((h) => (
                <div key={h.label} className="rounded-2xl border border-line bg-cream/60 px-4 py-4">
                  <dt className="text-[0.68rem] tracking-[0.18em] uppercase text-muted font-semibold">{h.label}</dt>
                  <dd className="text-ink font-semibold text-sm mt-1">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* WHY-HERE SECTIONS */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="container-x max-w-4xl space-y-12">
          {p.sections.map((s, i) => (
            <Reveal key={s.heading} delay={(i % 3) * 0.06}>
              <div>
                <h2 className="section-title mb-4">{s.heading}</h2>
                <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                  {s.body.map((para, j) => <p key={j}>{para}</p>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className="py-12 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-muted font-semibold text-sm mr-1">Explore:</span>
              {p.related.map((r) => (
                <Link key={r.to} to={r.to} className="px-3.5 py-2 rounded-full border border-line bg-cream/50 text-ink hover:border-sapphire hover:text-sapphire transition-colors font-medium text-sm">
                  {r.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection title={`${p.name} — FAQs`} faqs={p.faqs} />

      <CtaBand />
    </>
  );
}
