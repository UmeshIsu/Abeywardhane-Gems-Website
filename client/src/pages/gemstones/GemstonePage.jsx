import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Gem, ChevronDown, Check } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import CtaBand from '@/components/sections/CtaBand';
import InquirySection from '@/components/sections/InquirySection';
import Picture from '@/components/ui/Picture';
import { whatsappHref } from '@/lib/whatsapp';
import { gemstoneBySlug } from '@/data/gemstones';
import { graph, productSchema, faqSchema } from '@/lib/seo';

/**
 * Renders a single gemstone money page from src/data/gemstones.js.
 * Usage in routes:  <GemstonePage slug="ceylon-blue-sapphire" />
 */
export default function GemstonePage({ slug }) {
  const gem = gemstoneBySlug[slug];
  if (!gem) return null; // route table only references valid slugs

  const path = `/${gem.slug}`;
  const schema = graph(
    productSchema(
      { name: gem.name, description: gem.tagline, image: gem.image, tag: gem.tag },
      { path },
    ),
    faqSchema(gem.faqs),
  );

  const related = (gem.related || [])
    .map((s) => gemstoneBySlug[s])
    .filter(Boolean);

  return (
    <>
      <SEO
        title={gem.seoTitle}
        description={gem.metaDescription}
        path={path}
        image={gem.image}
        imageAlt={`Natural ${gem.name} from Sri Lanka: Abeywardhane Gems`}
        schema={schema}
      />
      <PageHeader
        eyebrow="Ceylon Gemstones"
        title={gem.h1}
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Gemstones', to: '/gallery' },
          { label: gem.name },
        ]}
      />

      {/* ===================== HERO / INTRO ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-sapphire-light/60 blur-2xl -z-10" />
              <Picture
                src={gem.image}
                alt={`Natural ${gem.name}, certified Ceylon gemstone from Sri Lanka`}
                width="800"
                height="800"
                className="w-full aspect-square object-cover rounded-3xl shadow-card"
                loading="eager"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-sapphire shadow-soft">
                <Gem size={13} /> {gem.tag}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">Natural · Certified · Ceylon</span>
              <h2 className="section-title mb-4">{gem.tagline}</h2>
              <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                {gem.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Highlight chips */}
              <dl className="grid grid-cols-2 gap-3 mt-8">
                {gem.highlights.map((h) => (
                  <div key={h.label} className="rounded-2xl border border-line bg-cream/60 px-4 py-3">
                    <dt className="text-[0.68rem] tracking-[0.18em] uppercase text-muted font-semibold">{h.label}</dt>
                    <dd className="text-ink font-semibold text-sm mt-0.5">{h.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all"
                >
                  Enquire about {gem.name}
                  <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappHref(`Hi! I'm interested in a ${gem.name}. Could you share certified options?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SPECS + WHY FAMOUS ===================== */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="container-x grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Gemmological Profile</span>
              <h2 className="section-title mb-6">{gem.name} <em>at a glance</em></h2>
              <dl className="rounded-2xl border border-line bg-white overflow-hidden">
                {gem.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between gap-4 px-5 py-3.5 text-sm ${i % 2 ? 'bg-cream/50' : 'bg-white'}`}
                  >
                    <dt className="text-ink-soft">{s.label}</dt>
                    <dd className="text-ink font-semibold text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="eyebrow">Heritage & Demand</span>
              <h2 className="section-title mb-5">{gem.whyFamous.heading}</h2>
              <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                {gem.whyFamous.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== BUYING GUIDE ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">How to Buy</span>
              <h2 className="section-title mb-4">Buying guide: choosing a <em>{gem.name}</em></h2>
              <p className="lead">
                A simple framework for evaluating quality, our gemologists are happy to guide you through real, certified options matched to your needs.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gem.buyingGuide.map((b, i) => (
              <Reveal key={b.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-cream/50 p-6 hover:bg-white hover:shadow-card transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-sapphire-light text-sapphire grid place-items-center font-display text-lg mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{b.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CERTIFICATION + PRICING ===================== */}
      <section className="py-14 sm:py-20 bg-ink text-white">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-electric font-bold mb-4">
                <ShieldCheck size={15} /> Certification & Authenticity
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium mb-4">Buy with documented confidence.</h2>
              <p className="text-white/70 leading-[1.8] text-sm">{gem.certification}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 mt-6 text-frost font-semibold text-sm hover:gap-3 transition-all">
                Request a certified stone <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-electric font-bold mb-4">
                <Award size={15} /> What Drives the Price
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-medium mb-4">Understanding value.</h2>
              <p className="text-white/70 leading-[1.8] text-sm mb-5">{gem.pricing.body}</p>
              <ul className="space-y-2.5">
                {gem.pricing.factors.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="w-5 h-5 rounded-full bg-sapphire/30 grid place-items-center shrink-0">
                      <Check size={12} className="text-frost" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center mb-10">
              <span className="eyebrow justify-center">Questions & Answers</span>
              <h2 className="section-title">{gem.name} <em>FAQs</em></h2>
            </div>
          </Reveal>
          <div className="divide-y divide-line border-y border-line">
            {gem.faqs.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 font-semibold text-ink hover:text-sapphire transition-colors">
                  <span>{f.q}</span>
                  <ChevronDown size={18} className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 -mt-1 text-sm text-ink-soft leading-[1.8]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <InquirySection
        subject={gem.name}
        heading={`Enquire about ${gem.name}`}
        blurb={`Tell us your requirements for ${gem.name.toLowerCase()}, colour, size, treatment and budget, and our gemologists will reply with matched, certified options and transparent pricing.`}
        whatsappMessage={`Hi! I'm interested in a ${gem.name}. Could you share certified options?`}
      />

      {/* ===================== RELATED GEMS + COMMERCIAL LINKS ===================== */}
      {related.length > 0 && (
        <section className="py-14 sm:py-20 bg-cream">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <span className="eyebrow">Explore More</span>
                  <h2 className="section-title">Related Ceylon <em>gemstones</em></h2>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link to="/wholesale-gemstones-sri-lanka" className="font-semibold text-sapphire hover:underline">Wholesale supply →</Link>
                  <Link to="/gem-export-services" className="font-semibold text-sapphire hover:underline">Gem export →</Link>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 4) * 0.08}>
                  <Link
                    to={`/${r.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden">
                      <Picture
                        src={r.image}
                        alt={`${r.name}, Ceylon gemstone`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-[0.62rem] tracking-[0.2em] uppercase text-muted font-semibold mb-1">{r.tag}</div>
                      <div className="font-display font-semibold text-ink group-hover:text-sapphire transition-colors leading-tight">{r.name}</div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
