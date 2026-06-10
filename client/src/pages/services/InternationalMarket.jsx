import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe2,
  Award as AwardIcon,
  Calendar,
  MapPin,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Reveal from '@/components/ui/Reveal';
import { whatsappHref } from '@/lib/whatsapp';
import { exhibitions } from '@/data/exhibitions';
import SEO from '@/components/layout/SEO';
import { graph, serviceSchema } from '@/lib/seo';

/* =========================================================
 *  ✏️  HOW TO ADD AWARD PHOTOS
 * =========================================================
 *  Award photos live in:
 *    client/src/assets/images/services/international-market/awards/
 *  Suggested names: award-1.jpg, award-2.jpg, ...
 *  Then uncomment the matching `import` lines below and the
 *  `src={...}` line on each <ImagePlaceholder>.
 *
 *  (Exhibition photos are managed in src/data/exhibitions.js.)
 * ========================================================= */

// --- Award photo imports ---
// import award1 from '@/assets/images/services/international-market/awards/award-1.jpg';
// import award2 from '@/assets/images/services/international-market/awards/award-2.jpg';
// import award3 from '@/assets/images/services/international-market/awards/award-3.jpg';

/* ---------- Data: edit dates/locations/titles freely ---------- */
const awards = [
  {
    label: 'Award photo',
    filename: 'award-1.jpg',
    // src: award1,
    title: 'Excellence in Ethical Sourcing',
    issuer: 'Sri Lanka Gem & Jewellery Association',
    year: '2024',
  },
  {
    label: 'Award photo',
    filename: 'award-2.jpg',
    // src: award2,
    title: 'Export Quality Recognition',
    issuer: 'National Gem & Jewellery Authority',
    year: '2023',
  },
  {
    label: 'Award photo',
    filename: 'award-3.jpg',
    // src: award3,
    title: 'Outstanding International Trade',
    issuer: 'Ceylon Chamber of Commerce',
    year: '2022',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Market Research and Analysis',
    body: 'Identify trends, demand, and pricing in different international markets to strategically position gemstone offerings.',
  },
  {
    num: '02',
    title: 'Building Buyer Networks',
    body: 'Establish connections with reliable buyers across various regions to ensure consistent sales and market penetration.',
  },
  {
    num: '03',
    title: 'Transaction Management',
    body: 'Oversee the entire transaction process, including payments, logistics, and customs, to ensure smooth and efficient operations.',
  },
  {
    num: '04',
    title: 'Post-Sale Support',
    body: 'Provide ongoing support to buyers after the sale, including appraisals, certification, and customer service to maintain satisfaction.',
  },
];

const reachStats = [
  { value: '5+', label: 'Continents reached' },
  { value: '100+', label: 'International buyers' },
  { value: '12', label: 'Trade fairs attended' },
  { value: '8+', label: 'Industry awards' },
];

