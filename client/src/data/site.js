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
  email: 'info@abeywardanagems.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '94740304669',
  address: 'Kandy, Sri Lanka',
  mapEmbed: import.meta.env.VITE_GOOGLE_MAPS_EMBED ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.81!2d80.6337!3d7.2906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367e8b75e8e29%3A0xe48c0d3ec80b48c2!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000',
};
