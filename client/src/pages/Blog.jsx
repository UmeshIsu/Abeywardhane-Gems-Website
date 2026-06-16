import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import Picture from '@/components/ui/Picture';
import { articlesByDate, articleBySlug } from '@/data/articles';
import { absoluteUrl } from '@/lib/seo';

export default function Blog() {
  const pillar = articleBySlug['ceylon-sapphire-buyers-guide'];
  const posts = articlesByDate.filter((a) => a.slug !== pillar?.slug);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Abeywardhane Gems — Gemstone Knowledge Center',
    url: absoluteUrl('/blog'),
    blogPost: articlesByDate.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      image: absoluteUrl(a.image),
      datePublished: a.date,
      url: absoluteUrl(`/blog/${a.slug}`),
    })),
  };

  return (
    <>
      <SEO
        title="Gemstone Knowledge Center — Ceylon Sapphire Guides & Articles"
        description="Expert guides on Ceylon sapphire quality, gemstone authentication, certification, padparadscha, pricing, investment and Sri Lanka’s gem trade — from Abeywardhane Gems."
        path="/blog"
        schema={blogSchema}
      />
      <PageHeader
        eyebrow="Gemstone Knowledge Center"
        title="Ceylon Gem Guides & Articles"
        breadcrumb={[{ label: 'Abeywardhane Gems', to: '/' }, { label: 'Blog' }]}
      />

      <section className="py-14 sm:py-20 bg-white">
        <div className="container-x">
          {/* Featured pillar */}
          {pillar && (
            <Reveal>
              <Link
                to={`/blog/${pillar.slug}`}
                className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 rounded-3xl border border-line bg-cream/40 overflow-hidden hover:shadow-card transition-all duration-300"
              >
                <div className="aspect-[16/11] lg:aspect-auto lg:h-full overflow-hidden">
                  <Picture src={pillar.image} alt={pillar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7 lg:pr-10 lg:py-10">
                  <span className="inline-block text-[0.62rem] tracking-[0.22em] uppercase text-sapphire font-bold mb-3">Pillar Guide · {pillar.readingTime}</span>
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold text-ink leading-tight mb-3 group-hover:text-sapphire transition-colors">{pillar.title}</h2>
                  <p className="text-ink-soft text-[0.95rem] leading-relaxed mb-5">{pillar.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sapphire font-semibold text-sm">Read the guide <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Article grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-cream">
                    <Picture src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-3 text-[0.7rem] text-muted font-semibold mb-2">
                    <span className="inline-flex items-center gap-1 text-sapphire uppercase tracking-[0.15em]">{post.category}</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {post.dateDisplay}</span>
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span>
                  </div>
                  <h2 className="font-display text-xl font-semibold text-ink leading-tight group-hover:text-sapphire transition-colors">{post.title}</h2>
                  <p className="text-muted mt-2 text-sm line-clamp-3">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
