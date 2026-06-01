import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { whatsappHref } from '@/lib/whatsapp';
import { contactInfo } from '@/data/site';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.3c1.5.8 3.3 1.3 5.2 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-ink text-white/70 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(700px 360px at 90% 0%, rgba(37,99,235,0.30), transparent 60%)' }}
      />
      <div className="relative container-x pt-16 pb-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-10 mb-12">
          <div>
            <div className="font-display text-white text-2xl font-semibold mb-3">
              Abeywardana <span className="italic text-frost">Gems</span>
              <div className="font-display text-white text-3xl font-semibold mb-4">
                Abeywardhane <span className="italic text-frost">Gems</span>
              </div>
              <p className="text-xs leading-relaxed mb-5 max-w-xs">
                Exposing Ceylon's finest gemstones to the world — curated, ethical and authentic, straight from the heart of Sri Lanka.
              </p>
              <div className="flex gap-3">
                {[{ Icon: Facebook, href: '#', label: 'Facebook' }, { Icon: Instagram, href: '#', label: 'Instagram' }].map(({ Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 grid place-items-center border border-white/15 rounded-full hover:bg-sapphire hover:border-sapphire transition-colors">
                    <Icon size={15} />
                  </a>
                ))}
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 grid place-items-center border border-white/15 rounded-full hover:bg-[#25D366] hover:border-[#25D366] transition-colors">
                  <WhatsAppIcon className="w-[15px] h-[15px]" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Services</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/services/gem-purchasing" className="hover:text-frost transition">Gem Purchasing &amp; Selling</Link></li>
                <li><Link to="/services/international-market" className="hover:text-frost transition">Int'l Gem Market</Link></li>
                <li><Link to="/services/gemology-program" className="hover:text-frost transition">Gemology Internship</Link></li>
                <li><Link to="/services/gem-tourism" className="hover:text-frost transition">Gem Tourism</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/" className="hover:text-frost transition">Home</Link></li>
                <li><Link to="/gallery" className="hover:text-frost transition">Gallery</Link></li>
                <li><Link to="/blog" className="hover:text-frost transition">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-frost transition">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5"><Phone size={15} className="mt-0.5 shrink-0 text-frost" /><a href={`tel:${contactInfo.phoneRaw}`} className="hover:text-frost">{contactInfo.phone}</a></li>
                <li className="flex items-start gap-2.5"><Mail size={15} className="mt-0.5 shrink-0 text-frost" /><a href={`mailto:${contactInfo.email}`} className="hover:text-frost">{contactInfo.email}</a></li>
                <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-frost" /><span>{contactInfo.address}</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span>© {year} Abeywardana Gems. All rights reserved.</span>
            <div className="border-t border-white/10 pt-7 flex flex-wrap items-center justify-between gap-4 text-xs">
              <span>© {year} Abeywardhane Gems. All rights reserved.</span>
              <span className="hidden sm:block text-white/40">Crafted with care in Sri Lanka.</span>
              <button onClick={toTop} className="inline-flex items-center gap-2 text-white/70 hover:text-frost transition group">
                Back to top
                <span className="w-7 h-7 rounded-full border border-white/20 grid place-items-center group-hover:border-frost transition-colors">
                  <ArrowUp size={13} />
                </span>
              </button>
            </div>
          </div>
        </footer>
        );
}
