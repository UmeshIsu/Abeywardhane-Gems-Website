# 🎓 Program Photos

Drop photos of the gemology program in action — classrooms, lab work,
field trips, interns, group shots.

## Suggested filenames

- `program-1.jpg` — Classroom / lecture session
- `program-2.jpg` — Hands-on lab work (microscope, gem testing)
- `program-3.jpg` — Field trip to a mine
- `program-4.jpg` — Group at the cutting workshop / a graduation

**Specs:** 1200×1500 px (4:5 portrait), under 500 KB, .jpg or .webp

## How to wire them up

After dropping the files in, open
`client/src/pages/services/GemologyProgram.jsx` and:

1. Find the **"Program photo imports"** section near the top of the file
   and uncomment the 4 import lines:
   ```js
   import program1 from '@/assets/images/services/gemology-program/program/program-1.jpg';
   import program2 from '@/assets/images/services/gemology-program/program/program-2.jpg';
   import program3 from '@/assets/images/services/gemology-program/program/program-3.jpg';
   import program4 from '@/assets/images/services/gemology-program/program/program-4.jpg';
   ```

2. Scroll down to the **Program Photo Gallery** section near the bottom
   of the page. Find this line:
   ```js
   // src={[program1, program2, program3, program4][i]}
   ```
   Uncomment it.

3. Done.
