import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Plane,
  Car,
  Home,
  UtensilsCrossed,
  MapPin,
  Gem,
  Landmark,
  ShieldCheck,
  Percent,
  FileCheck,
  Compass,
  Phone,
  CheckCircle2,
  Globe2,
  Palmtree,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Reveal from '@/components/ui/Reveal';
import { whatsappHref } from '@/lib/whatsapp';

/* =========================================================
 *  HOW TO ADD YOUR OWN PHOTOS
 * =========================================================
 *  Three galleries on this page need photos:
 *
 *  1. TRANSPORT & ACCOMMODATION
 *       client/src/assets/images/services/gem-tourism/transport/
 *       transport-1.jpg, transport-2.jpg, transport-3.jpg
 *
 *  2. TOUR EXPERIENCES
 *       client/src/assets/images/services/gem-tourism/experiences/
 *       experience-1.jpg through experience-4.jpg
 *
 *  3. SRI LANKA ISLAND-WIDE TOURS
 *       client/src/assets/images/services/gem-tourism/sri-lanka-tours/
 *       tour-1.jpg through tour-4.jpg
 *
 *  Then uncomment matching import lines and src={...} props.
 * ========================================================= */

// --- Transport & accommodation ---
// import transport1 from '@/assets/images/services/gem-tourism/transport/transport-1.jpg';
// import transport2 from '@/assets/images/services/gem-tourism/transport/transport-2.jpg';
// import transport3 from '@/assets/images/services/gem-tourism/transport/transport-3.jpg';

// --- Tour experiences ---
// import experience1 from '@/assets/images/services/gem-tourism/experiences/experience-1.jpg';
// import experience2 from '@/assets/images/services/gem-tourism/experiences/experience-2.jpg';
// import experience3 from '@/assets/images/services/gem-tourism/experiences/experience-3.jpg';
// import experience4 from '@/assets/images/services/gem-tourism/experiences/experience-4.jpg';

// --- Sri Lanka island-wide tours ---
// import tour1 from '@/assets/images/services/gem-tourism/sri-lanka-tours/tour-1.jpg';
// import tour2 from '@/assets/images/services/gem-tourism/sri-lanka-tours/tour-2.jpg';
// import tour3 from '@/assets/images/services/gem-tourism/sri-lanka-tours/tour-3.jpg';
// import tour4 from '@/assets/images/services/gem-tourism/sri-lanka-tours/tour-4.jpg';

const howItWorks = [
  { num: '01', title: 'Register & Plan', text: 'Register with us before arriving in Sri Lanka. Our coordinator contacts you to understand your interests and designs a personalised gem tour plan around your goals.', icon: Phone },
  { num: '02', title: 'We Handle Everything', text: "Airport pickup, domestic transport, free accommodation at our place, and complimentary meals \u2014 it\u2019s all arranged before you land. You just show up.", icon: Plane },
  { num: '03', title: 'Guided Gem Experiences', text: 'Visit our garden mines, gem workshops, cutting facilities, and the major purchasing centres in Beruwala and Ratnapura \u2014 accompanied by expert guides every step.', icon: Gem },
  { num: '04', title: 'Purchase with Confidence', text: 'Select your gems, receive certification, and complete the transaction with full transparency. We charge just 10% of your purchase value \u2014 no hidden costs.', icon: ShieldCheck },
];

const included = [
  { icon: Plane,           label: 'Airport transport',        detail: 'Pickup and drop-off at Bandaranaike International Airport' },
  { icon: Car,             label: 'Domestic transport',       detail: 'All travel within Sri Lanka covered by our fleet' },
  { icon: Home,            label: 'Free accommodation',       detail: 'Stay at our own property \u2014 clean, comfortable, welcoming' },
  { icon: UtensilsCrossed, label: 'Complimentary meals',      detail: 'Home-cooked Sri Lankan food at our place (outside dining at your cost)' },
  { icon: MapPin,          label: 'Purchasing destinations',   detail: 'Organised visits to gem markets in Beruwala and Ratnapura' },
  { icon: Gem,             label: 'Mine & workshop access',   detail: 'Tour our garden mines and watch gemstones being cut and polished' },
  { icon: Landmark,        label: 'Cultural & market tours',  detail: 'Local gemstone markets, traditional dances, folklore and museum visits' },
  { icon: FileCheck,       label: 'Gem certification',        detail: 'We arrange proper certification for every stone you purchase' },
];

