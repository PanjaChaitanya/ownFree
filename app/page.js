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
  title: 'Horizon Web Labs — Web Development Company in Hyderabad, India',
  description:
    'Horizon Web Labs is a top-rated web development company in Hyderabad, India. We build custom websites, React & Next.js apps, SEO solutions, and SaaS products for startups and businesses across India.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Horizon Web Labs — Web Development Company Hyderabad, India',
    description:
      'Top-rated web development company in Hyderabad. Custom websites, React apps, SEO & digital solutions for businesses across India.',
    url: '/',
  },
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
