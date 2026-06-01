# 📍 Tour Destinations — Photos

Photos of the four anchor stops on every gem tour: Beruwala market,
Ratnapura, your own mine, and your cutting workshop.

There's also a `hero.jpg` slot used in the page introduction.

## Suggested filenames

- `hero.jpg` — Featured photo in the page intro (a beautiful Sri Lanka
  / Ceylon gem shot — your single best image)
- `beruwala.jpg` — The Beruwala gem market
- `ratnapura.jpg` — Ratnapura — the City of Gems
- `our-mine.jpg` — Your own gem mine (probably one of your garden-mine
  photos works here too)
- `workshop.jpg` — The cutting / polishing workshop

**Specs:** 1200×900 px (4:3), under 400 KB, .jpg or .webp

## How to wire them up

After dropping the files in, open
`client/src/pages/services/GemTourism.jsx` and:

1. Uncomment the relevant import lines:
   ```js
   import tourismHero from '@/assets/images/services/gem-tourism/destinations/hero.jpg';
   import dest1 from '@/assets/images/services/gem-tourism/destinations/beruwala.jpg';
   import dest2 from '@/assets/images/services/gem-tourism/destinations/ratnapura.jpg';
   import dest3 from '@/assets/images/services/gem-tourism/destinations/our-mine.jpg';
   import dest4 from '@/assets/images/services/gem-tourism/destinations/workshop.jpg';
   ```

2. **For the hero photo**: search for `filename="hero.jpg"` in the file
   and uncomment the `src={tourismHero}` line just above it.

3. **For the four destination cards**: in the `destinations` array,
   add `src: dest1,` (then `dest2`, `dest3`, `dest4`) to each entry,
   then pass it as a prop to the `<ImagePlaceholder>` inside the
   **"Where we'll take you"** section.