const experiences = [
  { title: 'Mine Visits', text: 'Explore active gemstone mines guided by experts who explain the mining process, extraction methods, and the history of the site. A rare glimpse into the raw origins of Ceylon gems.', label: 'Mine visit photo', filename: 'experience-1.jpg' },
  { title: 'Workshops & Demonstrations', text: 'Engage in hands-on workshops where you learn the art of gemstone cutting, polishing, and jewellery-making. Local artisans demonstrate traditional techniques passed down for generations.', label: 'Workshop photo', filename: 'experience-2.jpg' },
  { title: 'Cultural & Market Tours', text: "Visit local gemstone markets to see a huge variety of gems and jewellery, learn about pricing and valuation. We also include cultural activities \u2014 traditional dances, folklore, and museum visits.", label: 'Cultural tour photo', filename: 'experience-3.jpg' },
  { title: 'Gem Purchasing with Support', text: "We guide you through every purchase, handle negotiations if needed, and ensure you receive fair market pricing. Whether you\u2019re buying a single sapphire or a wholesale lot, our team is beside you.", label: 'Purchasing support photo', filename: 'experience-4.jpg' },
];

const sriLankaTours = [
  { label: 'Sigiriya Rock Fortress',          filename: 'tour-1.jpg', location: 'Sigiriya' },
  { label: 'Temple of the Tooth',             filename: 'tour-2.jpg', location: 'Kandy' },
  { label: 'Galle Fort & southern coast',     filename: 'tour-3.jpg', location: 'Galle' },
  { label: 'Nine Arches Bridge & tea country', filename: 'tour-4.jpg', location: 'Ella' },
];

const pricingPoints = [
  { icon: Percent,   title: '10% of your purchase',       text: 'Our only fee is 10% of the total purchase value. No service charges, no hidden costs, no agency markup.' },
  { icon: FileCheck, title: 'Certification included',     text: 'We arrange internationally recognised gemstone certificates for every stone you buy \u2014 included in the 10%.' },
  { icon: Globe2,    title: 'Island tours: pay as you go', text: 'We can organise trips anywhere in Sri Lanka \u2014 Sigiriya, Kandy, Galle, the tea country. Quoted separately upfront.' },
  { icon: Phone,     title: 'Your guide contacts you first', text: 'Before you fly, our dedicated tour guide will reach out, discuss your plan, and create a transparent quote. No surprises.' },
];

