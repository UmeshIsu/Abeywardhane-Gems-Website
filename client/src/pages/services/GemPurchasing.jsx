import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, HandCoins, Sparkles } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Reveal from '@/components/ui/Reveal';
import { whatsappHref } from '@/lib/whatsapp';
import SEO from '@/components/layout/SEO';
import { graph, serviceSchema } from '@/lib/seo';

/* =========================================================
 *  ✏️  HOW TO ADD YOUR OWN PHOTOS
 * =========================================================
 *  1. Save your photos in:
 *       client/src/assets/images/services/gem-purchasing/
 *       client/src/assets/images/services/gem-selling/
 *
 *  2. Uncomment the import lines below and update the
 *     `src={...}` props on each <ImagePlaceholder /> below.
 *
 *  Example:
 *    import purchasing1 from '@/assets/images/services/gem-purchasing/purchase-1.jpg';
 *    ...
 *    <ImagePlaceholder src={purchasing1} ... />
 * ========================================================= */

// import purchasing1 from '@/assets/images/services/gem-purchasing/purchase-1.jpg';
// import purchasing2 from '@/assets/images/services/gem-purchasing/purchase-2.jpg';
// import purchasing3 from '@/assets/images/services/gem-purchasing/purchase-3.jpg';
// import selling1    from '@/assets/images/services/gem-selling/sell-1.jpg';
// import selling2    from '@/assets/images/services/gem-selling/sell-2.jpg';
// import selling3    from '@/assets/images/services/gem-selling/sell-3.jpg';

const processSteps = [
  {
    num: '01',
    title: 'Consultation & Discovery',
    body: "We begin by understanding your specific needs, whether you're buying or selling. Our knowledgeable staff will guide you through our extensive collection or discuss the details of the gemstone you wish to sell.",
  },
  {
    num: '02',
    title: 'Evaluation & Authentication',
    body: 'For purchases, our gemologists authenticate and evaluate each gemstone to ensure it meets our quality standards. For sellers, we conduct a thorough evaluation to provide an accurate market value.',
  },
  {
    num: '03',
    title: 'Personalized Selection or Offer',
    body: 'Buyers are presented with a selection of gemstones that match their preferences. For sellers, we provide a competitive offer based on the evaluation.',
  },
  {
    num: '04',
    title: 'Transaction & Follow-Up',
    body: "Once you're satisfied with the selection or offer, we finalize the transaction with complete transparency. We also provide post-purchase services, including certifications and advice on gemstone care.",
  },
];

const trustPoints = [
  { icon: ShieldCheck, title: 'Ethically Sourced',  text: 'Every stone is traced back to verified Sri Lankan mines.' },
  { icon: Award,       title: 'Certified Quality',  text: 'Independently graded for colour, clarity, cut and carat.' },
  { icon: HandCoins,   title: 'Fair Market Pricing',text: 'Transparent valuations rooted in current global demand.' },
  { icon: Sparkles,    title: 'Personalised Service',text:'A dedicated advisor walks with you, start to finish.' },
];

