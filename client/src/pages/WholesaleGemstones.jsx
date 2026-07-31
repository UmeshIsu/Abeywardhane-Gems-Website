import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, Store, Crown, Layers, Gem, HandCoins, ShieldCheck, RefreshCw,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import CtaBand from '@/components/sections/CtaBand';
import InquirySection from '@/components/sections/InquirySection';
import { whatsappHref } from '@/lib/whatsapp';
import { gemstoneLinks } from '@/data/gemstones';
import { graph, serviceSchema, faqSchema } from '@/lib/seo';
import { FaqSection } from '@/pages/GemExportServices';

const audience = [
  { icon: Crown, title: 'Jewellery brands', body: 'Consistent, certified Ceylon stones for signature collections and bespoke commissions.' },
  { icon: Store, title: 'Retailers & boutiques', body: 'Reliable wholesale supply of sapphires and coloured gems with transparent margins.' },
  { icon: Building2, title: 'Manufacturers', body: 'Calibrated, colour-matched goods in volume for production runs.' },
  { icon: RefreshCw, title: 'Traders & dealers', body: 'Direct-from-source parcels and single stones for resale, on an ongoing basis.' },
];

const offerings = [
  { icon: Gem, title: 'Single certified stones', body: 'Investment-grade and statement gems, individually selected and independently certified.' },
  { icon: Layers, title: 'Calibrated parcels', body: 'Commercial goods matched for size, colour and clarity: ideal for production and inventory.' },
  { icon: Crown, title: 'Matched pairs & suites', body: 'Colour-matched pairs and full suites for earrings, bracelets and high-jewellery sets.' },
  { icon: ShieldCheck, title: 'Bespoke sourcing', body: 'Tell us your brief and we will source to specification: variety, colour, size and budget.' },
];

const faqs = [
  { q: 'Do you sell wholesale gemstones from Sri Lanka?', a: 'Yes. Abeywardhane Gems is a wholesale supplier of natural Ceylon gemstones, sapphires, rubies and rare stones, sourced directly from Sri Lankan mining areas for jewellers, retailers, manufacturers and traders worldwide.' },
  { q: 'What is the minimum order quantity?', a: 'We are flexible. We supply both single high-value stones and volume parcels, and tailor each arrangement to your business needs, contact us with your requirements.' },
  { q: 'Are wholesale stones certified?', a: 'Yes. Wholesale stones can be supplied with independent gemmological certification, and treatment status is disclosed on every stone.' },
  { q: 'Why buy wholesale gemstones direct from Sri Lanka?', a: 'Sourcing direct from the source removes layers of middlemen, giving you better stones, honest provenance and stronger margins, together with consistent, repeatable supply.' },
  { q: 'Can you colour-match parcels and suites?', a: 'Yes. We supply calibrated, colour-matched parcels and matched pairs or full suites for production runs and high-jewellery commissions.' },
  { q: 'Do you supply internationally?', a: 'Yes, we export wholesale gemstones worldwide with secure, insured logistics and full export documentation. See our gem export services for details.' },
];

export default function WholesaleGemstones() {
  const schema = graph(
    serviceSchema({
      name: 'Wholesale Ceylon Gemstones',
      description: 'Wholesale supply of natural, certified Ceylon gemstones direct from Sri Lanka for jewellers, retailers, manufacturers and traders.',
      path: '/wholesale-gemstones-sri-lanka',
    }),
    faqSchema(faqs),
  );

  return (
    <>
      <SEO
        title="Wholesale Gemstones Sri Lanka: Certified Ceylon Gem Supplier"
        description="Wholesale Ceylon gemstones direct from Sri Lanka. Certified natural sapphires, rubies & rare gems for jewellery brands, retailers, manufacturers and traders, single stones, calibrated parcels and bespoke sourcing, exported worldwide."
        path="/wholesale-gemstones-sri-lanka"
        schema={schema}
      />
      <PageHeader
        eyebrow="For Trade Buyers"
        title="Wholesale Gemstones: Sri Lanka"
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Wholesale Gemstones' },
        ]}
      />

      {/* INTRO */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div>
              <span className="eyebrow">Direct From Source Supply</span>
              <h2 className="section-title mb-5">Your wholesale partner for <em>certified Ceylon gemstones</em>.</h2>
              <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                <p>
                  We supply natural, certified Ceylon gemstones at wholesale to jewellery brands, retailers, manufacturers and traders around the world. Buying directly from Sri Lanka’s gem country means you skip the layers of intermediaries, for finer stones, honest provenance and pricing that protects your margins.
                </p>
                <p>
                  Whether you need a single investment grade sapphire, calibrated commercial parcels, or colour matched suites for a collection, our gemologists source and certify to your specification, and stand behind every stone with transparent disclosure and dependable, repeatable supply.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all">
                  Request a wholesale quote
                  <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={whatsappHref('Hi! I would like to discuss wholesale Ceylon gemstone supply.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-0.5 transition-all">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-ink text-white p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(500px 300px at 80% 0%, rgba(37,99,235,0.4), transparent 60%)' }} />
              <div className="relative">
                <HandCoins size={28} className="text-frost mb-4" />
                <h3 className="font-display text-2xl font-medium mb-3">Why source direct?</h3>
                <ul className="space-y-3 text-sm text-white/85">
                  <li className="flex gap-3"><span className="text-frost font-bold">01</span> No middlemen between the mine and your business</li>
                  <li className="flex gap-3"><span className="text-frost font-bold">02</span> Better stones at more competitive prices</li>
                  <li className="flex gap-3"><span className="text-frost font-bold">03</span> Verified Sri Lankan provenance, ethically sourced</li>
                  <li className="flex gap-3"><span className="text-frost font-bold">04</span> Independent certification on request</li>
                  <li className="flex gap-3"><span className="text-frost font-bold">05</span> Consistent, repeatable long term supply</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">Who We Supply</span>
              <h2 className="section-title mb-4">Built for the <em>gem & jewellery trade</em>.</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audience.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl bg-white border border-line p-6 hover:shadow-card transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <a.icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{a.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN SOURCE */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">What You Can Source</span>
              <h2 className="section-title mb-4">From single stones to <em>full collections</em>.</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-cream/50 p-6 hover:bg-white hover:shadow-card transition-all duration-300">
                  <o.icon size={22} className="text-sapphire mb-4" />
                  <h3 className="font-semibold text-ink mb-2">{o.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted font-semibold mr-1">Browse by gemstone:</span>
              {gemstoneLinks.map((g) => (
                <Link key={g.slug} to={g.to} className="px-3 py-1.5 rounded-full border border-line bg-white text-ink hover:border-sapphire hover:text-sapphire transition-colors font-medium">
                  {g.name}
                </Link>
              ))}
              <Link to="/gem-export-services" className="px-3 py-1.5 rounded-full border border-sapphire/30 bg-sapphire-light text-sapphire hover:bg-sapphire hover:text-white transition-colors font-semibold">
                Gem export services →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <InquirySection
        subject="Wholesale gemstone supply"
        heading="Request a wholesale quote"
        blurb="Share your requirements, gemstone types, qualities, quantities and target prices, and our team will prepare a wholesale proposal with certified, source direct options."
        whatsappMessage="Hi! I'd like to discuss wholesale Ceylon gemstone supply."
      />

      <FaqSection title="Wholesale gemstone FAQs" faqs={faqs} />

      <CtaBand />
    </>
  );
}
