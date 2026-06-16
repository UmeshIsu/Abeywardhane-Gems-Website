import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, FileCheck, PackageCheck, Plane, Globe2, BadgeCheck, ScrollText,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import CtaBand from '@/components/sections/CtaBand';
import InquirySection from '@/components/sections/InquirySection';
import { whatsappHref } from '@/lib/whatsapp';
import { markets } from '@/data/company';
import { gemstoneLinks } from '@/data/gemstones';
import { graph, serviceSchema, faqSchema } from '@/lib/seo';

const steps = [
  { icon: BadgeCheck, title: 'Selection & evaluation', body: 'Our gemologists hand-select stones to your specification — variety, colour, clarity, size and budget — and evaluate each one against documented quality standards.' },
  { icon: FileCheck, title: 'Independent certification', body: 'Stones are submitted to internationally recognised laboratories for grading and, where required, origin and treatment reports — so your buyers receive objective documentation.' },
  { icon: ScrollText, title: 'Export documentation', body: 'We prepare the paperwork for a smooth, compliant export — invoices, certification and the declarations your customs authority requires.' },
  { icon: PackageCheck, title: 'Secure, insured packaging', body: 'Every consignment is sealed, insured and tracked, with discreet, tamper-evident packaging built for high-value gemstones.' },
  { icon: Plane, title: 'Worldwide delivery', body: 'We ship via trusted secure-logistics partners to destinations across four continents, with end-to-end tracking and proof of delivery.' },
];

const capabilities = [
  'Single certified stones and matched parcels',
  'Calibrated commercial goods in volume',
  'Bespoke sourcing to a buyer’s brief',
  'Ceylon sapphires, rubies and rare gems',
  'Treatment & origin disclosure on every stone',
  'Long-term supply partnerships',
];

const faqs = [
  { q: 'Do you export gemstones worldwide?', a: 'Yes. We are a Sri Lanka–based gem export company shipping certified Ceylon gemstones to buyers, jewellers and trade partners across Europe, the Middle East, Asia Pacific and the Americas with secure, insured logistics.' },
  { q: 'Are your exported gemstones certified?', a: 'Yes. We supply stones with reports from internationally recognised gemmological laboratories confirming species, treatment status and, where relevant, origin indication.' },
  { q: 'Can you handle export documentation and customs?', a: 'We prepare the commercial invoices, certification and declarations needed for a compliant export and work with established secure-logistics partners experienced in high-value shipments.' },
  { q: 'What is the minimum order for export?', a: 'We work with both single high-value stones and volume parcels. Tell us your requirements and we will propose a sourcing and supply plan that fits.' },
  { q: 'How are high-value gemstones shipped safely?', a: 'Consignments are fully insured, discreetly and securely packaged, and tracked end-to-end via trusted couriers specialising in precious goods.' },
  { q: 'Can you supply gemstones on an ongoing basis?', a: 'Absolutely. Many of our clients are repeat trade buyers; we build long-term supply relationships with consistent quality and transparent pricing.' },
];

export default function GemExportServices() {
  const schema = graph(
    serviceSchema({
      name: 'Ceylon Gemstone Export Services',
      description: 'Certified Ceylon gemstone sourcing, certification, documentation and secure worldwide export from Sri Lanka.',
      path: '/gem-export-services',
    }),
    faqSchema(faqs),
  );

  return (
    <>
      <SEO
        title="Gem Export Services — Certified Ceylon Gemstone Exporters, Sri Lanka"
        description="Abeywardhane Gems is a Sri Lanka–based gem export company. Certified Ceylon sapphire, ruby & gemstone sourcing, gemological certification, export documentation and secure worldwide shipping for trade buyers."
        path="/gem-export-services"
        schema={schema}
      />
      <PageHeader
        eyebrow="For Trade & International Buyers"
        title="Ceylon Gemstone Export Services"
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Gem Export Services' },
        ]}
      />

      {/* INTRO */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div>
              <span className="eyebrow">Direct From the Source</span>
              <h2 className="section-title mb-5">A certified Sri Lankan <em>gem export</em> partner.</h2>
              <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                <p>
                  Abeywardhane Gems exports natural, certified Ceylon gemstones from the heart of Sri Lanka’s gem country to buyers, jewellery brands and trade partners around the world. Working directly with verified mining sources, we remove the middlemen between the mine and your business — for better stones, honest provenance and transparent pricing.
                </p>
                <p>
                  From a single investment-grade sapphire to recurring commercial parcels, every export is handled with gemological rigour, full documentation and secure, insured logistics. The result is a supply partner international buyers can rely on, shipment after shipment.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all">
                  Start an export enquiry
                  <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={whatsappHref('Hi! I would like to discuss exporting Ceylon gemstones.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 transition-all">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-2xl border border-line bg-cream/50 px-5 py-4">
                  <ShieldCheck size={18} className="text-sapphire mt-0.5 shrink-0" />
                  <span className="text-sm text-ink font-medium">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* EXPORT PROCESS */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">How Export Works</span>
              <h2 className="section-title mb-4">From mine to your market, <em>handled end to end</em>.</h2>
              <p className="lead">A transparent, five-step process designed around the needs of international trade buyers.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={(i % 5) * 0.07}>
                <div className="h-full rounded-2xl bg-white border border-line p-6 hover:shadow-card transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <s.icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="text-[0.62rem] tracking-[0.2em] uppercase text-muted font-semibold mb-1">Step {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-semibold text-ink mb-2 text-sm">{s.title}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <Globe2 size={20} className="text-sapphire" />
              <h2 className="section-title">Trusted across <em>four continents</em></h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {markets.map((m, i) => (
              <Reveal key={m.region} delay={(i % 4) * 0.08}>
                <div className="rounded-2xl border border-line bg-cream/50 p-6">
                  <div className="font-display text-xl text-ink mb-1">{m.region}</div>
                  <div className="text-sm text-ink-soft">{m.cities}</div>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Internal links to the gem money pages */}
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted font-semibold mr-1">Export-ready gemstones:</span>
              {gemstoneLinks.map((g) => (
                <Link key={g.slug} to={g.to} className="px-3 py-1.5 rounded-full border border-line bg-white text-ink hover:border-sapphire hover:text-sapphire transition-colors font-medium">
                  {g.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <InquirySection
        subject="Gem export enquiry"
        heading="Start an export enquiry"
        blurb="Tell us what you need to source and where it’s headed — our team will reply with certified options, documentation guidance and secure shipping details."
        whatsappMessage="Hi! I would like to discuss exporting Ceylon gemstones."
      />

      {/* FAQ */}
      <FaqSection title="Gem export FAQs" faqs={faqs} />

      <CtaBand />
    </>
  );
}

/* Shared FAQ block (native <details> — crawlable, accessible, no JS needed). */
export function FaqSection({ title, faqs }) {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-cream">
      <div className="container-x max-w-3xl">
        <Reveal>
          <div className="text-center mb-10">
            <span className="eyebrow justify-center">Questions & Answers</span>
            <h2 className="section-title">{title}</h2>
          </div>
        </Reveal>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 font-semibold text-ink hover:text-sapphire transition-colors">
                <span>{f.q}</span>
                <ArrowRight size={16} className="shrink-0 text-muted transition-transform group-open:rotate-90" />
              </summary>
              <p className="pb-5 -mt-1 text-sm text-ink-soft leading-[1.8]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
