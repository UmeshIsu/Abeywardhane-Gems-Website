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
import NotFound from '@/pages/NotFound';

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
      { path: 'gallery', element: <Gallery /> },
      { path: 'blog', element: <Blog /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
