import { Gem, Globe2, BookOpen, Bus } from 'lucide-react';

export const services = [
  {
    id: 'gem-purchasing',
    icon: Gem,
    tag: 'Marketing',
    title: 'Gem Purchasing\nand Selling',
    description:
      'A premier destination for buying and selling high-quality Ceylon gemstones with full authenticity guarantees.',
    slug: '/services/gem-purchasing',
  },
  {
    id: 'international-market',
    icon: Globe2,
    tag: 'Marketing · Research',
    title: "Coordinating Int'l\nGem Market",
    description:
      'Connecting trusted wholesalers, retailers and collectors across continents through our established global network.',
    slug: '/services/international-market',
  },
  {
    id: 'gemology-program',
    icon: BookOpen,
    tag: 'Education · Research',
    title: 'Gemology Expose\n& Internship',
    description:
      "Hands-on programs combining theoretical education with real-world experience inside Sri Lanka's gem industry.",
    slug: '/services/gemology-program',
  },
  {
    id: 'gem-tourism',
    icon: Bus,
    tag: 'Tourism',
    title: 'Gem Tourism\nin Sri Lanka',
    description:
      "Curated experiences through mines, cutting workshops and Ceylon's rich gemstone heritage — guided by experts.",
    slug: '/services/gem-tourism',
  },
];
