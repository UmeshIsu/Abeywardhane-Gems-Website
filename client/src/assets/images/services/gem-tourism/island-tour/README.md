# 🏝️ Island-Wide Tour — Photos

Photos of the optional island-wide trips you arrange for visitors who
want to see more of Sri Lanka — beaches, hill country, ancient cities,
wildlife, tea plantations.

## Suggested filenames

- `island-1.jpg` — A tall, beautiful Sri Lanka shot (used as the big
  feature in the mosaic — coastal cliff, beach, or scenic vista works
  well here)
- `island-2.jpg` — Hill country / tea plantation
- `island-3.jpg` — Ancient city or cultural site (Sigiriya, Kandy
  Temple, Anuradhapura, etc.)
- `island-4.jpg` — Wildlife / safari (Yala, Udawalawe)
- `island-5.jpg` — Wide landscape shot for the bottom banner

**Specs:** at least 1200×1500 px for `island-1.jpg`, others 1000×1000
px or so. Under 500 KB each, .jpg or .webp.

## How to wire them up

After dropping the files in, open
`client/src/pages/services/GemTourism.jsx` and:

1. Uncomment the 5 island import lines:
   ```js
   import island1 from '@/assets/images/services/gem-tourism/island-tour/island-1.jpg';
   import island2 from '@/assets/images/services/gem-tourism/island-tour/island-2.jpg';
   import island3 from '@/assets/images/services/gem-tourism/island-tour/island-3.jpg';
   import island4 from '@/assets/images/services/gem-tourism/island-tour/island-4.jpg';
   import island5 from '@/assets/images/services/gem-tourism/island-tour/island-5.jpg';
   ```

2. Scroll down to the **"Island-Wide Tour Experiences"** section.
   Search for `// src={island` — there are 5 commented lines. Uncomment
   each one (just remove the `//`).

3. Vite hot-reloads and your island shots take over.
