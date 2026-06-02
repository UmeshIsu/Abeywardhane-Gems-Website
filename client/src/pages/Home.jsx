import SEO from '@/components/layout/SEO';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import WhatWeDo from '@/components/sections/WhatWeDo';
import WhyUs from '@/components/sections/WhyUs';
import ServicesSection from '@/components/sections/ServicesSection';
import GlobalReach from '@/components/sections/GlobalReach';
import Collection from '@/components/sections/Collection';
import Certifications from '@/components/sections/Certifications';
import Testimonials from '@/components/sections/Testimonials';
import CtaBand from '@/components/sections/CtaBand';

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Abeywardhane Gems",
    "image": `${window.location.origin}/sapphire-hero.png`,
    "@id": `${window.location.origin}/#organization`,
    "url": window.location.origin,
    "telephone": "+94740304669",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "142/A, Gem Land",
      "addressLocality": "Ratnapura",
      "addressRegion": "Sabaragamuwa Province",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.6828,
      "longitude": 80.3992
    },
    "description": "Exclusive natural Ceylon gemstones, custom high-end jewellery designs, and guided gem mining field tours in Ratnapura, Sri Lanka.",
    "sameAs": [
      "https://www.facebook.com/abeywardhanegems"
    ]
  };

  return (
    <>
      <SEO 
        title="Buy Certified Ceylon Gemstones & Sapphires Sri Lanka"
        description="Exclusive handpicked natural Ceylon sapphires, rubies, and rare gemstones. Gemologist verified, ethically sourced from mines in Ratnapura, Sri Lanka."
        schema={homeSchema}
      />
      <Hero />
      <TrustBar />
      <WhatWeDo />
      <WhyUs />
      <ServicesSection />
      <GlobalReach />
      <Collection />
      <Certifications />
      <Testimonials />
      <CtaBand />
    </>
  );
}
