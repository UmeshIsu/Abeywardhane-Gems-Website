# Gem Selling — Photos

Drop the photos you want to show in the "Our Gem Selling Service" section here.

**Suggested filenames:**

- `sell-1.jpg` — Client consultation
- `sell-2.jpg` — Gem appraisal / evaluation
- `sell-3.jpg` — Secure transaction / handover

**Specs:** 1200×900 px (4:3), under 400 KB, .jpg or .webp

After dropping the files in, open
`client/src/pages/services/GemPurchasing.jsx` and:

1. Uncomment the three import lines at the top of the file:
   ```js
   import selling1 from '@/assets/images/services/gem-selling/sell-1.jpg';
   import selling2 from '@/assets/images/services/gem-selling/sell-2.jpg';
   import selling3 from '@/assets/images/services/gem-selling/sell-3.jpg';
   ```
2. In each `<ImagePlaceholder>` in the "Our Gem Selling Service"
   section, uncomment the `src={sellingN}` line.

That's it — Vite hot-reloads and your photos appear in place of the
placeholders.
