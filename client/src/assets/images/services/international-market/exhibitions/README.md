# International Gem Exhibitions — Photos

Drop the photos showing Abeywardhane Gems at international exhibitions, trade fairs, and gem shows here.

**Suggested filenames** (match what the page expects):

- `exhibition-1.jpg` — JCK Las Vegas (or your first major exhibition)
- `exhibition-2.jpg` — Hong Kong Jewellery & Gem Fair
- `exhibition-3.jpg` — FACETS Sri Lanka
- `exhibition-4.jpg` — Bangkok Gems & Jewelry Fair

**Specs:** 1200×900 px (4:3), under 400 KB, .jpg or .webp

After dropping the files in, open
`client/src/pages/services/InternationalMarket.jsx` and:

1. Find the **"Exhibition photo imports"** section near the top of the file
2. Uncomment the import lines:
   ```js
   import exhibition1 from '@/assets/images/services/international-market/exhibitions/exhibition-1.jpg';
   import exhibition2 from '@/assets/images/services/international-market/exhibitions/exhibition-2.jpg';
   import exhibition3 from '@/assets/images/services/international-market/exhibitions/exhibition-3.jpg';
   import exhibition4 from '@/assets/images/services/international-market/exhibitions/exhibition-4.jpg';
   ```
3. In the `exhibitions` array, uncomment the `src: exhibitionN` line for each entry.

You can also change the title / location / year of each exhibition by
editing the `exhibitions` array. Add or remove items as needed.

That's it — Vite hot-reloads and your photos appear in place of the placeholders.