export default function GemTourism() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Organizing and Facilitating Gem Tourism"
        breadcrumb={[
          { label: 'Abeywardana Gems', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Tourism' },
          { label: 'Organizing and Facilitating Gem Tourism' },
        ]}
      />

      {/* ===================== HOOK INTRO ===================== */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'radial-gradient(900px 500px at 85% 10%, rgba(47,76,219,0.08) 0%, transparent 60%), radial-gradient(700px 400px at 5% 95%, rgba(201,161,74,0.10) 0%, transparent 60%)' }} />
        <div className="relative container-x">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6 border border-gold/20">
              <Compass size={14} />
              <span className="text-xs tracking-[0.25em] uppercase font-bold">Complete Gem Tour Package</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.04] tracking-tight text-ink max-w-5xl mb-6">
              More than a gem trip.<br />
              <span className="text-sapphire italic font-medium">A complete Sri Lankan experience.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
              <div className="space-y-5 text-ink-soft text-sm leading-[1.8] max-w-2xl">
                <p>When you register for a gem tour with Abeywardana Gems, you{'\u2019'}re not just booking a visit to a mine {'\u2014'} you{'\u2019'}re stepping into a fully guided, fully hosted experience. From the moment you land at Bandaranaike Airport to the last day of your trip, we take care of <span className="font-semibold text-ink">transport, accommodation, meals, and every purchasing arrangement</span>.</p>
                <p>We walk you through our garden mines, sit with you at the cutting workshop, take you to the gem markets of Beruwala and Ratnapura, and make sure every stone you buy is certified and fairly priced. If you want to explore the rest of Sri Lanka {'\u2014'} Sigiriya, Kandy, Galle, the tea hills {'\u2014'} we{'\u2019'}ll arrange that too.</p>
                <p>This isn{'\u2019'}t a package tour sold from a brochure. It{'\u2019'}s a personal relationship, built one visit at a time.</p>
              </div>
              <div>
                <ImagePlaceholder label="Airport pickup / welcome" filename="transport-1.jpg" aspect="4/5" className="rounded-3xl shadow-deep" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal><div className="max-w-3xl mb-14"><span className="eyebrow">How It Works</span><h2 className="section-title">Four steps from <em>registration</em> to gems in hand.</h2></div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-line">
            {howItWorks.map((step, i) => (<Reveal key={step.num} delay={i * 0.08}><StepCard step={step} highlighted={i === 0} /></Reveal>))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT'S INCLUDED ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal><div className="max-w-3xl mb-14"><span className="eyebrow">Everything Taken Care Of</span><h2 className="section-title mb-5">What{'\u2019'}s <em>included</em> in every tour.</h2><p className="text-ink-soft text-sm">Register with us, fly to Sri Lanka, and we handle the rest.</p></div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {included.map(({ icon: Icon, label, detail }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <div className="h-full bg-cream/60 rounded-2xl p-6 border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-500 group">
                  <div className="w-10 h-10 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-3 group-hover:bg-sapphire group-hover:text-white transition-colors duration-500"><Icon size={20} strokeWidth={1.8} /></div>
                  <h3 className="font-semibold text-ink mb-1.5 text-[0.85rem]">{label}</h3>
                  <p className="text-xs text-muted leading-relaxed">{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TRANSPORT & ACCOMMODATION GALLERY ===================== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal><div className="max-w-3xl mb-12"><span className="eyebrow">Your Comfort, Our Priority</span><h2 className="section-title mb-5">Transport & <em>Accommodation</em></h2><p className="text-ink-soft text-sm">Airport pickup, comfortable domestic travel, and free lodging at our own property.</p></div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Reveal delay={0.05}><div><ImagePlaceholder label="Airport pickup" filename="transport-1.jpg" aspect="4/3" /><h3 className="font-display text-lg font-semibold text-ink mt-3 mb-1">Airport Pickup</h3><p className="text-xs text-muted">We meet you at Bandaranaike International and drive you straight to our property.</p></div></Reveal>
            <Reveal delay={0.1}><div><ImagePlaceholder label="Domestic transport" filename="transport-2.jpg" aspect="4/3" /><h3 className="font-display text-lg font-semibold text-ink mt-3 mb-1">Domestic Travel</h3><p className="text-xs text-muted">All travel between mines, markets and your accommodation is fully covered.</p></div></Reveal>
            <Reveal delay={0.15}><div><ImagePlaceholder label="Free accommodation" filename="transport-3.jpg" aspect="4/3" /><h3 className="font-display text-lg font-semibold text-ink mt-3 mb-1">Free Accommodation</h3><p className="text-xs text-muted">Stay at our own property with complimentary home-cooked meals. Outside dining is at your own expense.</p></div></Reveal>
          </div>
        </div>
      </section>

      {/* ===================== IMMERSIVE EXPERIENCES ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal><div className="max-w-3xl mb-14"><span className="eyebrow">What You{'\u2019'}ll Experience</span><h2 className="section-title mb-5">Immersive Tour Activities & <em>Experiences</em></h2><p className="text-ink-soft text-sm">From the raw earth of the mine to a polished gem in your hand {'\u2014'} and everything in between.</p></div></Reveal>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {experiences.map((exp, i) => (
              <Reveal key={exp.filename} delay={i * 0.08}>
                <article className="group bg-cream rounded-2xl overflow-hidden border border-line hover:shadow-card transition-all duration-500">
                  <ImagePlaceholder label={exp.label} filename={exp.filename} aspect="16/9" className="rounded-none" />
                  <div className="p-5"><h3 className="font-display text-xl font-semibold text-ink mb-2 group-hover:text-sapphire transition-colors">{exp.title}</h3><p className="text-ink-soft text-sm leading-relaxed">{exp.text}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING & TRANSPARENCY ===================== */}
      <section className="py-20 lg:py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'radial-gradient(700px 400px at 80% 20%, rgba(47,76,219,0.45) 0%, transparent 60%), radial-gradient(500px 300px at 10% 90%, rgba(201,161,74,0.25) 0%, transparent 60%)' }} />
        <div className="relative container-x">
          <Reveal><div className="max-w-3xl mb-14"><div className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4">Transparent Pricing</div><h2 className="font-display text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight mb-4">No hidden fees.<br /><span className="text-gold italic">Just 10% of your purchase.</span></h2><p className="text-white/70 text-sm">Our tour service fee is simple: 10% of the total value of gems you purchase. Transport, accommodation, meals and guide services are all included. Gem certification is included too. Island-wide sightseeing is quoted separately upfront.</p></div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricingPoints.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-white/10 text-gold grid place-items-center mb-4"><Icon size={20} strokeWidth={1.8} /></div>
                  <h3 className="font-semibold text-white mb-1.5 text-[0.85rem]">{title}</h3>
                  <p className="text-xs text-white/65 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW THE TOUR STARTS ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <Reveal><div>
              <span className="eyebrow">Before You Fly</span>
              <h2 className="section-title mb-6">How your tour <em>begins</em>.</h2>
              <div className="space-y-4">
                <TimelineStep num="1" title="Register with us" text="Fill out the contact form or message us on WhatsApp. Tell us when you're arriving and what kind of gems you're interested in." />
                <TimelineStep num="2" title="Our coordinator contacts you" text="Within 24 hours, our tour guide will reach out to introduce himself, discuss your preferences, and start building your personalised gem tour plan." />
                <TimelineStep num="3" title="We create a transparent quote" text="You receive a clear itinerary and fair pricing before you book any flights. No surprises." />
                <TimelineStep num="4" title="Land in Sri Lanka — we're waiting" text="Our driver meets you at the airport. From there, you sit back and let us run the show." />
              </div>
            </div></Reveal>
            <Reveal delay={0.1}>
              <div className="bg-cream rounded-3xl p-8 lg:p-10 border border-line">
                <div className="text-xs tracking-[0.25em] uppercase text-sapphire font-bold mb-5">Quick Summary</div>
                <ul className="space-y-4">
                  {['Register before coming to Sri Lanka','Airport pickup + domestic transport \u2014 free','Free accommodation + meals at our place','Guided visits to mines, workshops & markets','Purchasing at Beruwala & Ratnapura arranged','Only 10% of your gem purchase value','Gem certification arranged','Island-wide Sri Lanka tours available (extra)'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-ink-soft"><CheckCircle2 size={16} className="text-sapphire mt-0.5 shrink-0" /><span className="text-[0.82rem] leading-snug">{item}</span></li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== EXPLORE SRI LANKA ===================== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal><div className="flex flex-wrap items-end justify-between gap-6 mb-12"><div className="max-w-2xl"><div className="inline-flex items-center gap-2 mb-4"><Palmtree size={18} className="text-sapphire" /><span className="eyebrow !mb-0">While You{'\u2019'}re Here</span></div><h2 className="section-title mb-4">Explore <em>Sri Lanka</em></h2><p className="text-ink-soft text-sm">Extend your gem tour into a full Sri Lankan holiday. We{'\u2019'}ll organise transport, accommodation and guides for any destination on the island.</p></div><Link to="/contact" className="inline-flex items-center gap-2 text-sapphire font-semibold hover:gap-3 transition-all">Plan your trip <ArrowRight size={16} strokeWidth={2.4} /></Link></div></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {sriLankaTours.map((tour, i) => (
              <Reveal key={tour.filename} delay={i * 0.08}>
                <article className="group bg-white rounded-2xl overflow-hidden border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-500">
                  <ImagePlaceholder label={tour.label} filename={tour.filename} aspect="4/3" className="rounded-none" />
                  <div className="p-5"><div className="flex items-center gap-1.5 text-xs text-muted mb-1.5"><MapPin size={12} className="text-sapphire" /><span>{tour.location}</span></div><h3 className="font-display text-lg font-semibold text-ink leading-tight group-hover:text-sapphire transition-colors">{tour.label}</h3></div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}><p className="text-sm text-muted mt-8 max-w-2xl">Island-wide tours are priced separately and quoted upfront by our tour guide before you commit. You only pay if you decide to go {'\u2014'} no obligation.</p></Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-16 lg:py-20 bg-ink text-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <Reveal><div><div className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-3">Ready to Experience Ceylon?</div><h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight mb-3">Register today.<br /><span className="text-gold italic">We{'\u2019'}ll take it from there.</span></h2><p className="text-white/70 max-w-xl text-sm">Send us a message or chat on WhatsApp. Our tour coordinator will be in touch within 24 hours.</p></div></Reveal>
            <Reveal delay={0.15}><div className="flex flex-wrap gap-4 lg:justify-end">
              <Link to="/contact" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-white text-ink hover:bg-cream transition-all">Register Now <ArrowRight size={16} strokeWidth={2.4} /></Link>
              <a href={whatsappHref("Hi! I'd like to register for a gem tour in Sri Lanka.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] border border-white/25 text-white hover:bg-white/10 transition-all">Chat on WhatsApp</a>
            </div></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function StepCard({ step, highlighted }) {
  const { icon: Icon } = step;
  const base = 'h-full p-6 lg:p-8 border-b border-r border-line transition-colors';
  const colour = highlighted ? 'bg-sapphire text-white border-sapphire' : 'bg-white text-ink hover:bg-cream';
  return (
    <div className={`${base} ${colour}`}>
      <div className={`w-10 h-10 rounded-xl mb-4 grid place-items-center ${highlighted ? 'bg-white/15 text-white' : 'bg-sapphire-light text-sapphire'}`}><Icon size={20} strokeWidth={1.8} /></div>
      <div className={`font-display text-3xl lg:text-4xl font-medium mb-3 ${highlighted ? 'text-white/90' : 'text-ink/70'}`}>{step.num}</div>
      <h3 className={`font-display text-lg font-semibold mb-2 ${highlighted ? 'text-white' : 'text-ink'}`}>{step.title}</h3>
      <p className={`text-xs leading-relaxed ${highlighted ? 'text-white/85' : 'text-ink-soft'}`}>{step.text}</p>
    </div>
  );
}

function TimelineStep({ num, title, text }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-9 h-9 rounded-full bg-sapphire text-white grid place-items-center text-sm font-bold">{num}</div>
        <div className="w-px flex-1 bg-line mt-2" />
      </div>
      <div className="pb-8"><h3 className="font-semibold text-ink mb-1">{title}</h3><p className="text-sm text-ink-soft leading-relaxed">{text}</p></div>
    </div>
  );
}
