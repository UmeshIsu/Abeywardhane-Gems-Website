import {
  ShieldCheck,
  Globe2,
  Gem,
  Award,
  Handshake,
  Microscope,
} from 'lucide-react';

/* Company proof points (count-up statistics) */
export const stats = [
  { value: 572, suffix: '+', label: 'Carats of rough gems', sub: 'Sourced over the last 2 years' },
  { value: 100, suffix: '+', label: 'Dealers worldwide', sub: 'Who trust our sourcing' },
  { value: 25, suffix: '+', label: 'Export destinations', sub: 'Across four continents' },
  { value: 100, suffix: '%', label: 'Certified authenticity', sub: 'Independently graded' },
];

/* Why international buyers choose Abeywardhane */
export const differentiators = [
  {
    icon: ShieldCheck,
    title: 'Verified Authenticity',
    text: 'Every stone is independently graded and traceable to a verified Sri Lankan source, no guesswork, ever.',
  },
  {
    icon: Microscope,
    title: 'Gemologist Expertise',
    text: 'Calibrated evaluation of colour, clarity, cut and carat by qualified gemologists before any gem reaches you.',
  },
  {
    icon: Globe2,
    title: 'Global Trade Network',
    text: 'An established network of wholesalers, retailers and collectors spanning multiple continents.',
  },
  {
    icon: Handshake,
    title: 'Transparent Dealing',
    text: 'Honest appraisals, clear communication and secure logistics on every transaction, large or small.',
  },
];

/* Export-market presence (used by the global-reach section) */
export const markets = [
  { region: 'Europe', cities: 'Geneva · Antwerp · London' },
  { region: 'Middle East', cities: 'Dubai · Doha' },
  { region: 'Asia Pacific', cities: 'Bangkok · Hong Kong · Singapore' },
  { region: 'Americas', cities: 'New York · Los Angeles' },
];

/* Trust / certification labels for the marquee bar */
export const trustMarks = [
  'Ethically Sourced',
  'Gemologist Verified',
  'Independent Grading',
  'Direct From Mine',
  'Secure Global Logistics',
  'Transparent Pricing',
  'Conflict Free Origin',
];

/* Certification & quality-assurance pillars */
export const certifications = [
  {
    icon: Award,
    title: 'Independent Grading',
    text: 'Stones are submitted for independent gemological assessment so buyers receive an objective, documented evaluation.',
  },
  {
    icon: Gem,
    title: 'Origin Traceability',
    text: 'We trace every gemstone back to its Sri Lankan mine of origin, supporting ethical, conflict-free provenance.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    text: 'A meticulous, multi-stage review of colour, clarity, cut and carat guarantees consistent, investment-grade quality.',
  },
];

/* Client testimonials */
export const testimonials = [
  {
    quote:
      'A genuinely professional partner. The authentication and transparency around every stone gave our buyers complete confidence.',
    name: 'International Wholesale Buyer',
    role: 'Europe',
  },
  {
    quote:
      'Ceylon sapphires of exceptional clarity, handled with care from sourcing to secure delivery. A trusted long-term relationship.',
    name: 'Jewellery Manufacturer',
    role: 'Middle East',
  },
  {
    quote:
      'The gem tour was unforgettable, real access to mines and cutting houses, and honest pricing throughout the experience.',
    name: 'Private Collector',
    role: 'Asia Pacific',
  },
];