export default function InternationalMarket() {
  return (
    <>
      <SEO
        title="International Gem Market Coordination & Wholesale Buyers"
        description="We connect international wholesale buyers, retailers and collectors with certified Sri Lankan gemstones through global gem exhibitions — JCK Las Vegas, Hong Kong, FACETS Sri Lanka and more."
        path="/services/international-market"
        schema={graph(serviceSchema({ name: 'Coordinating the International Gem Market', description: 'Connecting global wholesale buyers, retailers and collectors with certified Sri Lankan gemstones.', path: '/services/international-market' }))}
      />
      <PageHeader
        eyebrow="Services"
        title="Coordinating International Gem Market and Buyers"
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Marketing' },
          { label: 'Coordinating International Gem Market and Buyers' },
        ]}
      />

      {/* ===================== INTRO ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="grid lg:grid-cols-[100px_1fr] gap-6 lg:gap-10 items-start max-w-5xl mb-12">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-sapphire-light grid place-items-center font-display text-3xl lg:text-4xl text-sapphire font-medium leading-none shrink-0">
                O
              </div>
              <p className="text-sm text-ink-soft leading-[1.75]">
                <span className="font-display text-lg text-ink">ur global reach</span> is one of the cornerstones of our success in the gem market. We have developed an extensive network of buyers that spans across multiple continents, allowing us to connect with a diverse range of markets. This network is comprised of well-established wholesalers, retailers, and private collectors who are recognized leaders in their respective regions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-5xl space-y-5 text-ink-soft leading-[1.8] lg:pl-[140px]">
              <p>
                Through continuous market research and analysis, we stay ahead of identifying which gemstones are in demand in specific markets. For instance, while certain regions might prefer sapphires, others may have a higher demand for rubies or emeralds. By understanding these preferences, we can strategically position our gemstones in the most lucrative markets, ensuring that our products are always in demand and sold at optimal prices.
              </p>
              <p>
                Moreover, our insights into market dynamics enable us to anticipate shifts in buyer preferences and adjust our offerings accordingly. This proactive approach not only maximizes the value of our gemstones but also ensures that we remain competitive in an ever-changing industry.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== 4-STEP PROCESS ===================== */}
      <section className="pb-20 lg:pb-24 bg-white">
        <div className="container-x">
          <ProcessSteps />
        </div>
      </section>

      {/* ===================== RELIABILITY AND TRUST ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-4xl mb-10">
              <span className="eyebrow">Why Buyers Choose Us</span>
              <h2 className="section-title">Reliability and <em>Trust</em></h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-w-6xl">
            <Reveal delay={0.05}>
              <div className="space-y-5 text-ink-soft text-sm leading-[1.8]">
                <p>
                  In the gem industry, reliability and trust are crucial. We recognize that our clients need assurance that they are dealing with a reputable and dependable partner. This is why we place such a strong emphasis on building and maintaining trustworthy relationships with our buyers.
                </p>
                <p>
                  From the moment we establish contact, we are committed to transparency in all our dealings. This means clear communication, honest appraisals, and adherence to international standards of gemstone certification and ethical sourcing. Every transaction is meticulously managed to ensure that both parties are fully satisfied with the terms and outcomes.
                </p>
                <p>
                  We understand that purchasing gemstones, especially in the international market, involves significant investments. Therefore, we go the extra mile to provide secure payment options and handle all logistics with precision, ensuring that our clients receive their orders without any complications. Our goal is to make every transaction smooth, secure, and beneficial for our buyers, fostering long-term partnerships based on mutual trust and respect.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 self-start lg:sticky lg:top-32">
                {reachStats.map(({ value, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-6 lg:p-7 border border-line">
                    <div className="font-display text-2xl lg:text-3xl text-sapphire font-medium leading-none mb-2">
                      {value}
                    </div>
                    <div className="text-xs text-ink-soft font-medium">{label}</div>
                  </div>
                ))}
                <div className="col-span-2 bg-ink text-white rounded-2xl p-6 lg:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center text-gold">
                      <Globe2 size={20} />
                    </div>
                    <div className="text-xs tracking-[0.25em] uppercase text-gold font-semibold">
                      Global Footprint
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    From Asia to Europe and North America, Abeywardhane Gems is a trusted Sri Lankan partner for serious collectors and trade houses worldwide.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== INTERNATIONAL EXHIBITIONS GALLERY ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">On the World Stage</span>
              <h2 className="section-title mb-5">International Gem <em>Exhibitions</em></h2>
              <p className="text-ink-soft text-sm">
                Abeywardhane Gems proudly represents Sri Lanka at leading gem and jewellery exhibitions around the world. These events let us showcase Ceylon's finest stones and build lasting relationships with serious buyers from every continent.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 max-w-3xl">
            {exhibitions.map((ex, i) => (
              <Reveal key={ex.filename} delay={i * 0.08}>
                <ExhibitionCard {...ex} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AWARDS & RECOGNITION ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <AwardIcon size={22} className="text-gold" strokeWidth={1.8} />
                <span className="text-xs tracking-[0.35em] uppercase text-gold font-bold">Recognition</span>
              </div>
              <h2 className="section-title mb-5">Awards <em>& Honours</em></h2>
              <p className="text-ink-soft text-sm">
                Years of dedication to ethical sourcing, quality, and international trade have earned us recognition from leading industry bodies — a reflection of the trust our partners place in us.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {awards.map((aw, i) => (
              <Reveal key={aw.filename} delay={i * 0.1}>
                <AwardCard {...aw} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-ink text-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <Reveal>
              <div>
                <div className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4">
                  Partner With Us
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight mb-3">
                  Looking for a trusted Sri Lankan gem partner?
                </h2>
                <p className="text-white/70 max-w-xl text-sm">
                  Whether you're a wholesaler, retailer or private collector, get in touch and we'll find the right stones for your market.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-white text-ink hover:bg-cream transition-all"
                >
                  Contact Us <ArrowRight size={16} strokeWidth={2.4} />
                </Link>
                <a
                  href={whatsappHref("Hi! I'm interested in your international gem trade services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-white/25 text-white hover:bg-white/10 transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- sub-components ---------- */

function ProcessSteps() {
  // Blue highlight follows the hovered card; defaults to the first and snaps
  // back to it when the pointer leaves the row.
  const [active, setActive] = useState(0);

  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-line"
      onMouseLeave={() => setActive(0)}
    >
      {processSteps.map((step, i) => (
        <Reveal key={step.num} delay={i * 0.08}>
          <ProcessCard step={step} highlighted={i === active} onHover={() => setActive(i)} />
        </Reveal>
      ))}
    </div>
  );
}

