import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WhyUs from '@/components/sections/WhyUs';
import ProcessSection from '@/components/sections/ProcessSection';
import TechStack from '@/components/sections/TechStack';
import Testimonials from '@/components/sections/Testimonials';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
  title: 'Horizon Web Labs — Premium Digital Agency',
  description: 'We build premium web applications, landing pages, and digital experiences for startups and businesses worldwide.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <FeaturedProjects />
        <WhyUs />
        <ProcessSection />
        <TechStack />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
