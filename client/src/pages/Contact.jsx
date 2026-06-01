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
        breadcrumb={[{ label: 'Abeywardana Gems', to: '/' }, { label: 'Contact' }]}
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
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.3c1.5.8 3.3 1.3 5.2 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="bg-cream rounded-3xl p-8 lg:p-10 shadow-soft">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field label="Your name" value={form.name} onChange={update('name')} placeholder="John Doe" />
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
                title="Abeywardana Gems location"
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
