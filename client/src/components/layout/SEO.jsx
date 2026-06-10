import { Head } from 'vite-react-ssg';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from '@/data/site';

/**
 * Per-page <head>. SSR-safe — every value is derived from static config or
 * props (never `window`), so it renders identically during the build-time
 * prerender and on the client.
 *
 * @param {string}  [title]       Page title (keyword-first). Rendered as
 *                                "{title} | Abeywardhane Gems". Omit on home.
 * @param {string}  [description] Meta/OG/Twitter description.
 * @param {string}  [path]        Site-relative path for the canonical + og:url,
 *                                e.g. "/services". Defaults to "/".
 * @param {string}  [image]       OG/Twitter image (absolute or site-relative).
 * @param {string}  [imageAlt]    Accessible description of the share image.
 * @param {string}  [type]        og:type ("website" | "article" | …).
 * @param {boolean} [noindex]     Emit robots noindex,nofollow (404s, etc.).
 * @param {object}  [schema]      JSON-LD object (use builders in lib/seo.js).
 */
export default function SEO({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  schema,
}) {
  const metaTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const metaDescription = description || SITE_DESCRIPTION;
  const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const rawImage = image || DEFAULT_OG_IMAGE;
  const metaImage = /^https?:\/\//i.test(rawImage) ? rawImage : `${SITE_URL}${rawImage}`;
  const metaImageAlt = imageAlt || metaTitle;

  return (
    <Head>
      {/* Basic metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAlt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={metaImageAlt} />

      {/* Structured data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Head>
  );
}
