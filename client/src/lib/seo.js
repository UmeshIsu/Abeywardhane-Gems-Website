/* =============================================================================
 *  JSON-LD schema builders.  All values come from the site config (never
 *  `window`), so they render identically on the server (build-time prerender)
 *  and the client.  Compose multiple nodes with `graph(...)`.
 *
 *  Validate output at https://search.google.com/test/rich-results
 * ========================================================================== */
import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  businessInfo,
  sameAs,
} from '@/data/site';

/* Join the canonical origin with a path → absolute URL (SSR-safe). */
export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path; // already absolute
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/* Stable @id anchors so nodes can reference each other across the graph. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = () => {
  const a = businessInfo.address;
  return {
    '@type': 'PostalAddress',
    ...(a.streetAddress ? { streetAddress: a.streetAddress } : {}),
    addressLocality: a.locality,
    addressRegion: a.region,
    ...(a.postalCode ? { postalCode: a.postalCode } : {}),
    addressCountry: a.country,
  };
};

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo-full.png`,
    },
    image: DEFAULT_OG_IMAGE,
    description: SITE_DESCRIPTION,
    ...(businessInfo.foundingDate ? { foundingDate: businessInfo.foundingDate } : {}),
    email: businessInfo.email,
    telephone: businessInfo.phoneRaw,
    address: postalAddress(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessInfo.phoneRaw,
      email: businessInfo.email,
      contactType: 'sales',
      areaServed: businessInfo.areaServed,
      availableLanguage: ['en'],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/* The local storefront / exporter entity. Use on the homepage + contact page. */
export function localBusinessSchema() {
  return {
    '@type': ['Store', 'JewelryStore'],
    '@id': ORG_ID,
    name: SITE_NAME,
    image: DEFAULT_OG_IMAGE,
    logo: `${SITE_URL}/logo-full.png`,
    url: SITE_URL,
    telephone: businessInfo.phoneRaw,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    description: SITE_DESCRIPTION,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    areaServed: businessInfo.areaServed,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/* items: [{ label, to }] — `to` is a site-relative path; the last crumb may omit it. */
export function breadcrumbSchema(items = []) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: absoluteUrl(c.to) } : {}),
    })),
  };
}

/* gem: { id, name, description, image, tag } */
export function productSchema(gem, { path } = {}) {
  return {
    '@type': 'Product',
    name: gem.name,
    description: gem.description,
    image: absoluteUrl(gem.image),
    ...(path ? { url: absoluteUrl(path) } : {}),
    category: gem.tag || 'Gemstone',
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
      url: path ? absoluteUrl(path) : SITE_URL,
    },
  };
}

/* faqs: [{ q, a }] */
export function faqSchema(faqs = []) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/* post: { title, excerpt|description, image, date|datePublished, path } */
export function articleSchema(post) {
  return {
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.description,
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    ...(post.datePublished || post.date ? { datePublished: post.datePublished || post.date } : {}),
    ...(post.path ? { mainEntityOfPage: absoluteUrl(post.path) } : {}),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function serviceSchema({ name, description, path }) {
  return {
    '@type': 'Service',
    name,
    description,
    ...(path ? { url: absoluteUrl(path) } : {}),
    provider: { '@id': ORG_ID },
    areaServed: businessInfo.areaServed,
  };
}

/* Wrap any number of nodes in a single @graph document. Falsy nodes dropped. */
export function graph(...nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
