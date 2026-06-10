import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { breadcrumbSchema, graph } from '@/lib/seo';

/**
 * Premium dark header at the top of every inner page.
 *   <PageHeader eyebrow="Services" title="…" breadcrumb={[{label,to?}, …]} />
 *
 * Automatically emits BreadcrumbList JSON-LD from the same `breadcrumb` data,
 * so every page using it gets breadcrumb structured data with no extra code.
 */
export default function PageHeader({ eyebrow, title, breadcrumb = [] }) {
  return (
    <section className="relative bg-gradient-to-br from-ink via-[#13224a] to-ink text-white pt-28 pb-14 lg:pt-36 lg:pb-20 overflow-hidden">
      {breadcrumb.length > 0 && (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(graph(breadcrumbSchema(breadcrumb)))}
          </script>
        </Head>
      )}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(820px 420px at 82% 0%, rgba(37,99,235,0.55) 0%, transparent 60%), radial-gradient(620px 320px at 0% 100%, rgba(59,130,246,0.22) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-faint [background-size:52px_52px] opacity-[0.08]" />

      <div className="relative container-x">
        {eyebrow && (
          <div className="inline-flex items-center gap-2.5 text-xs tracking-[0.28em] uppercase text-electric font-bold mb-4">
            <span className="block w-6 h-px bg-electric/70" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display font-semibold leading-[1.08] mb-5 max-w-4xl" style={{ fontSize: 'clamp(1.8rem,4.5vw,3.2rem)' }}>
          {title}
        </h1>
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="pt-6 border-t border-white/15 max-w-3xl">
            <ol className="flex flex-wrap items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/60 font-semibold">
              {breadcrumb.map((crumb, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <li key={i} className="flex items-center gap-2">
                    {crumb.to && !last ? (
                      <Link to={crumb.to} className="hover:text-frost transition-colors">{crumb.label}</Link>
                    ) : (
                      <span className={last ? 'text-white' : ''}>{crumb.label}</span>
                    )}
                    {!last && <span className="text-white/35">›</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
