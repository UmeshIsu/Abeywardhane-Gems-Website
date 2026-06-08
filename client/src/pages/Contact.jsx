import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactApi } from '@/lib/api';
import { whatsappHref } from '@/lib/whatsapp';
import { contactInfo } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import PageHeader from '@/components/layout/PageHeader';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', msg: '' }); // idle|sending|success|error

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: 'error', msg: 'Please fill in name, email and message.' });
      return;
    }
    setStatus({ state: 'sending', msg: '' });
    try {
      await contactApi.submit(form);
      setStatus({ state: 'success', msg: "Thanks! We'll get back to you soon." });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err?.response?.data?.error || 'Could not send your message. Please try again or use WhatsApp.',
      });
    }
  };

  return (
    <>
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
            <form onSubmit={submit} className="bg-cream rounded-3xl p-8 lg:p-10 shadow-soft">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Your name" value={form.name} onChange={update('name')} placeholder="Your name" />
                <Field label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Phone (optional)" value={form.phone} onChange={update('phone')} placeholder="+94 ..." />
                <Field label="Subject" value={form.subject} onChange={update('subject')} placeholder="Inquiry about a sapphire" />
              </div>
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-[0.15em] text-ink-soft font-semibold mb-2">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us a bit about what you're looking for…"
                  className="w-full px-4 py-3.5 rounded-xl border border-line bg-white focus:border-sapphire focus:ring-2 focus:ring-sapphire/20 outline-none transition resize-none"
                />
              </div>

              {status.state === 'success' && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 text-sm">
                  <CheckCircle2 size={18} /> {status.msg}
                </div>
              )}
              {status.state === 'error' && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm">
                  <AlertCircle size={18} /> {status.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === 'sending'}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-sapphire text-white font-semibold hover:bg-sapphire-deep transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_14px_30px_-10px_rgba(47,76,219,0.4)]"
              >
                {status.state === 'sending' ? 'Sending…' : (<>Send Message <Send size={16} /></>)}
              </button>
            </form>
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

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-ink-soft font-semibold mb-2">{label}</span>
      <input
        {...props}
        className="w-full px-4 py-3.5 rounded-xl border border-line bg-white focus:border-sapphire focus:ring-2 focus:ring-sapphire/20 outline-none transition"
      />
    </label>
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
