# 🌸 Garden Mine — Photos

This is the most important photo folder on the whole website. These
photos show the unique selling point of Abeywardhane Gems: **mines that
are also gardens**.

Drop the photos of the flower beds, lily ponds, planted paths and
landscaped mining sites here.

## Suggested filenames

- `garden-1.jpg` — **HERO SHOT.** A wide, beautiful photo of the garden
  mine from a distance. Used twice on the page (the big intro photo
  and the wide banner in the gallery). Choose your best one for this.
- `garden-2.jpg` — Lily pond or koi pond
- `garden-3.jpg` — Pathway through the gardens
- `garden-4.jpg` — A working pit framed by gardens (the contrast is
  the story)
- `garden-5.jpg` — Visitors / buyers walking through the property

**Specs:** 1500×1875 px (4:5) or larger, under 600 KB, .jpg or .webp

## How to wire them up

After dropping the files in, open
`client/src/pages/services/GemologyProgram.jsx` and:

1. Find the **"Garden mine photo imports"** section near the top of
   the file (around line 35) and uncomment all 5 import lines:
   ```js
   import garden1 from '@/assets/images/services/gemology-program/garden/garden-1.jpg';
   import garden2 from '@/assets/images/services/gemology-program/garden/garden-2.jpg';
   import garden3 from '@/assets/images/services/gemology-program/garden/garden-3.jpg';
   import garden4 from '@/assets/images/services/gemology-program/garden/garden-4.jpg';
   import garden5 from '@/assets/images/services/gemology-program/garden/garden-5.jpg';
   ```

2. In two places, uncomment the `src={...}` line on `<ImagePlaceholder>`:
   - The big featured photo in the intro (uses `garden1`)
   - The 5 photos in the mosaic gallery (uses `garden1` through `garden5`)

   Just search the file for `// src={garden` — there are 6 matches.
   Uncomment each one.

3. Done. Vite hot-reloads and your garden photos take over the page.

## Pro tip

If you only have a handful of really great photos right now, that's
fine — re-use your best one for `garden-1.jpg` and `garden-4.jpg`,
since they're displayed at different sizes and the page won't look
repetitive. Replace them with unique shots as you accumulate more.
