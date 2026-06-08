import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  schema
}) {
  const siteName = 'Abeywardhane Gems';
  const defaultTitle = 'Abeywardhane Gems — Exclusive Ceylon Gemstones';
  const defaultDescription = 'Exclusive handpicked Ceylon gemstones, custom jewellery, and gem tourism in Sri Lanka.';
  const defaultImage = `${window.location.origin}/sapphire-hero.png`;
  const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

  const metaTitle = title ? `${siteName} — ${title}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaKeywords = keywords || 'gems sri lanka, buy sapphire online, ceylon gemstones, natural blue sapphire, ratnapura gem mines, ethical gemstone sourcing';

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Schema Markup (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
