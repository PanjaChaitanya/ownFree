import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StudentBar from '@/components/ui/StudentBar';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WhyUs from '@/components/sections/WhyUs';
import ProcessSection from '@/components/sections/ProcessSection';
import TechStack from '@/components/sections/TechStack';
import StudentCTASection from '@/components/sections/StudentCTASection';
import Testimonials from '@/components/sections/Testimonials';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines vary by project complexity. A landing page typically takes 1–2 weeks, a business website 2–4 weeks, and a full web application 4–12 weeks. We provide a detailed timeline after our discovery call.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do you use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialise in Next.js, React, Node.js, MongoDB, and Tailwind CSS. We also work with Stripe for payments, Cloudinary for media, and Vercel/AWS for deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer ongoing support after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer flexible maintenance packages that include bug fixes, performance monitoring, content updates, and feature enhancements. Most clients stay on a monthly retainer.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a project cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing depends on scope and complexity. Landing pages start at ₹12,000, business websites from ₹25,000, and full web applications from ₹75,000+. We provide a detailed quote with no hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle both design and development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we are a full-service studio handling UI/UX design, development, testing, deployment, and post-launch support. One team responsible for everything.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I update the website myself after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We build projects with an integrated CMS admin panel so you can manage all content without touching code. We also provide a walkthrough and documentation.',
      },
    },
  ],
};

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <FeaturedProjects />
        <WhyUs />
        <ProcessSection />
        <TechStack />
        <StudentCTASection />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <StudentBar />
      <WhatsAppButton />
    </>
  );
}
