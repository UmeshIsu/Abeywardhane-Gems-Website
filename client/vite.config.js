import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
