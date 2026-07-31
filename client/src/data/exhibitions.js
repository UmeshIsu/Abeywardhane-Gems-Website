// International gem exhibitions, photos bundled straight from the repo (no backend).
// To add another exhibition, drop the image into
//   client/src/assets/images/services/international-market/exhibitions/
// then add an `import` and a new entry below.
import exhibitionShanghai from '@/assets/images/services/international-market/exhibitions/2024shanghai11.jpeg';
import exhibitionKunming from '@/assets/images/services/international-market/exhibitions/2025Kunming9.jpeg';

export const exhibitions = [
  {
    label: 'Exhibition photo',
    filename: '2024shanghai11.jpeg',
    src: exhibitionShanghai,
    title: 'Shanghai International Gem & Jewellery Fair',
    location: 'Shanghai, China',
    year: '2024',
  },
  {
    label: 'Exhibition photo',
    filename: '2025Kunming9.jpeg',
    src: exhibitionKunming,
    title: 'Kunming Pan-Asia Gem & Jewellery Expo',
    location: 'Kunming, China',
    year: '2025',
  },
];
