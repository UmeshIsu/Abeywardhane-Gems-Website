import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Reusable inquiry form (Web3Forms, no backend). Used on the contact page and
 * embedded on money pages, where `subject` pre-tags the lead with its source
 * (e.g. "Ceylon Blue Sapphire") so you know which page generated each enquiry.
 *
 * Get a free key at https://web3forms.com and set VITE_WEB3FORMS_KEY in .env.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'your-web3forms-access-key';

export default function InquiryForm({ subject = '', className = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject, message: '' });
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
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: 'Abeywardhane Gems Website',
          botcheck: false,
          ...form,
          subject: form.subject ? `Website inquiry: ${form.subject}` : 'New website inquiry',
        }),
      });
      const data = await res.json().catch(() => null);
      if (!data?.success) throw new Error(data?.message || 'Request failed');
      setStatus({ state: 'success', msg: "Thanks! We'll get back to you soon." });
      setForm({ name: '', email: '', phone: '', subject, message: '' });
    } catch (err) {
      setStatus({ state: 'error', msg: 'Could not send your message. Please try again or use WhatsApp.' });
    }
  };

  return (
    <form onSubmit={submit} className={className}>
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <Field label="Your name" value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" />
        <Field label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" autoComplete="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <Field label="Phone (optional)" value={form.phone} onChange={update('phone')} placeholder="+94 ..." autoComplete="tel" />
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
