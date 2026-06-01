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

export default function App() {
  return (
    <Routes>
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
