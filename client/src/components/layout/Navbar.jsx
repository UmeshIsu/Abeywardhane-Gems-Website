import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, ArrowUpRight, Globe } from 'lucide-react';
import { navLinks, contactInfo } from '@/data/site';
import { services } from '@/data/services';
import { useScrollNav } from '@/hooks/useScrollNav';
import BrandLogo from '@/components/ui/BrandLogo';

const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/* ====================================================================
   Flag SVG components (inline for zero-dependency, crisp rendering)
   ==================================================================== */
const ChinaFlag = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={size} height={size * 0.667} className="rounded-[3px] shrink-0">
    <rect fill="#EE1C25" width="900" height="600" />
    <g transform="translate(150,120)" fill="#FFDE00">
      <polygon points="0,-60 17,-18 58,-23 27,7 35,50 0,25 -35,50 -27,7 -58,-23 -17,-18" />
    </g>
    <g transform="translate(300,60)" fill="#FFDE00">
      <polygon points="0,-20 6,-6 19,-8 9,2 12,17 0,8 -12,17 -9,2 -19,-8 -6,-6" />
    </g>
    <g transform="translate(360,120)" fill="#FFDE00">
      <polygon points="0,-20 6,-6 19,-8 9,2 12,17 0,8 -12,17 -9,2 -19,-8 -6,-6" />
    </g>
    <g transform="translate(360,200)" fill="#FFDE00">
      <polygon points="0,-20 6,-6 19,-8 9,2 12,17 0,8 -12,17 -9,2 -19,-8 -6,-6" />
    </g>
    <g transform="translate(300,260)" fill="#FFDE00">
      <polygon points="0,-20 6,-6 19,-8 9,2 12,17 0,8 -12,17 -9,2 -19,-8 -6,-6" />
    </g>
  </svg>
);

const TaiwanFlag = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={size} height={size * 0.667} className="rounded-[3px] shrink-0">
    <rect fill="#FE0000" width="900" height="600" />
    <rect fill="#000095" width="450" height="300" />
    <circle cx="225" cy="150" r="73" fill="#FFF" />
    <circle cx="225" cy="150" r="60" fill="#000095" />
    <g fill="#FFF" transform="translate(225,150)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
        <line key={a} x1="0" y1="-73" x2="0" y2="-95" stroke="#FFF" strokeWidth="5" transform={`rotate(${a})`} />
      ))}
    </g>
  </svg>
);

const UKFlag = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width={size} height={size * 0.5} className="rounded-[3px] shrink-0">
    <clipPath id="s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
    <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const ThaiFlag = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width={size} height={size * 0.667} className="rounded-[3px] shrink-0">
    <rect fill="#ED1C24" width="900" height="600" />
    <rect fill="#FFF" y="100" width="900" height="400" />
    <rect fill="#241D4F" y="200" width="900" height="200" />
  </svg>
);

/* ====================================================================
   Language definitions
   ==================================================================== */
const LANGUAGES = [
  { code: 'zh-CN', label: '简体中文', Flag: ChinaFlag },
  { code: 'zh-TW', label: '繁體中文', Flag: TaiwanFlag },
  { code: 'en', label: 'English', Flag: UKFlag },
  { code: 'th', label: 'ไทย', Flag: ThaiFlag },
];

/* ====================================================================
   Cookie helpers, Google Translate reads /googtrans to decide language
   ==================================================================== */
function getActiveLanguage() {
  if (typeof document === 'undefined') return 'en'; // SSR / prerender
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : 'en';
}

function setLanguage(langCode) {
  const val = langCode === 'en' ? '/en/en' : `/en/${langCode}`;
  const host = window.location.hostname; // e.g. www.abeywardhanegems.com

  // Resolve the apex domain (e.g. www.abeywardhanegems.com → .abeywardhanegems.com)
  const parts = host.split('.');
  const apex = parts.length >= 2 ? '.' + parts.slice(-2).join('.') : '';

  // Aggressively clear old googtrans cookies at every domain level
  const expiry = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = `googtrans=; ${expiry}; path=/;`;
  document.cookie = `googtrans=; ${expiry}; path=/; domain=${host};`;
  document.cookie = `googtrans=; ${expiry}; path=/; domain=.${host};`;
  if (apex) {
    document.cookie = `googtrans=; ${expiry}; path=/; domain=${apex};`;
  }

  // Set the new cookie, must be on the apex domain for Google Translate to read it
  document.cookie = `googtrans=${val}; path=/;`;
  if (apex) {
    document.cookie = `googtrans=${val}; path=/; domain=${apex};`;
  }

  window.location.reload();
}

