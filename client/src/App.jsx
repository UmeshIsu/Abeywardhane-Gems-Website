import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import GemPurchasing from '@/pages/services/GemPurchasing';
import InternationalMarket from '@/pages/services/InternationalMarket';
import GemologyProgram from '@/pages/services/GemologyProgram';
import GemTourism from '@/pages/services/GemTourism';
import Gallery from '@/pages/Gallery';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import GemstonePage from '@/pages/gemstones/GemstonePage';
import GemExportServices from '@/pages/GemExportServices';
import WholesaleGemstones from '@/pages/WholesaleGemstones';
import LocalPage from '@/pages/local/LocalPage';
import ArticlePage from '@/pages/blog/ArticlePage';
import { gemstones } from '@/data/gemstones';
import { localPages } from '@/data/localPages';
import { articles } from '@/data/articles';

/**
 * Data-router route table consumed by ViteReactSSG (see main.jsx).
 * Concrete public paths are prerendered to static HTML at build time.
 */
export const routes = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.jsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/gem-purchasing', element: <GemPurchasing /> },
      { path: 'services/international-market', element: <InternationalMarket /> },
      { path: 'services/gemology-program', element: <GemologyProgram /> },
      { path: 'services/gem-tourism', element: <GemTourism /> },
      { path: 'about', element: <About /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'blog', element: <Blog /> },
      { path: 'contact', element: <Contact /> },

      // Money / SEO landing pages
      { path: 'gem-export-services', element: <GemExportServices /> },
      { path: 'wholesale-gemstones-sri-lanka', element: <WholesaleGemstones /> },
      // Per-gemstone money pages (generated from data — one route per slug)
      ...gemstones.map((g) => ({
        path: g.slug,
        element: <GemstonePage slug={g.slug} />,
      })),
      // Local / regional authority pages
      ...localPages.map((p) => ({
        path: p.slug,
        element: <LocalPage slug={p.slug} />,
      })),
      // Knowledge-hub article pages (/blog/:slug)
      ...articles.map((a) => ({
        path: `blog/${a.slug}`,
        element: <ArticlePage slug={a.slug} />,
      })),

      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
