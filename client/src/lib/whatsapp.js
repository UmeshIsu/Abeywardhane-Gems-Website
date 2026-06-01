import { contactInfo } from '@/data/site';

/**
 * Opens WhatsApp with a pre-filled message.
 * Falls back to web.whatsapp.com on desktop and the wa.me deep link on mobile.
 */
export function openWhatsApp(message = "Hi, I'd like to know more about your gem collection.") {
  const number = contactInfo.whatsapp.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function whatsappHref(message) {
  const number = contactInfo.whatsapp.replace(/\D/g, '');
  const text = encodeURIComponent(message || "Hi, I'd like to know more about your gem collection.");
  return `https://wa.me/${number}?text=${text}`;
}