/* ====================================================================
   Navbar component
   ==================================================================== */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const scrolled = useScrollNav(40);
  const langRef = useRef(null);

  // SSR-safe default; the real language is read from the cookie on the client
  // (avoids a hydration mismatch when a visitor previously picked a language).
  const [activeLang, setActiveLang] = useState('en');
  const activeEntry = LANGUAGES.find((l) => l.code === activeLang) || LANGUAGES[2]; // default English

  useEffect(() => { setActiveLang(getActiveLanguage()); }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navCls = `fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-ink text-white ${scrolled
      ? 'shadow-[0_2px_24px_rgba(0,0,0,0.35)] py-2'
      : 'py-3'
    }`;

  return (
    <>
      <nav className={navCls}>
        <div className="container-x flex items-center justify-between gap-6">
          <BrandLogo />

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-[0.78rem] font-bold uppercase tracking-[0.06em] py-1.5 relative transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-frost after:transition-all ${isActive ? 'text-white after:w-full' : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
                    }`
                  }
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                </NavLink>

                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-deep border border-line w-[380px] p-2.5 grid grid-cols-1 gap-0.5">
                      {link.dropdown.map((sub) => {
                        const svc = serviceBySlug[sub.to];
                        const Icon = svc?.icon;
                        return (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            className="group/item flex items-start gap-3 px-3.5 py-2.5 rounded-xl hover:bg-cream transition-colors"
                          >
                            {Icon && (
                              <span className="w-8 h-8 rounded-lg bg-sapphire-light text-sapphire grid place-items-center shrink-0 group-hover/item:bg-sapphire group-hover/item:text-white transition-colors">
                                <Icon size={16} strokeWidth={1.8} />
                              </span>
                            )}
                            <span className="min-w-0">
                              <span className="flex items-center gap-1 font-semibold text-ink text-[0.82rem] leading-tight">
                                {sub.label}
                                <ArrowUpRight size={13} className="opacity-0 group-hover/item:opacity-100 text-sapphire transition-opacity" />
                              </span>
                              {svc?.description && (
                                <span className="block text-xs text-muted mt-1 leading-snug line-clamp-2">{svc.description}</span>
                              )}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            {/* Desktop language selector */}
            <div className="hidden lg:block relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.06em] py-1.5 text-white/80 hover:text-white transition-colors"
                aria-label="Select language"
              >
                <activeEntry.Flag size={18} />
                <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-3 bg-white rounded-2xl shadow-deep border border-line w-[200px] py-2 z-50"
                  >
                    {LANGUAGES.map(({ code, label, Flag }) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => { setLangOpen(false); setLanguage(code); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[0.82rem] transition-colors ${code === activeLang
                            ? 'bg-sapphire-light text-sapphire font-semibold'
                            : 'text-ink hover:bg-cream'
                          }`}
                      >
                        <Flag size={22} />
                        <span className="font-semibold">{label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 font-semibold text-xs text-white/80 hover:text-white transition"
            >
              <Phone size={13} /> {contactInfo.phone}
            </a>
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sapphire text-white text-xs font-semibold hover:bg-sapphire-deep transition-all hover:-translate-y-0.5 shadow-glow"
            >
              Get in Touch
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 grid place-items-center text-white"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className="fixed top-0 right-0 z-50 h-full w-[88%] max-w-sm bg-white pt-24 px-8 pb-8 overflow-y-auto shadow-[-20px_0_60px_rgba(0,0,0,0.15)] lg:hidden"
            >
              {navLinks.map((link) => (
                <div key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3.5 text-[1.05rem] font-semibold border-b border-line ${isActive ? 'text-sapphire' : 'text-ink hover:text-sapphire'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {link.dropdown && (
                    <div className="pl-4 py-2">
                      {link.dropdown.map((sub) => (
                        <Link key={sub.label} to={sub.to} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted hover:text-sapphire">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile language selector */}
              <div className="mt-6 pt-6 border-t border-line">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted mb-3">
                  <Globe size={14} /> Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map(({ code, label, Flag }) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => { setOpen(false); setLanguage(code); }}
                      className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${code === activeLang
                          ? 'bg-sapphire text-white'
                          : 'bg-cream text-ink hover:bg-sapphire-light'
                        }`}
                    >
                      <Flag size={22} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-7 inline-flex items-center justify-center w-full gap-2 px-5 py-3.5 rounded-full bg-sapphire text-white font-semibold hover:bg-sapphire-deep transition"
              >
                Get in Touch
              </Link>
              <a href={`tel:${contactInfo.phoneRaw}`} className="block mt-4 text-center text-sapphire font-semibold">
                {contactInfo.phone}
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
