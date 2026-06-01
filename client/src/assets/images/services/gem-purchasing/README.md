# Gem Purchasing — Photos

Drop the photos you want to show in the "Our Gem Purchasing Service" section here.

**Suggested filenames** (match what the page expects):

- `purchase-1.jpg` — Rough gemstone / mine sourcing
- `purchase-2.jpg` — Cutting / polishing in progress
- `purchase-3.jpg` — Finished, certified gem

**Specs:** 1200×900 px (4:3), under 400 KB, .jpg or .webp

After dropping the files in, open
`client/src/pages/services/GemPurchasing.jsx` and:

1. Uncomment the three import lines at the top of the file:
   ```js
   import purchasing1 from '@/assets/images/services/gem-purchasing/purchase-1.jpg';
   import purchasing2 from '@/assets/images/services/gem-purchasing/purchase-2.jpg';
   import purchasing3 from '@/assets/images/services/gem-purchasing/purchase-3.jpg';
   ```
2. In each `<ImagePlaceholder>` in the "Our Gem Purchasing Service"
   section, uncomment the `src={purchasingN}` line.

That's it — Vite hot-reloads and your photos appear in place of the
placeholders.
