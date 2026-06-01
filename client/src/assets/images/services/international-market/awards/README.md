# Awards & Recognition — Photos

Drop the photos of the awards, certificates, and recognitions
Abeywardana Gems has received here.

**Suggested filenames:**

- `award-1.jpg` — Most recent / most prestigious award
- `award-2.jpg` — Second award
- `award-3.jpg` — Third award

**Specs:** 1200×900 px (4:3), under 400 KB, .jpg or .webp

**Photo ideas:** the trophy itself, the certificate, the moment of being
presented the award, or a clean photo of the plaque on display.

After dropping the files in, open
`client/src/pages/services/InternationalMarket.jsx` and:

1. Find the **"Award photo imports"** section near the top of the file
2. Uncomment the import lines:
   ```js
   import award1 from '@/assets/images/services/international-market/awards/award-1.jpg';
   import award2 from '@/assets/images/services/international-market/awards/award-2.jpg';
   import award3 from '@/assets/images/services/international-market/awards/award-3.jpg';
   ```
3. In the `awards` array, uncomment the `src: awardN` line for each entry.
4. Edit the `title`, `issuer`, and `year` fields to match your real awards.

You can add or remove award entries as needed.
