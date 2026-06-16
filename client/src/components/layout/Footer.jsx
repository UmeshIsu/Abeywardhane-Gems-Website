import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { whatsappHref } from '@/lib/whatsapp';
import { contactInfo, socialLinks } from '@/data/site';
import { gemstoneLinks } from '@/data/gemstones';
import Picture from '@/components/ui/Picture';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.945-5.36 11.948-11.893a11.821 11.821 0 00-3.487-8.413z" />
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
        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr] gap-10 mb-12 items-start">
          <div>
            <Picture
              src="/logo-full.png"
              alt="Abeywardhane Gems (Pvt) Ltd — Ceylon Gemstones"
              className="w-full max-w-[320px] h-auto -ml-2 -mt-6 mb-1"
            />
            <div className="flex gap-3 -mt-2">
              {[
                { Icon: Facebook, href: socialLinks.facebook, label: 'Facebook' },
                { Icon: Instagram, href: socialLinks.instagram, label: 'Instagram' },
              ]
                .filter(({ href }) => href)
                .map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 grid place-items-center border border-white/15 rounded-full hover:bg-sapphire hover:border-sapphire transition-colors"
                  >
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
            <h4 className="text-white text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Gemstones</h4>
            <ul className="space-y-2.5 text-sm">
              {gemstoneLinks.map((g) => (
                <li key={g.slug}><Link to={g.to} className="hover:text-frost transition">{g.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs tracking-[0.25em] uppercase mb-5 font-semibold">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-frost transition">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-frost transition">Gallery</Link></li>
              <li><Link to="/wholesale-gemstones-sri-lanka" className="hover:text-frost transition">Wholesale Gemstones</Link></li>
              <li><Link to="/gem-export-services" className="hover:text-frost transition">Gem Export Services</Link></li>
              <li><Link to="/gem-exporters-sri-lanka" className="hover:text-frost transition">Gem Exporters Sri Lanka</Link></li>
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
