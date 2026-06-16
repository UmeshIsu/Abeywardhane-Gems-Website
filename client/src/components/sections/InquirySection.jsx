import { Mail, Phone } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import InquiryForm from '@/components/ui/InquiryForm';
import { whatsappHref } from '@/lib/whatsapp';
import { contactInfo } from '@/data/site';
import { trustBadges } from '@/data/about';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.945-5.36 11.948-11.893a11.821 11.821 0 00-3.487-8.413z" />
  </svg>
);

/**
 * Conversion block for money pages: inquiry form (pre-tagged by `subject`),
 * trust badges and direct contact alternatives.
 */
export default function InquirySection({
  subject = '',
  heading = 'Request a certified stone',
  blurb = 'Tell us what you’re looking for and our gemologists will reply with matched, certified options and transparent pricing — no obligation.',
  whatsappMessage = 'Hi! I would like to make an enquiry.',
}) {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-cream">
      <div className="container-x grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
        <Reveal>
          <div>
            <span className="eyebrow">Make an Enquiry</span>
            <h2 className="section-title mb-4">{heading}</h2>
            <p className="lead mb-7">{blurb}</p>

            <ul className="grid sm:grid-cols-2 gap-2.5 mb-8">
              {trustBadges.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon size={16} className="text-sapphire shrink-0" /> {label}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebc59] transition shadow-[0_10px_30px_rgba(37,211,102,0.25)]"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" /> WhatsApp
              </a>
              <a href={`tel:${contactInfo.phoneRaw}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/15 text-ink font-semibold text-sm hover:bg-ink hover:text-white transition">
                <Phone size={15} /> {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/15 text-ink font-semibold text-sm hover:bg-ink hover:text-white transition">
                <Mail size={15} /> Email
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-white rounded-3xl p-7 lg:p-9 shadow-soft border border-line">
            <InquiryForm subject={subject} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
