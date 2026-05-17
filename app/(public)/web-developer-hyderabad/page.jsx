import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Shield, Star } from 'lucide-react';

export const metadata = {
  title: 'Web Developer in Hyderabad — Top-Rated Web Development Company',
  description:
    'Looking for a web developer in Hyderabad? Horizon Web Labs builds custom websites, React & Next.js web apps, SEO solutions, and SaaS products for businesses in Hyderabad, HITEC City, Gachibowli, and across Telangana.',
  keywords: [
    'web developer in Hyderabad',
    'web development company Hyderabad',
    'best web developer Hyderabad',
    'website developer Hyderabad',
    'React developer Hyderabad',
    'Next.js developer Hyderabad',
    'MERN stack developer Hyderabad',
    'full stack developer Hyderabad',
    'top web development company Hyderabad',
    'affordable web developer Hyderabad',
    'freelance web developer Hyderabad',
    'web design company Hyderabad',
    'SEO company Hyderabad',
    'startup web developer Hyderabad',
    'ecommerce developer Hyderabad',
    'web developer HITEC City',
    'web developer Gachibowli',
    'web developer Madhapur',
    'web developer Kukatpally',
    'web developer Secunderabad',
    'website developer near me Hyderabad',
  ],
  alternates: { canonical: '/web-developer-hyderabad' },
  openGraph: {
    title: 'Web Developer in Hyderabad — Horizon Web Labs',
    description:
      'Top-rated web development company in Hyderabad. Custom websites, React apps, SEO, UI/UX design. Serving HITEC City, Gachibowli, Madhapur, Kukatpally & all of Hyderabad.',
    url: '/web-developer-hyderabad',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a website cost in Hyderabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website costs in Hyderabad vary by project type. A basic landing page starts from ₹15,000–₹25,000. A full business website runs ₹30,000–₹80,000. Custom web applications and SaaS products typically start from ₹1,00,000. Horizon Web Labs offers transparent pricing and free quotes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website in Hyderabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines depend on scope. A landing page can be delivered in 3–7 business days. A full business website takes 2–4 weeks. Complex web applications and SaaS platforms take 6–16 weeks depending on features. We always provide a clear timeline before starting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide SEO services with web development in Hyderabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All websites we build are SEO-optimized by default — structured data, fast loading, semantic HTML, meta tags, and sitemap. We also offer dedicated monthly SEO packages starting at ₹10,000/month for Hyderabad businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which areas of Hyderabad do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve clients across all of Hyderabad including HITEC City, Gachibowli, Madhapur, Kukatpally, Banjara Hills, Jubilee Hills, Ameerpet, Secunderabad, Miyapur, LB Nagar, and more. We also work remotely across India.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help a Hyderabad startup build a web application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We specialize in building MVPs, SaaS platforms, and startup web applications using React, Next.js, Node.js, and MongoDB. We\'ve helped 30+ startups and SMEs launch successfully.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do Horizon Web Labs use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use modern, industry-standard technologies: React, Next.js 15, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Tailwind CSS, Prisma, and more. We also integrate payment gateways, CRMs, and third-party APIs.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizonweblabs.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Web Developer in Hyderabad', item: 'https://horizonweblabs.vercel.app/web-developer-hyderabad' },
  ],
};

