import { Link } from 'react-router-dom';
import { ArrowRight, Award, BadgeCheck, UserRound } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import CtaBand from '@/components/sections/CtaBand';
import Picture from '@/components/ui/Picture';
import { story, journey, authenticity, team, memberships, trustBadges } from '@/data/about';
import { stats, differentiators } from '@/data/company';
import { graph, organizationSchema, absoluteUrl } from '@/lib/seo';
import { SITE_NAME, SITE_DESCRIPTION } from '@/data/site';

const aboutSchema = graph(
  organizationSchema(),
  {
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: absoluteUrl('/about'),
    description: SITE_DESCRIPTION,
    mainEntity: { '@id': `${absoluteUrl('/')}#organization` },
  },
);

export default function About() {
  return (
    <>
      <SEO
        title="About Us: Ceylon Gemstone Experts & Exporters in Sri Lanka"
        description="Meet Abeywardhane Gems, a Sri Lanka, based team of gemologists and traders sourcing certified Ceylon sapphires and gemstones direct from the mine. Our story, mine-to-market process, expertise and authenticity guarantee."
        path="/about"
        image="/team.jpg"
        schema={aboutSchema}
      />
      <PageHeader
        eyebrow="Our Story"
        title="About Abeywardhane Gems"
        breadcrumb={[{ label: 'Abeywardhane Gems', to: '/' }, { label: 'About' }]}
      />

      {/* ===================== STORY ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div>
              <span className="eyebrow">From the Island of Gems</span>
              <h2 className="section-title mb-5">A family rooted in Sri Lanka’s <em>gem heritage</em>.</h2>
              <div className="space-y-4 text-ink-soft leading-[1.8] text-[0.95rem]">
                {story.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="flex flex-wrap gap-2.5 mt-7">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-line bg-cream/60 px-3.5 py-2 text-xs font-semibold text-ink">
                    <Icon size={14} className="text-sapphire" /> {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-sapphire-light/60 blur-2xl -z-10" />
              <Picture
                src="/team.jpg"
                alt="The Abeywardhane Gems team in Sri Lanka’s gem country"
                width="900"
                height="700"
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-card"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="py-12 bg-ink text-white">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div>
                <div className="font-display text-3xl lg:text-4xl text-frost mb-1">{s.value}{s.suffix}</div>
                <div className="text-sm font-semibold text-white">{s.label}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== MINE-TO-MARKET JOURNEY ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">How We Work</span>
              <h2 className="section-title mb-4">The mine-to-market <em>journey</em>.</h2>
              <p className="lead">Every Abeywardhane gem passes through five deliberate stages, from the gravel of Ratnapura to your hand, anywhere in the world.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {journey.map((j, i) => (
              <Reveal key={j.title} delay={(i % 5) * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-cream/50 p-6 hover:bg-white hover:shadow-card transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <j.icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className="text-[0.62rem] tracking-[0.2em] uppercase text-muted font-semibold mb-1">Step {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-semibold text-ink mb-2 text-sm">{j.title}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{j.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AUTHENTICITY PROCESS ===================== */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">Our Guarantee</span>
              <h2 className="section-title mb-4">How we guarantee <em>authenticity</em>.</h2>
              <p className="lead">Confidence shouldn’t rest on a promise, it should rest on evidence. Here is how we verify every stone.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {authenticity.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 0.08}>
                <div className="flex items-start gap-4 rounded-2xl bg-white border border-line p-6">
                  <div className="w-11 h-11 rounded-xl bg-sapphire-light text-sapphire grid place-items-center shrink-0">
                    <a.icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1.5">{a.title}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TEAM ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">The People Behind the Gems</span>
              <h2 className="section-title mb-4">Expertise you can <em>talk to</em>.</h2>
              <p className="lead">Real gemologists and gem-trade specialists stand behind every stone we sell.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m, i) => (
              <Reveal key={m.role} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-cream/50 p-6 text-center hover:bg-white hover:shadow-card transition-all duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <UserRound size={26} strokeWidth={1.6} />
                  </div>
                  {m.name && <div className="font-display text-lg text-ink leading-tight">{m.name}</div>}
                  <div className="text-sapphire font-semibold text-sm mt-0.5">{m.role}</div>
                  {m.credentials && (
                    <div className="inline-flex items-center gap-1.5 mt-2 text-[0.7rem] font-semibold text-ink-soft">
                      <BadgeCheck size={13} className="text-sapphire" /> {m.credentials}
                    </div>
                  )}
                  <p className="text-xs text-ink-soft leading-relaxed mt-3">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MEMBERSHIPS (only if provided) ===================== */}
      {memberships.length > 0 && (
        <section className="py-14 sm:py-20 bg-cream">
          <div className="container-x">
            <Reveal>
              <div className="max-w-3xl mb-10">
                <span className="eyebrow">Accreditation</span>
                <h2 className="section-title">Memberships & <em>recognition</em>.</h2>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {memberships.map((m) => (
                <div key={m.name} className="flex items-start gap-3 rounded-2xl bg-white border border-line p-5">
                  <Award size={20} className="text-sapphire mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-ink text-sm">{m.name}</div>
                    {m.note && <div className="text-xs text-muted mt-0.5">{m.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== WHY BUYERS TRUST US ===================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow">Why International Buyers Choose Us</span>
              <h2 className="section-title mb-4">Built on <em>trust</em>, proven by process.</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentiators.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-cream/50 p-6">
                  <div className="w-10 h-10 rounded-xl bg-sapphire-light text-sapphire grid place-items-center mb-4">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-[0.82rem] bg-sapphire text-white shadow-glow hover:bg-sapphire-deep hover:-translate-y-0.5 transition-all">
                Talk to a gemologist
                <ArrowRight size={16} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/gem-export-services" className="inline-flex items-center gap-2 text-sm font-semibold text-sapphire hover:gap-3 transition-all">
                Our export services <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
