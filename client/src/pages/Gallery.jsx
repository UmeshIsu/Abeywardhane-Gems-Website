import { useMemo, useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { gems } from '@/data/gems';

export default function Gallery() {
  const tags = useMemo(() => ['All', ...Array.from(new Set(gems.map((g) => g.tag)))], []);
  const [active, setActive] = useState('All');
  const list = active === 'All' ? gems : gems.filter((g) => g.tag === active);

  return (
    <>
      <PageHeader
        eyebrow="Our Latest"
        title="Gem Collection"
        breadcrumb={[{ label: 'Abeywardana Gems', to: '/' }, { label: 'Gallery' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap gap-2.5 mb-12">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    active === t ? 'bg-sapphire text-white shadow-glow' : 'bg-cream text-ink-soft hover:bg-tint border border-line'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((gem, i) => (
              <Reveal key={gem.id} delay={(i % 4) * 0.08}>
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft hover:shadow-deep transition-all duration-500 hover:-translate-y-1.5 cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${gem.image})` }} />
                  <div className="absolute bottom-0 inset-x-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="font-display text-lg font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">{gem.name}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-7">
                    <div className="text-white translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="block text-[0.68rem] tracking-[0.25em] uppercase text-frost font-semibold mb-2">{gem.tag}</span>
                      <h3 className="font-display text-2xl font-semibold leading-tight mb-2">{gem.name}</h3>
                      <p className="text-sm text-white/80 leading-snug">{gem.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
