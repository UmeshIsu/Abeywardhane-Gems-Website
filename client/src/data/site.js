/* =============================================================================
 *  SINGLE SOURCE OF TRUTH for site-wide SEO, branding and business identity.
 *  Every meta tag, canonical URL, JSON-LD schema, footer line and contact
 *  block reads from here so the site can never disagree with itself
 *  (NAP consistency is foundational for local / entity SEO).
 *
 *  ⚠️  TODO (business owner): confirm every value marked `TODO-VERIFY`.
 *      Search-engine trust depends on this matching your Google Business
 *      Profile, certificates and letterhead EXACTLY.
 * ========================================================================== */

/* The ONE canonical origin. The live host 308-redirects non-www → www, so
   www is canonical. Everything (canonicals, OG URLs, sitemap, schema) uses it.
   No trailing slash. */
export const SITE_URL = 'https://www.abeywardhanegems.com';

export const SITE_NAME = 'Abeywardhane Gems';
export const SITE_LEGAL_NAME = 'Abeywardhane Gems (Pvt) Ltd'; // TODO-VERIFY registered legal name
export const SITE_TAGLINE = 'Natural Ceylon Sapphires & Certified Gemstones';

/* Default meta description — used when a page doesn't supply its own. */
export const SITE_DESCRIPTION =
  'Buy natural, certified Ceylon sapphires and gemstones direct from the source in Sri Lanka. Ethically sourced, gemologist-verified blue, yellow, pink & padparadscha sapphires — wholesale and export worldwide.';

/* Absolute social-share image (1200×630). Must be absolute so non-JS crawlers
   (Facebook, LinkedIn, WhatsApp, X) can resolve it. Replace /public/og-default.jpg
   with a branded 1200×630 card any time — keep the filename or update this line. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

/* -----------------------------------------------------------------------------
 *  Structured business identity (drives LocalBusiness / Organization schema).
 * -------------------------------------------------------------------------- */
export const businessInfo = {
  legalName: SITE_LEGAL_NAME,
  name: SITE_NAME,
  email: 'info@abeywardhanegems.com',
  phone: '+94 74 030 4669',
  phoneRaw: '+94740304669',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '94740304669',
  priceRange: '$$$',
  foundingDate: '', // TODO-VERIFY e.g. '2015'
  address: {
    // Pelmadulla is a town in Ratnapura District, Sabaragamuwa Province —
    // reconciles the two conflicting addresses that existed in the codebase.
    streetAddress: '', // TODO-VERIFY exact street / building, e.g. '142/A, Main Street'
    locality: 'Pelmadulla',
    region: 'Sabaragamuwa Province',
    postalCode: '', // TODO-VERIFY
    country: 'LK',
    display: 'Pelmadulla, Ratnapura District, Sri Lanka',
  },
  geo: {
    // TODO-VERIFY exact coordinates of the premises (currently approx. Ratnapura)
    latitude: 6.6828,
    longitude: 80.3992,
  },
  // Areas the business serves (for areaServed in schema).
  areaServed: ['Worldwide', 'Sri Lanka', 'Europe', 'Middle East', 'Asia Pacific', 'North America'],
};

/* Social / external profiles — also used as schema `sameAs`. Only links with a
   real URL render in the footer; '' entries are skipped (no dead `href="#"`). */
export const socialLinks = {
  facebook: 'https://web.facebook.com/profile.php?id=61558997588300',
  instagram: 'https://www.instagram.com/abeywardhanegems/',
  whatsapp: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94740304669'}`,
};

/* Flat list of profile URLs for schema `sameAs` (drops empties). */
export const sameAs = Object.values(socialLinks).filter(
  (u) => u && !u.startsWith('https://wa.me'),
);

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'Gem Purchasing And Selling', to: '/services/gem-purchasing' },
      { label: 'Coordinating International Gem Market', to: '/services/international-market' },
      { label: 'Expose Visit & Internship Program', to: '/services/gemology-program' },
      { label: 'Organizing & Facilitating Gem Tourism', to: '/services/gem-tourism' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

/* Back-compat contact block (consumed by Footer / Contact / WhatsApp helpers).
   Sourced from businessInfo so there is exactly one address in the codebase. */
export const contactInfo = {
  phone: businessInfo.phone,
  phoneRaw: businessInfo.phoneRaw,
  email: businessInfo.email,
  whatsapp: businessInfo.whatsapp,
  address: businessInfo.address.display,
  mapEmbed:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    'https://maps.google.com/maps?q=Pelmadulla,%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed',
};
