import { lazy, Suspense } from 'react';
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

// Lazy load admin — keeps it out of the public bundle and out of prerendering.
const AdminApp = lazy(() => import('@/admin/AdminApp'));

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFD]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin" />
      <p className="text-[#64748B] text-sm">Loading admin panel…</p>
    </div>
  </div>
);

/**
 * Data-router route table consumed by ViteReactSSG (see main.jsx).
 * Concrete public paths are prerendered to static HTML at build time;
 * the `/admin/*` splat is dynamic and excluded from prerendering
 * (see ssgOptions.includedRoutes in vite.config.js).
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
  {
    path: '/admin/*',
    element: (
      <Suspense fallback={<AdminLoader />}>
        <AdminApp />
      </Suspense>
    ),
  },
];

export default routes;
