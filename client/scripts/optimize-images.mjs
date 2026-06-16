/**
 * One-time / re-runnable image optimiser.
 *   node scripts/optimize-images.mjs   (run from the `client` folder)
 *
 * For every raster image in /public it generates .webp and .avif siblings
 * (downscaled to MAX_DIM on the longest side). Oversized JPG originals are
 * additionally recompressed in place so CSS-background fallbacks aren't huge.
 * PNG originals (logos, OG image) are left untouched as fallbacks.
 *
 * The generated .webp/.avif files are committed as static assets, so the
 * Vercel build does NOT need `sharp` — it just serves them.
 */
import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC_DIR = path.resolve('public');
const MAX_DIM = 2000;          // longest-side cap
const RECOMPRESS_JPG_OVER = 800 * 1024; // bytes — recompress originals above this
const RASTER = /\.(jpe?g|png)$/i;

const fit = (w, h) =>
  Math.max(w, h) > MAX_DIM
    ? (w >= h ? { width: MAX_DIM } : { height: MAX_DIM })
    : null;

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const files = (await readdir(PUBLIC_DIR)).filter((f) => RASTER.test(f));
let saved = 0;

for (const f of files) {
  const full = path.join(PUBLIC_DIR, f);
  const base = full.replace(RASTER, '');
  const isJpg = /\.jpe?g$/i.test(f);
  const before = (await stat(full)).size;

  // Read the original into a buffer once, so no file handle stays open on the
  // path we may overwrite below (Windows-safe).
  const input = await readFile(full);
  const meta = await sharp(input).metadata();
  const resize = fit(meta.width || 0, meta.height || 0);

  // WebP + AVIF siblings
  await sharp(input).resize(resize || {}).webp({ quality: 80 }).toFile(base + '.webp');
  await sharp(input).resize(resize || {}).avif({ quality: 50 }).toFile(base + '.avif');

  // Recompress oversized JPG originals in place (git preserves the originals).
  if (isJpg && (before > RECOMPRESS_JPG_OVER || resize)) {
    const buf = await sharp(input).resize(resize || {}).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    if (buf.length < before) {
      await writeFile(full, buf);
      saved += before - buf.length;
      console.log(`recompressed ${f}: ${kb(before)} -> ${kb(buf.length)}`);
    }
  }
  const w = (await stat(base + '.webp')).size;
  const a = (await stat(base + '.avif')).size;
  console.log(`  ${f}: webp ${kb(w)}, avif ${kb(a)}  (orig ${kb(before)})`);
}

console.log(`\nDone. Recompressed originals saved ~${kb(saved)}.`);
