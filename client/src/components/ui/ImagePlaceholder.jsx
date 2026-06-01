import { ImageIcon } from 'lucide-react';

/**
 * A polished placeholder shown when the owner hasn't uploaded
 * the real photo yet. Drops in anywhere an <img> would go.
 *
 *   <ImagePlaceholder label="Replace with rough sapphire photo" aspect="4/3" />
 *
 * Props:
 *   src      - if provided, renders the real image instead
 *   label    - hint shown inside the placeholder (e.g. "Add a photo here")
 *   filename - small hint at the bottom (e.g. "purchasing-1.jpg")
 *   aspect   - tailwind aspect ratio class suffix (default "4/3")
 *   alt      - alt text for the real image
 */
export default function ImagePlaceholder({
  src,
  label = 'Add a photo here',
  filename,
  aspect = '4/3',
  alt = '',
  className = '',
}) {
  // If a real image has been wired in, just render it
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl shadow-soft group ${className}`} style={{ aspectRatio: aspect }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  // Otherwise show a nice placeholder
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border-2 border-dashed border-sapphire/25 bg-gradient-to-br from-sapphire-light/40 via-white to-cream grid place-items-center text-center px-6 ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3 text-ink-soft">
        <div className="w-14 h-14 rounded-2xl bg-white grid place-items-center text-sapphire shadow-soft">
          <ImageIcon size={26} strokeWidth={1.5} />
        </div>
        <div className="font-semibold text-ink text-sm">{label}</div>
        {filename && (
          <div className="text-[0.72rem] text-muted font-mono px-3 py-1 rounded-full bg-white/70 border border-line">
            {filename}
          </div>
        )}
      </div>
    </div>
  );
}
