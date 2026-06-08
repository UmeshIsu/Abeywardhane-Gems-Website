export const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    dropdown: [
      { label: 'Gem Purchasing And Selling', to: '/services/gem-purchasing' },
      { label: 'Coordinating International Gem Market', to: '/services/international-market' },
      { label: 'Expose Visit & Internship Program', to: '/services/gemology-program' },
      { label: 'Organizing & Facilitating Gem Tourism', to: '/services/gem-tourism' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

export const contactInfo = {
  phone: '+94 74 030 4669',
  phoneRaw: '+94740304669',
  email: 'info@abeywardhanegems.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '94740304669',
  address: 'Pelmadulla, Sri Lanka',
  mapEmbed: import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    'https://maps.google.com/maps?q=Pelmadulla,%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed',
};
