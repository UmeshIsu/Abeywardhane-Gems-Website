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
  return (
    <>
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
