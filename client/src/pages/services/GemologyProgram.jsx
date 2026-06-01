import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flower2,
  TreePine,
  Droplets,
  Sparkles,
  Microscope,
  HandshakeIcon,
  Network,
  UsersRound,
  BookOpen,
  MapPin,
  Star,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Reveal from '@/components/ui/Reveal';
import { whatsappHref } from '@/lib/whatsapp';

/* =========================================================
 *  ✏️  HOW TO ADD YOUR OWN PHOTOS
 * =========================================================
 *  Two galleries on this page need photos:
 *
 *  1. THE GARDEN MINE
 *     Drop into:
 *       client/src/assets/images/services/gemology-program/garden/
 *     Suggested names: garden-1.jpg, garden-2.jpg, ...
 *     Photo ideas: the flower beds, the ponds, the planted pathways,
 *                  a wide shot of a working mine with the gardens around it.
 *
 *  2. PROGRAM PHOTOS (classrooms, field trips, labs)
 *     Drop into:
 *       client/src/assets/images/services/gemology-program/program/
 *     Suggested names: program-1.jpg, program-2.jpg, ...
 *     Photo ideas: classroom lectures, lab work, field trips,
 *                  interns examining gems, group photos.
 *
 *  Then uncomment the matching `import` lines below and the
 *  `src={...}` lines on each <ImagePlaceholder>.
 *
 *  See the README.md inside each folder for full instructions.
 * ========================================================= */

// --- Garden mine photo imports ---
// import garden1 from '@/assets/images/services/gemology-program/garden/garden-1.jpg';
// import garden2 from '@/assets/images/services/gemology-program/garden/garden-2.jpg';
// import garden3 from '@/assets/images/services/gemology-program/garden/garden-3.jpg';
// import garden4 from '@/assets/images/services/gemology-program/garden/garden-4.jpg';
// import garden5 from '@/assets/images/services/gemology-program/garden/garden-5.jpg';

// --- Program photo imports ---
// import program1 from '@/assets/images/services/gemology-program/program/program-1.jpg';
// import program2 from '@/assets/images/services/gemology-program/program/program-2.jpg';
// import program3 from '@/assets/images/services/gemology-program/program/program-3.jpg';
// import program4 from '@/assets/images/services/gemology-program/program/program-4.jpg';

/* ---------- Data ---------- */
const gardenPhotos = [
  { label: 'Flower beds at the mine', filename: 'garden-1.jpg' /* , src: garden1 */ },
  { label: 'Lily pond on the property', filename: 'garden-2.jpg' /* , src: garden2 */ },
  { label: 'Pathway through the gardens', filename: 'garden-3.jpg' /* , src: garden3 */ },
  { label: 'Working pit framed by gardens', filename: 'garden-4.jpg' /* , src: garden4 */ },
  { label: 'Visitors among the flowers', filename: 'garden-5.jpg' /* , src: garden5 */ },
];

const programPhotos = [
  { label: 'Classroom session', filename: 'program-1.jpg' /* , src: program1 */ },
  { label: 'Hands-on lab work', filename: 'program-2.jpg' /* , src: program2 */ },
  { label: 'Field trip to the mine', filename: 'program-3.jpg' /* , src: program3 */ },
  { label: 'Group at the cutting workshop', filename: 'program-4.jpg' /* , src: program4 */ },
];

const uniquePoints = [
  {
    icon: Flower2,
    title: 'Mines that bloom',
    text: "Each working pit is wrapped in cultivated flower beds and planted borders. You'll smell jasmine before you ever see a gemstone.",
  },
  {
    icon: Droplets,
    title: 'Lotus & lily ponds',
    text: 'Spring-fed ponds dot the property — beautiful to walk past, and a natural way to manage the water table around the dig sites.',
  },
  {
    icon: TreePine,
    title: 'A living ecosystem',
    text: 'We work with the land, not against it. Birdlife, fruit trees and butterflies have returned to areas that used to be bare earth.',
  },
  {
    icon: Sparkles,
    title: 'The only one of its kind',
    text: 'No other mine in Sri Lanka is run this way. It is the most unique experience in the country for serious gem buyers and curious visitors alike.',
  },
];

const learningPillars = [
  {
    icon: MapPin,
    title: 'Exposure Visits',
    text: 'Guided tours of working mines, cutting facilities and gemological laboratories — led by industry experts who demonstrate the real processes step by step.',
  },
  {
    icon: Microscope,
    title: 'Internship Opportunities',
    text: 'Real-world internships hosted by leading gemology institutes, jewellery companies and gemstone laboratories. Participants work on grading, design, market analysis and more.',
  },
  {
    icon: BookOpen,
    title: 'Workshops & Seminars',
    text: 'Sessions led by industry professionals on gem identification, ethical sourcing, treatments and the latest technological advances in gemology.',
  },
];

