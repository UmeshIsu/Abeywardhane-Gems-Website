/**
 * Drop-in replacement for <img> that serves AVIF → WebP → original, using the
 * optimized siblings produced by scripts/optimize-images.mjs (e.g. for
 * "/team.jpg" it offers "/team.avif" and "/team.webp", falling back to the jpg).
 *
 * All <img> attributes (className, width, height, loading, fetchPriority, alt…)
 * pass straight through. <picture> uses display:contents so it never affects
 * layout. Non-raster / remote sources render as a plain <img>.
 */
export default function Picture({ src, alt = '', ...imgProps }) {
  const isLocalRaster = /^\/[^?]+\.(jpe?g|png)$/i.test(src);
  if (!isLocalRaster) return <img src={src} alt={alt} {...imgProps} />;

  const base = src.replace(/\.(jpe?g|png)$/i, '');
  return (
    <picture className="contents">
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img src={src} alt={alt} {...imgProps} />
    </picture>
  );
}
