import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

export const metadata = {
  title: 'Web Developer in Andhra Pradesh — Best Web Development Company AP',
  description:
    'Horizon Web Labs provides expert web development services across Andhra Pradesh — Visakhapatnam, Vijayawada, Guntur, Tirupati, Kurnool, and beyond. Custom websites, React apps, SEO, and SaaS development.',
  keywords: [
    'web developer in Andhra Pradesh',
    'web development company Andhra Pradesh',
    'best web developer AP',
    'website developer Andhra Pradesh',
    'web developer AP',
    'web development company AP',
    'React developer Andhra Pradesh',
    'full stack developer AP',
    'SEO company Andhra Pradesh',
    'web developer Vizag',
    'web developer Visakhapatnam',
    'web developer Vijayawada',
    'web developer Guntur',
    'web developer Tirupati',
    'web developer Kurnool',
    'web developer Nellore',
    'web developer Kakinada',
    'affordable web development AP',
    'top web development company Andhra Pradesh',
    'startup website developer AP',
    'ecommerce developer Andhra Pradesh',
  ],
  alternates: { canonical: '/web-developer-andhra-pradesh' },
  openGraph: {
    title: 'Web Developer in Andhra Pradesh — Horizon Web Labs',
    description:
      'Top-rated web development company serving all of Andhra Pradesh. Custom websites, React apps, SEO & SaaS for Vizag, Vijayawada, Guntur, Tirupati, and beyond.',
    url: '/web-developer-andhra-pradesh',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you provide web development services across all of Andhra Pradesh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Web Labs provides web development services to businesses across all major cities in Andhra Pradesh including Visakhapatnam (Vizag), Vijayawada, Guntur, Tirupati, Kurnool, Nellore, Kakinada, Rajahmundry, and more. We work remotely, so location is never a barrier.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost in Andhra Pradesh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website costs vary by project. Basic business websites start from ₹15,000. E-commerce stores start from ₹40,000. Custom web applications start from ₹75,000. We offer competitive pricing tailored for AP businesses, including payment in installments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you build SEO-optimized websites for AP businesses to rank locally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We specialize in local SEO for AP businesses. We optimize your website to rank for city-specific searches like "web developer in Vizag" or "restaurant in Vijayawada." All our websites include on-page SEO, structured data, and Google Business optimization guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with Telugu-speaking business owners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our team communicates in both Telugu and English. We understand the local market and business culture in Andhra Pradesh, which helps us build better products for our AP clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of businesses do you work with in Andhra Pradesh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with a wide range of AP businesses — startups, retail shops going online, educational institutions, real estate agencies, hospitals, restaurants, coaching centers, and more. We also work with AP-based IT companies that need web application development.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizonweblabs.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Web Developer in Andhra Pradesh', item: 'https://horizonweblabs.vercel.app/web-developer-andhra-pradesh' },
  ],
};

const cities = [
  { name: 'Visakhapatnam (Vizag)', href: '/web-developer-vizag' },
  { name: 'Vijayawada', href: '/web-developer-vijayawada' },
  { name: 'Guntur', href: '#' },
  { name: 'Tirupati', href: '#' },
  { name: 'Kurnool', href: '#' },
  { name: 'Nellore', href: '#' },
  { name: 'Kakinada', href: '#' },
  { name: 'Rajahmundry', href: '#' },
  { name: 'Eluru', href: '#' },
  { name: 'Ongole', href: '#' },
  { name: 'Anantapur', href: '#' },
  { name: 'Kadapa', href: '#' },
];

