import { Mail, Phone, MapPin } from 'lucide-react';
import { whatsappHref } from '@/lib/whatsapp';
import { contactInfo } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import PageHeader from '@/components/layout/PageHeader';
import SEO from '@/components/layout/SEO';
import InquiryForm from '@/components/ui/InquiryForm';
import { graph, localBusinessSchema, absoluteUrl } from '@/lib/seo';

const contactSchema = graph(
  localBusinessSchema(),
  {
    '@type': 'ContactPage',
    name: 'Contact Abeywardhane Gems',
    url: absoluteUrl('/contact'),
    description:
      'Contact Abeywardhane Gems to enquire about natural Ceylon sapphires, certified gemstones, wholesale supply and gem export from Sri Lanka.',
  },
);

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us — Enquire About Ceylon Sapphires & Gem Export"
        description="Get in touch with Abeywardhane Gems in Sri Lanka. Enquire about natural Ceylon sapphires, certified gemstones, wholesale orders and worldwide gem export. Call, email or WhatsApp us."
        path="/contact"
        schema={contactSchema}
      />
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        breadcrumb={[{ label: 'Abeywardhane Gems', to: '/' }, { label: 'Contact' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12">
          {/* Info column */}
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink mb-3">Let's connect.</h2>
              <p className="text-ink-soft mb-10">
                Reach out through any channel below — or scroll down to find us on the map.
              </p>

              <ul className="space-y-6 mb-10">
                <ContactRow icon={Phone} label="Phone" value={contactInfo.phone} href={`tel:${contactInfo.phoneRaw}`} />
                <ContactRow icon={Mail} label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
                <ContactRow icon={MapPin} label="Address" value={contactInfo.address} />
              </ul>

              <a
                href={whatsappHref('Hi! I have a question about your gems.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebc59] transition shadow-[0_10px_30px_rgba(37,211,102,0.3)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.945-5.36 11.948-11.893a11.821 11.821 0 00-3.487-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <InquiryForm className="bg-cream rounded-3xl p-8 lg:p-10 shadow-soft" />
          </Reveal>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-x">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-deep aspect-[16/9] lg:aspect-[21/9] border border-line">
              <iframe
                title="Abeywardhane Gems location"
                src={contactInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <>
      <span className="w-12 h-12 rounded-full bg-sapphire-light text-sapphire grid place-items-center shrink-0">
        <Icon size={18} />
      </span>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted font-semibold">{label}</div>
        <div className="text-ink font-medium mt-0.5">{value}</div>
      </div>
    </>
  );
  return (
    <li className="flex items-center gap-4">
      {href ? <a href={href} className="flex items-center gap-4 hover:text-sapphire transition">{inner}</a> : inner}
    </li>
  );
}
