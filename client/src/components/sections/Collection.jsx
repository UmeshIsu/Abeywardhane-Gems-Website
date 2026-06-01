import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { gems } from '@/data/gems';

export default function Collection() {
  return (
    <section id="collection" className="py-24 lg:py-32 bg-white">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal><span className="eyebrow">See Our Latest</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title mb-5">Gem <em>Collection</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted text-[1.05rem]">
              Hover over each piece to discover its story — every gem in our collection is handpicked, ethically sourced and gemologist certified.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gems.map((gem, i) => (
            <Reveal key={gem.id} delay={(i % 4) * 0.1}>
              <GemCard gem={gem} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="text-center mt-16">
            <Button to="/gallery" variant="primary">View Full Gallery</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GemCard({ gem }) {
  return (
    <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft hover:shadow-deep transition-all duration-500 hover:-translate-y-1.5 cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${gem.image})` }}
      />

      {/* Idle name (subtle, visible by default) */}
      <div className="absolute bottom-0 inset-x-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
        <div className="font-display text-lg font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          {gem.name}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-7">
        <div className="text-white translate-y-5 group-hover:translate-y-0 transition-transform duration-500">
          <span className="block text-[0.68rem] tracking-[0.25em] uppercase text-gold font-semibold mb-2">
            {gem.tag}
          </span>
          <h3 className="font-display text-2xl font-semibold leading-tight mb-2">{gem.name}</h3>
          <p className="text-sm text-white/80 max-w-xs leading-snug">{gem.description}</p>
        </div>
      </div>
    </div>
  );
}
