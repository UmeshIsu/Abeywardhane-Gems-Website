import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');

// Tiny in-memory cache so we don't hit disk on every request
const cache = new Map();

export async function readCollection(name) {
  if (cache.has(name)) return cache.get(name);
  const file = path.join(DATA_DIR, `${name}.json`);
  const raw = await readFile(file, 'utf-8');
  const parsed = JSON.parse(raw);
  cache.set(name, parsed);
  return parsed;
}

// Allow manual cache invalidation (e.g. if you later add admin write endpoints)
export function invalidate(name) {
  if (name) cache.delete(name);
  else cache.clear();
}