export default function GemPurchasing() {
  return (
    <>
      <SEO
        title="Buy & Sell Ceylon Gemstones: Certified Sapphires & Rubies"
        description="Buy and sell high-quality natural Ceylon gemstones with Abeywardhane Gems. Gemologist-authenticated sapphires and rubies, transparent valuations and fair market pricing in Sri Lanka."
        path="/services/gem-purchasing"
        schema={graph(serviceSchema({ name: 'Gem Purchasing and Selling', description: 'Buying and selling high-quality, authenticated Ceylon gemstones with transparent valuations.', path: '/services/gem-purchasing' }))}
      />
      <PageHeader
        eyebrow="Services"
        title="Gem Purchasing And Selling"
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Marketing' },
          { label: 'Gem Purchasing and Selling' },
        ]}
      />

      {/* ===================== INTRO ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="grid lg:grid-cols-[100px_1fr] gap-6 lg:gap-10 items-start max-w-5xl">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-sapphire-light grid place-items-center font-display text-3xl lg:text-4xl text-sapphire font-medium leading-none shrink-0">
                A
              </div>
              <p className="text-sm text-ink-soft leading-[1.75]">
                <span className="font-display text-lg text-ink">t Abeywardhane Gems,</span> we pride ourselves on being a premier destination for both purchasing and selling high-quality gemstones. Our commitment to authenticity, transparency, and customer satisfaction has established us as a trusted name in the industry. Whether you're looking to acquire a unique gem for your collection or wish to sell a precious stone, we provide a seamless, professional experience tailored to your needs.
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

      {/* ===================== OUR GEM PURCHASING SERVICE ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-4xl mb-12">
              <span className="eyebrow">For Buyers</span>
              <h2 className="section-title mb-4">Our Gem Purchasing <em>Service</em></h2>
              <p className="text-ink-soft text-sm leading-relaxed">
                We source our gems directly from the finest mines, ensuring that each stone is of the highest quality and ethically obtained. Our team of expert gemologists carefully evaluates each gemstone to ensure it meets our stringent standards for colour, clarity, cut, and carat. This meticulous process guarantees that every gem we offer is a true investment in beauty and value.
              </p>
            </div>
          </Reveal>

          {/* Image gallery (3 placeholders) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            <Reveal delay={0.05}>
              <ImagePlaceholder
                // src={purchasing1}
                label="Rough gemstone photo"
                filename="purchase-1.jpg"
                aspect="4/3"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ImagePlaceholder
                // src={purchasing2}
                label="Cutting / polishing in progress"
                filename="purchase-2.jpg"
                aspect="4/3"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <ImagePlaceholder
                // src={purchasing3}
                label="Finished certified gem"
                filename="purchase-3.jpg"
                aspect="4/3"
              />
            </Reveal>
          </div>

          {/* Trust grid */}
          <Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-line">
                  <div className="w-10 h-10 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-3">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5 text-sm">{title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== OUR GEM SELLING SERVICE ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-4xl mb-12">
              <span className="eyebrow">For Sellers</span>
              <h2 className="section-title mb-4">Our Gem Selling <em>Service</em></h2>
              <p className="text-ink-soft text-sm leading-relaxed">
                If you're looking to sell a gemstone, we provide a transparent and fair evaluation process. Our experts assess the stone's market value based on current trends and demand, offering competitive pricing that reflects its true worth. We handle every transaction with the utmost discretion and professionalism, ensuring a smooth and satisfactory experience for our clients.
              </p>
            </div>
          </Reveal>

          {/* Image gallery (3 placeholders) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            <Reveal delay={0.05}>
              <ImagePlaceholder
                // src={selling1}
                label="Client consultation"
                filename="sell-1.jpg"
                aspect="4/3"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ImagePlaceholder
                // src={selling2}
                label="Gem appraisal / evaluation"
                filename="sell-2.jpg"
                aspect="4/3"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <ImagePlaceholder
                // src={selling3}
                label="Secure transaction & handover"
                filename="sell-3.jpg"
                aspect="4/3"
              />
            </Reveal>
          </div>

          {/* Selling steps as a tidy list */}
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-6">
              <SellingPoint
                title="Honest, expert evaluation"
                text="Each stone is examined by qualified gemologists using calibrated instruments, never guesswork. You receive a clear, written assessment."
              />
              <SellingPoint
                title="Competitive market pricing"
                text="Our offers reflect live international demand, not flat retail rates. You get the value your gem actually deserves."
              />
              <SellingPoint
                title="Discreet & professional"
                text="Every transaction is handled in confidence. Identity, pricing and provenance stay between us."
              />
              <SellingPoint
                title="Fast, secure payment"
                text="Once terms are agreed, payment is processed promptly through the channel that suits you best."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA BANNER ===================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-ink text-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <Reveal>
              <div>
                <div className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4">Ready to begin?</div>
                <h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight mb-3">
                  Buy with confidence, sell with clarity.
                </h2>
                <p className="text-white/70 max-w-xl text-sm">
                  Talk to one of our gemologists today, it costs nothing to get an expert opinion.
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
                  href={whatsappHref("Hi! I'd like to discuss buying / selling a gemstone.")}
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
  // The blue highlight follows the hovered card. It defaults to the first
  // card and snaps back to it when the pointer leaves the row.
  const [active, setActive] = useState(0);

  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-line"
      onMouseLeave={() => setActive(0)}
    >
      {processSteps.map((step, i) => (
        <Reveal key={step.num} delay={i * 0.08}>
          <ProcessCard
            step={step}
            highlighted={i === active}
            onHover={() => setActive(i)}
          />
        </Reveal>
      ))}
    </div>
  );
}

function ProcessCard({ step, highlighted, onHover }) {
  const base =
    'h-full p-6 lg:p-8 border-b border-r border-line transition-colors duration-300 cursor-default';
  const colourful = highlighted
    ? 'bg-sapphire text-white border-sapphire'
    : 'bg-white text-ink';

  return (
    <div className={`${base} ${colourful}`} onMouseEnter={onHover}>
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

function SellingPoint({ title, text }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-cream/60 border border-line">
      <div className="w-2 h-2 mt-2.5 rounded-full bg-sapphire shrink-0 ring-4 ring-sapphire/15" />
      <div>
        <h3 className="font-semibold text-ink mb-1 text-sm">{title}</h3>
        <p className="text-xs text-ink-soft leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