function ProcessCard({ step, highlighted, onHover }) {
  const base =
    'h-full p-6 lg:p-8 border-b border-r border-line transition-colors duration-300 cursor-default';
  const colour = highlighted
    ? 'bg-sapphire text-white border-sapphire'
    : 'bg-white text-ink';

  return (
    <div className={`${base} ${colour}`} onMouseEnter={onHover}>
      <div className={`font-display text-3xl lg:text-4xl font-medium mb-3 transition-colors duration-300 ${highlighted ? 'text-white/90' : 'text-ink/70'}`}>
        {step.num}
      </div>
      <h3 className={`font-display text-lg font-semibold mb-2 transition-colors duration-300 ${highlighted ? 'text-white' : 'text-ink'}`}>
        {step.title}
      </h3>
      <p className={`text-xs leading-relaxed transition-colors duration-300 ${highlighted ? 'text-white/85' : 'text-ink-soft'}`}>
        {step.body}
      </p>
    </div>
  );
}

function ExhibitionCard({ src, label, filename, title, location, year }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-500">
      <ImagePlaceholder src={src} label={label} filename={filename} aspect="4/3" className="rounded-none" />
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
          <Calendar size={12} />
          <span>{year}</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink leading-tight mb-1.5 group-hover:text-sapphire transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-ink-soft">
          <MapPin size={13} className="text-sapphire shrink-0" />
          <span>{location}</span>
        </div>
      </div>
    </article>
  );
}

function AwardCard({ src, label, filename, title, issuer, year }) {
  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-500">
      <div className="relative">
        <ImagePlaceholder src={src} label={label} filename={filename} aspect="4/3" className="rounded-none" />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold text-white grid place-items-center shadow-lg">
          <AwardIcon size={22} strokeWidth={1.8} />
        </div>
      </div>
      <div className="p-6">
        <div className="text-xs tracking-[0.2em] uppercase text-gold font-bold mb-2">
          {year}
        </div>
        <h3 className="font-display text-lg font-semibold text-ink leading-tight mb-2 group-hover:text-sapphire transition-colors">
          {title}
        </h3>
        <p className="text-xs text-ink-soft">{issuer}</p>
      </div>
    </article>
  );
}
