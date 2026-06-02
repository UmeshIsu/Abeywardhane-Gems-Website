import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
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

// Lazy load admin — keeps it out of the public bundle
const AdminApp = lazy(() => import('@/admin/AdminApp'));

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFD]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin" />
      <p className="text-[#64748B] text-sm">Loading admin panel…</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Routes>
      {/* Admin panel — code-split */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<AdminLoader />}>
            <AdminApp />
          </Suspense>
        }
      />

      {/* Public website */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/gem-purchasing" element={<GemPurchasing />} />
        <Route path="/services/international-market" element={<InternationalMarket />} />
        <Route path="/services/gemology-program" element={<GemologyProgram />} />
        <Route path="/services/gem-tourism" element={<GemTourism />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
