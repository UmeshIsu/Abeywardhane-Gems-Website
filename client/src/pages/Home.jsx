import SEO from '@/components/layout/SEO';
import { graph, localBusinessSchema, websiteSchema, organizationSchema } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import WhatWeDo from '@/components/sections/WhatWeDo';
import WhyUs from '@/components/sections/WhyUs';
import ServicesSection from '@/components/sections/ServicesSection';
import GlobalReach from '@/components/sections/GlobalReach';
import Collection from '@/components/sections/Collection';
import Certifications from '@/components/sections/Certifications';
import Testimonials from '@/components/sections/Testimonials';
import CtaBand from '@/components/sections/CtaBand';

export default function Home() {
  // Organization + WebSite + LocalBusiness as a single linked @graph.
  const homeSchema = graph(
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
  );

  return (
    <>
      <SEO
        title="Buy Certified Ceylon Sapphires & Natural Gemstones in Sri Lanka"
        description="Exclusive handpicked natural Ceylon sapphires, rubies, and rare gemstones. Gemologist-verified, ethically sourced and exported worldwide from Sri Lanka."
        path="/"
        schema={homeSchema}
      />
      <Hero />
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
