import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturedVendors } from '@/components/home/FeaturedVendors';
import { AIFeatures } from '@/components/home/AIFeatures';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <AIFeatures />
        <FeaturedVendors />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
