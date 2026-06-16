import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';

const SITE_URL = 'https://www.abeywardhanegems.com';

/* Recursively collect every prerendered page (its index.html) under `dir`. */
function listPages(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name.startsWith('.')) continue;
      listPages(path.join(dir, entry.name), out);
    } else if (entry.name === 'index.html') {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

/* Generate sitemap.xml from what was actually prerendered — never drifts. */
function generateSitemap(dir) {
  const today = new Date().toISOString().slice(0, 10);
  const routes = listPages(dir)
    .map((f) => path.relative(dir, f).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\/$/, ''))
    .filter((r) => !r.startsWith('admin'))
    .sort();

  const priority = (r) => (r === '' ? '1.0' : r.startsWith('blog/') ? '0.6' : r.includes('/') ? '0.7' : '0.8');
  const changefreq = (r) => (['', 'blog', 'gallery'].includes(r) ? 'weekly' : 'monthly');

  const urls = routes
    .map((r) => {
      const loc = r === '' ? `${SITE_URL}/` : `${SITE_URL}/${r}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq(r)}</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), xml);
  console.log(`[sitemap] generated ${routes.length} URLs`);
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 5173, open: true },
  // Build-time static-site generation (vite-react-ssg).
  ssgOptions: {
    entry: 'src/main.jsx',
    script: 'async',
    dirStyle: 'nested', // /services -> /services/index.html (clean URLs on Vercel)
    formatting: 'none', // never prettify — it breaks hydration
    // Only prerender public routes; never prerender the admin panel.
    includedRoutes(paths) {
      return paths.filter((p) => !p.startsWith('/admin'));
    },
    // Regenerate sitemap.xml from the prerendered output (always in sync).
    onFinished(dir) {
      try {
        generateSitemap(dir);
      } catch (e) {
        console.warn('[sitemap] generation skipped:', e.message);
      }
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split heavy/stable vendors into their own cacheable chunks.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('framer-motion')) return 'motion';
            return 'vendor';
          }
        },
      },
    },
  },
});
