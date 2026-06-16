import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CalendarDays, Clock, Check } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import CtaBand from '@/components/sections/CtaBand';
import Picture from '@/components/ui/Picture';
import { FaqSection } from '@/pages/GemExportServices';
import { articleBySlug } from '@/data/articles';
import { graph, articleSchema, faqSchema } from '@/lib/seo';

/** Renders a single knowledge-hub article from src/data/articles.js. */
export default function ArticlePage({ slug }) {
  const a = articleBySlug[slug];
  if (!a) return null;

  const path = `/blog/${a.slug}`;
  const schema = graph(
    articleSchema({ title: a.title, excerpt: a.excerpt, image: a.image, datePublished: a.date, path }),
    a.faqs && a.faqs.length ? faqSchema(a.faqs) : null,
  );

  const related = (a.related || []).map((s) => articleBySlug[s]).filter(Boolean);

  return (
    <>
      <SEO
        title={a.seoTitle || a.title}
        description={a.metaDescription}
        path={path}
        image={a.image}
        imageAlt={a.title}
        type="article"
        schema={schema}
      />
      <PageHeader
        eyebrow={a.isPillar ? 'Pillar Guide' : a.category}
        title={a.title}
        breadcrumb={[
          { label: 'Abeywardhane Gems', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: a.category },
        ]}
      />

      <article className="py-14 sm:py-20 bg-white">
        <div className="container-x max-w-3xl">
          {/* Meta */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-semibold mb-7">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {a.dateDisplay}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {a.readingTime}</span>
              <span className="px-2.5 py-1 rounded-full bg-sapphire-light text-sapphire">{a.category}</span>
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal>
            <Picture
              src={a.image}
              alt={a.title}
              width="1200"
              height="675"
              className="w-full aspect-[16/9] object-cover rounded-3xl shadow-card mb-10"
              loading="eager"
            />
          </Reveal>

          {/* Intro */}
          <Reveal>
            <div className="space-y-4 text-ink leading-[1.85] text-[1.02rem] mb-10">
              {a.intro.map((p, i) => <p key={i} className={i === 0 ? 'lead !text-ink !text-lg' : ''}>{p}</p>)}
            </div>
          </Reveal>

          {/* Body sections */}
          <div className="space-y-10">
            {a.sections.map((s) => (
              <Reveal key={s.heading}>
                <section>
                  <h2 className="font-display text-2xl font-semibold text-ink mb-4">{s.heading}</h2>
                  <div className="space-y-4 text-ink-soft leading-[1.85] text-[0.98rem]">
                    {s.body.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  {s.list && (
                    <ul className="mt-4 space-y-2.5">
                      {s.list.map((li) => (
                        <li key={li} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                          <span className="w-5 h-5 rounded-full bg-sapphire-light grid place-items-center shrink-0 mt-0.5">
                            <Check size={12} className="text-sapphire" />
                          </span>
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* Key takeaways */}
          {a.takeaways && a.takeaways.length > 0 && (
            <Reveal>
              <div className="mt-12 rounded-3xl bg-ink text-white p-7 lg:p-9">
                <h2 className="font-display text-xl font-medium mb-4 text-frost">Key takeaways</h2>
                <ul className="space-y-3">
                  {a.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-white/85">
                      <Check size={16} className="text-frost mt-0.5 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Money-page CTAs */}
          {a.moneyLinks && a.moneyLinks.length > 0 && (
            <Reveal>
              <div className="mt-10 flex flex-wrap items-center gap-2.5">
                <span className="text-muted font-semibold text-sm mr-1">Related:</span>
                {a.moneyLinks.map((m) => (
                  <Link key={m.to} to={m.to} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sapphire text-white text-sm font-semibold hover:bg-sapphire-deep transition-colors">
                    {m.label} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          <div className="mt-12 pt-8 border-t border-line">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sapphire font-semibold text-sm hover:gap-3 transition-all">
              <ArrowLeft size={15} /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {a.faqs && a.faqs.length > 0 && <FaqSection title="Frequently asked questions" faqs={a.faqs} />}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-14 sm:py-20 bg-cream">
          <div className="container-x">
            <Reveal>
              <h2 className="section-title mb-8">Related <em>reading</em></h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 3) * 0.08}>
                  <Link to={`/blog/${r.slug}`} className="group block rounded-2xl overflow-hidden bg-white border border-line hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <Picture src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="text-[0.62rem] tracking-[0.2em] uppercase text-sapphire font-semibold mb-1.5">{r.category}</div>
                      <h3 className="font-display text-lg font-semibold text-ink leading-tight group-hover:text-sapphire transition-colors">{r.title}</h3>
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
