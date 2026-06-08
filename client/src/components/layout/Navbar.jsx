import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from 'lucide-react';
import { navLinks, contactInfo } from '@/data/site';
import { services } from '@/data/services';
import { useScrollNav } from '@/hooks/useScrollNav';
import BrandLogo from '@/components/ui/BrandLogo';

const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollNav(40);

  const navCls = `fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-ink text-white ${
    scrolled
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
                    `flex items-center gap-1 text-[0.78rem] font-bold uppercase tracking-[0.06em] py-1.5 relative transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-frost after:transition-all ${
                      isActive ? 'text-white after:w-full' : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
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
