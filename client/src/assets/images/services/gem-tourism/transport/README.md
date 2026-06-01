# 🚐 Transport & Stay — Photos

Drop the photos showing what visitors get when they arrive: airport
pickup, the touring vehicle, the accommodation, and meals at your
place.

## Suggested filenames

- `airport-pickup.jpg` — Welcome / pickup at Bandaranaike Airport
- `van-1.jpg` — Your touring vehicle (van, car, whatever you use)
- `accommodation.jpg` — The rooms / guest house where they stay
- `meals.jpg` — Home-cooked meals being served

**Specs:** 1200×900 px (4:3), under 400 KB, .jpg or .webp

## How to wire them up

After dropping the files in, open
`client/src/pages/services/GemTourism.jsx` and:

1. Uncomment the 4 transport import lines near the top of the file:
   ```js
   import transport1 from '@/assets/images/services/gem-tourism/transport/airport-pickup.jpg';
   import transport2 from '@/assets/images/services/gem-tourism/transport/van-1.jpg';
   import transport3 from '@/assets/images/services/gem-tourism/transport/accommodation.jpg';
   import transport4 from '@/assets/images/services/gem-tourism/transport/meals.jpg';
   ```

2. In the `included` array, add a `src: transportN` field to each entry,
   then pass it down as `src={...}` on the `<ImagePlaceholder>` inside
   the **"What's included in the tour"** section.

   The fastest way: search the file for `filename: 'airport-pickup.jpg'`
   and add `src: transport1,` on the next line. Repeat for the other 3.