const services = [
  { icon: Code2, title: 'Web App Development', desc: 'Custom React & Next.js web applications built for scale. From MVPs to enterprise SaaS platforms.', color: '#6d28d9' },
  { icon: Globe, title: 'Business & Portfolio Websites', desc: 'Professional websites that rank on Google and convert visitors into leads.', color: '#0369a1' },
  { icon: Search, title: 'SEO Services', desc: 'Data-driven SEO to get your Hyderabad business ranking on page 1 of Google.', color: '#b45309' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting landing pages designed to turn clicks into customers.', color: '#0d9488' },
  { icon: Star, title: 'E-Commerce Development', desc: 'Scalable online stores with Shopify, WooCommerce, or custom-built solutions.', color: '#be185d' },
  { icon: Shield, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that users love — from wireframes to live products.', color: '#15803d' },
];

const techStack = ['React', 'Next.js 15', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Shopify', 'Prisma', 'REST APIs', 'GraphQL', 'AWS'];

const areas = ['HITEC City', 'Gachibowli', 'Madhapur', 'Kukatpally', 'Banjara Hills', 'Jubilee Hills', 'Ameerpet', 'Secunderabad', 'Miyapur', 'LB Nagar', 'Begumpet', 'Kondapur'];

const whyUs = [
  'On-time delivery with transparent communication',
  'Affordable pricing — no hidden costs',
  'Post-launch support and maintenance included',
  'Modern tech stack: React, Next.js, MERN',
  'SEO-optimized from day one',
  'Free consultation before project start',
  '100% satisfaction guarantee',
  'Experience with 30+ Hyderabad clients',
];

export default function WebDeveloperHyderabadPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-600">Web Developer in Hyderabad</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Hyderabad, Telangana
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in{' '}
              <span className="gradient-text">Hyderabad</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-8">
              Looking for a reliable <strong className="text-zinc-700">web developer in Hyderabad</strong>? Horizon Web Labs is a full-service web development company based in Hyderabad, helping startups, SMEs, and growing businesses build powerful digital products. From custom React applications to high-converting landing pages — we deliver results.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              Our team has worked with clients across <strong className="text-zinc-700">HITEC City, Gachibowli, Madhapur, Kukatpally</strong>, and the wider Hyderabad metro. Whether you need a brand-new website, a SaaS platform, or an SEO overhaul — we bring the technical depth and design quality to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 hover:-translate-y-0.5 transition-all duration-200"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-violet-50 border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Happy Clients' },
              { value: '3+', label: 'Years in Hyderabad' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-black text-violet-700 mb-1">{s.value}</div>
                <div className="text-sm text-zinc-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">
              Web Development Services in Hyderabad
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              End-to-end digital services for Hyderabad businesses. We handle everything from design to deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-violet-200 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${s.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-violet-700 font-semibold hover:gap-3 transition-all duration-200">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
                Why Horizon Web Labs
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-6">
                Why Businesses in Hyderabad Choose Us
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-8">
                We understand the Hyderabad market. From tech startups in HITEC City to traditional businesses in Secunderabad going digital — we build websites and applications that solve real business problems, not just look good.
              </p>
              <ul className="space-y-3">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                <h3 className="font-bold text-zinc-900 mb-2">Technology Stack We Use</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-medium border border-violet-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-violet-700 rounded-2xl text-white">
                <p className="font-bold text-lg mb-2">Free Project Consultation</p>
                <p className="text-violet-200 text-sm mb-4">
                  Tell us about your project and get a detailed proposal — scope, timeline, and transparent pricing. No commitment required.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-5 py-2.5 rounded-full hover:bg-violet-50 transition-colors text-sm"
                >
                  Book Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas served */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4">
            Areas We Serve in Hyderabad
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            We work with clients across all major localities in Hyderabad and Secunderabad.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 text-sm font-medium">
                {area}
              </span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Also serving clients across{' '}
            <Link href="/web-developer-andhra-pradesh" className="text-violet-600 hover:underline">Andhra Pradesh</Link>
            {', '}
            <Link href="/web-developer-vizag" className="text-violet-600 hover:underline">Vizag</Link>
            {', '}
            <Link href="/web-developer-vijayawada" className="text-violet-600 hover:underline">Vijayawada</Link>
            {' and '}
            <Link href="/web-developer-india" className="text-violet-600 hover:underline">across India</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-zinc-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-500">Common questions from businesses in Hyderabad looking for web developers.</p>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <details key={faq.name} className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-zinc-900 list-none">
                  {faq.name}
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-4">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">
            Ready to Build Something Great in Hyderabad?
          </h2>
          <p className="text-zinc-500 mb-8 text-lg">
            Get a free consultation and project quote from Horizon Web Labs. We respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
