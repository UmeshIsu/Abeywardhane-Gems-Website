/* =============================================================================
 *  About / E-E-A-T content for the company story page.
 *
 *  ⚠️  TODO-VERIFY (owner): fill in real names, gemmological credentials
 *      (GIA / FGA / etc.), founding year, awards and industry memberships.
 *      Team names & credentials render ONLY when provided, so the live page
 *      never shows invented identities — empty fields are simply hidden.
 * ========================================================================== */
import {
  Pickaxe, Scissors, Microscope, FileCheck, Plane,
  ShieldCheck, Fingerprint, ScrollText, Eye,
} from 'lucide-react';

/* Company story — written from existing, verifiable site claims. */
export const story = [
  'Abeywardhane Gems was born in the heart of Sri Lanka’s gem country — the island the ancient world knew as Ratna-Dweepa, the “Island of Gems.” For generations, the rivers and gravels around Ratnapura have yielded some of the finest sapphires on earth, and our work begins where those stones are found: at the source.',
  'We are a family of gem enthusiasts, gemologists and traders who bridge Sri Lanka’s artisanal mining heritage and the world’s most discerning buyers. By working directly with trusted miners and cutters, we control quality and provenance from the gravel to the finished gem — and pass that integrity on to every client.',
  'Today we serve international buyers, jewellery brands, collectors and investors across four continents, combining old-world expertise with modern certification, transparent dealing and secure global logistics.',
];

/* Mine-to-market journey (Experience + Expertise signals). */
export const journey = [
  { icon: Pickaxe, title: 'Sourced at the source', body: 'We partner directly with miners in Ratnapura and across Sabaragamuwa, selecting rough at the pit and tracing every stone to a verified Sri Lankan origin.' },
  { icon: Scissors, title: 'Cut by master lapidaries', body: 'Each gem is cut and polished by experienced Sri Lankan craftsmen to maximise colour, brilliance and life — the art that turns rough into treasure.' },
  { icon: Microscope, title: 'Evaluated by gemologists', body: 'Our gemologists assess colour, clarity, cut and carat with calibrated instruments, and identify any treatment, so every grade is objective and documented.' },
  { icon: FileCheck, title: 'Independently certified', body: 'Stones are submitted to internationally recognised laboratories for grading and, where relevant, origin and treatment reports.' },
  { icon: Plane, title: 'Delivered worldwide', body: 'Finished, certified gems are exported with discreet, fully insured, tracked logistics to buyers across Europe, the Middle East, Asia and the Americas.' },
];

/* Gemstone authenticity & verification process (Trust signals). */
export const authenticity = [
  { icon: Fingerprint, title: 'Source verification & traceability', body: 'Every gem is traced to a known Sri Lankan mine for conflict-free, ethical provenance you can stand behind.' },
  { icon: Microscope, title: 'Natural-origin testing', body: 'Gemological examination confirms the stone is natural — never synthetic or simulant — and identifies species and variety.' },
  { icon: Eye, title: 'Treatment detection & disclosure', body: 'We determine treatment status (e.g. heated vs. unheated) and disclose it on every stone, in writing, without exception.' },
  { icon: ScrollText, title: 'Independent certification', body: 'For any significant stone we provide a report from a recognised laboratory, so your confidence rests on objective evidence.' },
];

/* Team / gemologist & founder profiles.
   `name` and `credentials` render only when filled in (TODO-VERIFY). */
export const team = [
  {
    role: 'Founder & Chief Gemologist',
    name: '', // TODO-VERIFY
    credentials: '', // TODO-VERIFY e.g. 'GIA Graduate Gemologist'
    bio: 'Leads stone selection and grading, drawing on a lifetime in Sri Lanka’s gem trade and a deep network of trusted mining and cutting partners.',
  },
  {
    role: 'Head of Sourcing & Mine Relations',
    name: '', // TODO-VERIFY
    credentials: '',
    bio: 'Works hand-in-hand with miners across the Ratnapura region to secure fine rough at the source and uphold ethical, traceable provenance.',
  },
  {
    role: 'Quality Assurance Gemologist',
    name: '', // TODO-VERIFY
    credentials: '', // TODO-VERIFY
    bio: 'Conducts the multi-stage review of colour, clarity, cut and carat — and verifies treatment status — before any gem is offered to a client.',
  },
  {
    role: 'Export & Client Relations',
    name: '', // TODO-VERIFY
    credentials: '',
    bio: 'Coordinates certification, documentation and secure international shipping, and is the point of contact for buyers and trade partners worldwide.',
  },
];

/* Industry memberships / accreditations.
   Left empty by default — add ONLY bodies the company genuinely belongs to,
   so the site never makes an unverified affiliation claim.
   Common examples to confirm: National Gem & Jewellery Authority (NGJA) of
   Sri Lanka; Sri Lanka Gem & Jewellery Association; International Colored
   Gemstone Association (ICA). */
export const memberships = [
  // { name: 'National Gem & Jewellery Authority (NGJA), Sri Lanka', note: 'Registered gem dealer / exporter' },
]; // TODO-VERIFY

/* Quick trust badges (verifiable, value-neutral statements). */
export const trustBadges = [
  { icon: ShieldCheck, label: 'Ethically & traceably sourced' },
  { icon: Microscope, label: 'Gemologist-verified' },
  { icon: FileCheck, label: 'Independent certification' },
  { icon: Plane, label: 'Secure worldwide export' },
];