const services = [
  { icon: Code2, title: 'Custom Web Applications', desc: 'Full-stack apps with React & Node.js — built for scale and performance.', color: '#6d28d9' },
  { icon: Globe, title: 'Business Websites', desc: 'Professional multi-page websites for businesses, hospitals, schools, and NGOs in AP.', color: '#0369a1' },
  { icon: Search, title: 'Local SEO for AP', desc: 'Rank higher in Google searches for your city — Vizag, Vijayawada, Guntur, and beyond.', color: '#b45309' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting pages for your ads, products, or lead generation campaigns.', color: '#0d9488' },
  { icon: Star, title: 'E-Commerce Stores', desc: 'Sell online with a fast, mobile-first store — Shopify, WooCommerce, or custom-built.', color: '#be185d' },
  { icon: Shield, title: 'Mobile-First Websites', desc: 'Websites that look and perform perfectly on every device and connection speed.', color: '#15803d' },
];

export default function WebDeveloperAndhraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-600">Web Developer in Andhra Pradesh</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Andhra Pradesh, India
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in{' '}
              <span className="gradient-text">Andhra Pradesh</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Horizon Web Labs is a <strong className="text-zinc-700">top-rated web development company serving all of Andhra Pradesh</strong>. Whether you're in Vizag, Vijayawada, Guntur, Tirupati, or anywhere across AP — we build websites, web applications, and digital solutions that help your business grow.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              We understand the AP business landscape — from local traders and educational institutions to IT startups and e-commerce businesses. Our team works in English and Telugu, and we've helped 30+ businesses across the state establish a powerful online presence.
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
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 transition-all duration-200"
              >
                View Our Work
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
              { value: '10+', label: 'AP Clients Served' },
              { value: '8+', label: 'AP Cities Covered' },
              { value: '100%', label: 'On-Time Delivery' },
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
              Web Development Services Across AP
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Complete digital services for Andhra Pradesh businesses — from concept to launch.
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
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4">
            Cities We Serve Across Andhra Pradesh
          </h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            No matter which city you're in — we're ready to build your online presence.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              city.href === '#' ? (
                <span key={city.name} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 text-sm font-medium">
                  {city.name}
                </span>
              ) : (
                <Link key={city.name} href={city.href} className="px-4 py-2 rounded-full bg-white border border-violet-200 text-violet-700 text-sm font-medium hover:bg-violet-50 transition-colors">
                  {city.name}
                </Link>
              )
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Also serving{' '}
            <Link href="/web-developer-hyderabad" className="text-violet-600 hover:underline">Hyderabad</Link>
            {' and clients '}
            <Link href="/web-developer-india" className="text-violet-600 hover:underline">across India</Link>.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-6">
                Why AP Businesses Choose Horizon Web Labs
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-8">
                Andhra Pradesh has a fast-growing business ecosystem — from Vizag's port-driven economy to Vijayawada's commercial hub and Tirupati's tourism sector. We understand these local markets and build digital solutions that connect you to the right customers.
              </p>
              <ul className="space-y-3">
                {[
                  'Telugu & English support for seamless communication',
                  'Competitive pricing suited for the AP market',
                  'Local SEO expertise to rank in your city',
                  'Remote-first workflow — no need to meet in person',
                  'Quick turnaround — landing pages in under a week',
                  'Payment in installments available',
                  'Post-launch support for 3 months included',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-violet-700 rounded-3xl text-white">
              <p className="text-violet-300 text-sm font-bold uppercase tracking-widest mb-3">Free Consultation</p>
              <h3 className="text-2xl font-black mb-4">Get Your Website Quote Today</h3>
              <p className="text-violet-200 leading-relaxed mb-6">
                Tell us about your business and what you need. We'll give you a detailed proposal with transparent pricing — no surprises, no hidden fees.
              </p>
              <ul className="space-y-2 mb-6">
                {['Free project scoping call', 'Detailed proposal in 24 hours', 'No commitment required'].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-violet-100 text-sm">
                    <CheckCircle className="w-4 h-4 text-violet-300 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-6 py-3 rounded-full hover:bg-violet-50 transition-colors"
              >
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-zinc-500">Common questions from businesses across Andhra Pradesh.</p>
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
            Let's Build Your Online Presence in AP
          </h2>
          <p className="text-zinc-500 mb-8 text-lg">
            Ready to take your Andhra Pradesh business online? Contact us today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