const programSteps = [
  { num: '01', title: 'Program Planning &\nObjective Setting' },
  { num: '02', title: 'Partnerships &\nCollaborations' },
  { num: '03', title: 'Structured Activities:\nVisits & Internships' },
  { num: '04', title: 'Evaluation &\nPost-Program Support' },
];

const networkingPoints = [
  {
    icon: HandshakeIcon,
    title: 'Partnerships with Industry Leaders',
    text: 'Developed in collaboration with leading gemology institutes, gemstone laboratories and mining companies. Mentorship and guidance from the best in the industry.',
  },
  {
    icon: Network,
    title: 'Networking Opportunities',
    text: 'Networking events, informal meet-and-greet sessions and collaborative projects. By engaging with professionals from various sectors, participants build relationships that lead to real outcomes.',
  },
  {
    icon: UsersRound,
    title: 'Alumni Network',
    text: 'After completing the program, participants join an exclusive alumni network — a platform for continuous learning, sharing insights and staying connected.',
  },
];

export default function GemologyProgram() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Organizing an Expose Visit and Internship Program on Gemology"
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Education' },
          { label: 'Expose Visit & Internship Program on Gemology' },
        ]}
      />

      {/* ===================== SIGNATURE HOOK: GARDEN MINES ===================== */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        {/* Soft botanical background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(800px 500px at 90% 10%, rgba(47,76,219,0.08) 0%, transparent 60%), radial-gradient(700px 500px at 5% 90%, rgba(201,161,74,0.10) 0%, transparent 60%)',
          }}
        />

        <div className="relative container-x">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-sapphire-light text-sapphire px-4 py-2 rounded-full mb-6">
              <Star size={14} fill="currentColor" />
              <span className="text-xs tracking-[0.25em] uppercase font-bold">
                A Sri Lankan First
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.04] tracking-tight text-ink max-w-5xl mb-6">
              Our mines aren't just mines.<br />
              <span className="text-sapphire italic font-medium">They're gardens.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">
              <div className="space-y-5 text-ink-soft text-sm leading-[1.85] max-w-2xl">
                <p>
                  Most gem mines look like wounds in the earth. Ours look like a place you'd want to spend a Sunday afternoon — flower beds bordering every working pit, lily ponds full of koi and water lilies, planted pathways shaded by mature trees.
                </p>
                <p>
                  This isn't decoration. It's the heart of our business model. When a buyer flies halfway around the world to source Ceylon gems, they don't just want stones — they want to understand where those stones came from, see them being lifted from the ground, and trust the people doing the lifting.
                </p>
                <p>
                  A garden mine builds that trust faster than any certificate can. <span className="font-semibold text-ink">No one else in Sri Lanka does this.</span> It's why our clients keep coming back, and why the word keeps spreading.
                </p>
              </div>

              {/* Featured large garden photo */}
              <div>
                <ImagePlaceholder
                  // src={garden1}
                  label="Wide shot of the garden mine"
                  filename="garden-1.jpg"
                  aspect="4/5"
                  className="rounded-3xl shadow-deep"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== UNIQUE POINTS ===================== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <span className="eyebrow">What Makes Us Unique</span>
              <h2 className="section-title">A mine you'd want to <em>walk through</em>.</h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {uniquePoints.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="h-full bg-white rounded-2xl p-7 border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-2 leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GARDEN GALLERY ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12 max-w-6xl">
              <div className="max-w-2xl">
                <span className="eyebrow">Step Inside</span>
                <h2 className="section-title mb-4">The <em>Abeywardhane</em> Garden Mine</h2>
                <p className="text-ink-soft text-sm">
                  A few glimpses of what visitors actually see when they arrive at our site.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sapphire font-semibold hover:gap-3 transition-all"
              >
                Plan a visit <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>

          {/* Mosaic-style gallery: one tall + four square = 5 slots */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            <Reveal delay={0.05}>
              <div className="lg:row-span-2 h-full">
                <ImagePlaceholder
                  // src={garden2}
                  label={gardenPhotos[1].label}
                  filename={gardenPhotos[1].filename}
                  aspect="3/4"
                  className="h-full"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ImagePlaceholder
                // src={garden3}
                label={gardenPhotos[2].label}
                filename={gardenPhotos[2].filename}
                aspect="1/1"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <ImagePlaceholder
                // src={garden4}
                label={gardenPhotos[3].label}
                filename={gardenPhotos[3].filename}
                aspect="1/1"
              />
            </Reveal>
            <Reveal delay={0.2} className="hidden lg:block">
              <ImagePlaceholder
                // src={garden5}
                label={gardenPhotos[4].label}
                filename={gardenPhotos[4].filename}
                aspect="1/1"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <div className="col-span-2 lg:col-span-2">
                <ImagePlaceholder
                  // src={garden1}
                  label={gardenPhotos[0].label}
                  filename={gardenPhotos[0].filename}
                  aspect="16/9"
                />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="lg:hidden">
              <ImagePlaceholder
                label={gardenPhotos[4].label}
                filename={gardenPhotos[4].filename}
                aspect="1/1"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== HOW THIS DRIVES THE BUSINESS ===================== */}
      <section className="py-20 lg:py-24 bg-ink text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(700px 400px at 80% 20%, rgba(47,76,219,0.45) 0%, transparent 60%), radial-gradient(500px 300px at 10% 90%, rgba(201,161,74,0.25) 0%, transparent 60%)',
          }}
        />

        <div className="relative container-x">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <Reveal>
              <div>
                <div className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4">
                  Why It Works
                </div>
                <h2 className="font-display text-2xl lg:text-3xl xl:text-4xl font-medium leading-[1.1] mb-5">
                  Trust isn't issued.<br />
                  <span className="text-gold italic">It's experienced.</span>
                </h2>
                <p className="text-white/75 text-sm leading-relaxed mb-5">
                  When a buyer walks through our garden mine, they don't just see gems coming out of the ground — they see how we treat the land, our people, and our visitors. They taste the tea from the canteen. They watch a sapphire emerge from a sieve. They leave with a story that no glossy brochure can tell.
                </p>
                <p className="text-white/75 text-sm leading-relaxed">
                  That experience is why visitors become buyers, buyers become partners, and partners send their friends. Our gardens aren't a marketing line — they're our most powerful sales channel.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value="3+" label="Mines, all with gardens" />
                <StatCard value="20+" label="Acres of planted grounds" />
                <StatCard value="100%" label="Visitor-to-buyer journey" highlight />
                <StatCard value="∞" label="Compound trust effect" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== COMPREHENSIVE LEARNING ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">The Program</span>
              <h2 className="section-title mb-5">Comprehensive <em>Learning</em></h2>
              <p className="text-ink-soft text-sm">
                Meticulously designed to give participants a well-rounded education in gemology — combining theoretical knowledge with practical, hands-on experience, all anchored at our garden-mine sites.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {learningPillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full bg-cream rounded-2xl p-6 border border-line">
                  <div className="w-11 h-11 rounded-xl bg-white text-sapphire grid place-items-center mb-4 shadow-soft">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">{title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS — 4 STEPS ===================== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-14 text-center mx-auto">
              <span className="eyebrow">How the Program Runs</span>
              <h2 className="section-title">Four stages, <em>one outcome</em>.</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-6xl mx-auto">
            {programSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <ProgramCircle step={step} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== INDUSTRY CONNECTIONS ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">Beyond the Classroom</span>
              <h2 className="section-title mb-5">Industry Connections & <em>Networking</em></h2>
              <p className="text-ink-soft text-sm">
                The program places a strong emphasis on building and expanding participants' professional networks — crucial for long-term success in the gemology industry.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {networkingPoints.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full bg-white rounded-2xl p-6 border border-line hover:shadow-card hover:border-sapphire/30 transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">{title}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROGRAM PHOTO GALLERY ===================== */}
      <section className="py-20 lg:py-24 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">Moments From the Program</span>
              <h2 className="section-title">In the field, <em>in the lab</em>.</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {programPhotos.map((photo, i) => (
              <Reveal key={photo.filename} delay={i * 0.08}>
                <ImagePlaceholder
                  // src={[program1, program2, program3, program4][i]}
                  label={photo.label}
                  filename={photo.filename}
                  aspect="4/5"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-16 lg:py-20 bg-ink text-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <Reveal>
              <div>
                <div className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4">
                  Come See For Yourself
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight mb-3">
                  Visit the mine that <em className="text-gold not-italic" style={{ fontStyle: 'italic' }}>blooms</em>.
                </h2>
                <p className="text-white/70 max-w-xl text-sm">
                  Whether you're a serious buyer, a curious student, or a partner institute — we'd love to host you. Tell us when, and we'll plan the rest.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-white text-ink hover:bg-cream transition-all"
                >
                  Plan a Visit <ArrowRight size={16} strokeWidth={2.4} />
                </Link>
                <a
                  href={whatsappHref("Hi! I'd like to learn about your gemology program and garden mine visits.")}
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

function StatCard({ value, label, highlight }) {
  return (
    <div
      className={`rounded-2xl p-6 lg:p-7 ${
        highlight
          ? 'bg-gold/15 border border-gold/30'
          : 'bg-white/5 border border-white/10'
      }`}
    >
      <div
        className={`font-display text-3xl lg:text-4xl font-medium leading-none mb-2 ${
          highlight ? 'text-gold' : 'text-white'
        }`}
      >
        {value}
      </div>
      <div className="text-sm text-white/70 font-medium leading-snug">{label}</div>
    </div>
  );
}

function ProgramCircle({ step }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Decorative circle */}
      <div className="aspect-square w-full rounded-full border-2 border-dashed border-sapphire/25 grid place-items-center p-6 text-center bg-white">
        <div>
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sapphire text-white text-sm font-semibold mb-3">
            {step.num}
          </div>
          <h3 className="font-display text-base lg:text-lg font-semibold text-ink leading-tight whitespace-pre-line">
            {step.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
