import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

export const metadata = {
  title: 'Web Developer in Bangalore — Best Web Development Company Bangalore',
  description:
    'Need a web developer in Bangalore? Horizon Web Labs builds custom websites, React & Next.js apps, SaaS products, and SEO solutions for startups and businesses in Bengaluru. Serving Koramangala, Whitefield, Indiranagar, Electronic City, and all of Bangalore.',
  keywords: [
    'web developer in Bangalore',
    'web development company Bangalore',
    'website developer Bangalore',
    'best web developer Bangalore',
    'React developer Bangalore',
    'Next.js developer Bangalore',
    'full stack developer Bangalore',
    'MERN stack developer Bangalore',
    'web developer Bengaluru',
    'web development company Bengaluru',
    'SaaS development Bangalore',
    'startup web developer Bangalore',
    'web developer Koramangala',
    'web developer Whitefield',
    'web developer Indiranagar',
    'web developer Electronic City',
    'web developer HSR Layout',
    'web developer Marathahalli',
    'affordable web developer Bangalore',
    'SEO company Bangalore',
    'ecommerce developer Bangalore',
    'UI UX design Bangalore',
  ],
  alternates: { canonical: '/web-developer-bangalore' },
  openGraph: {
    title: 'Web Developer in Bangalore — Horizon Web Labs',
    description:
      'Top-rated web development for Bangalore startups and businesses. React, Next.js, SaaS, SEO & UI/UX. Serving Koramangala, Whitefield, Indiranagar, Electronic City & all of Bengaluru.',
    url: '/web-developer-bangalore',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you provide web development services in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Web Labs provides professional web development services to startups, SMEs, and enterprises in Bangalore (Bengaluru). We work 100% remotely and have delivered projects for tech startups, e-commerce businesses, SaaS companies, and service businesses across Koramangala, Whitefield, Indiranagar, HSR Layout, Electronic City, and other Bangalore areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does web development cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Web development costs vary by project scope. A landing page starts from ₹15,000. A business website starts from ₹25,000. A full custom web application starts from ₹75,000. SaaS MVP builds start from ₹1,50,000. We offer transparent pricing with no hidden charges — ideal for Bangalore startups on a budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you build SaaS products and web applications for Bangalore startups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — this is a core strength. We build SaaS MVPs, internal dashboards, B2B portals, and full-stack web applications using React, Next.js, Node.js, and MongoDB. We follow startup best practices: lean builds, fast iteration, scalable architecture from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are you different from Bangalore-based agencies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer Bangalore-level quality at significantly lower cost — no Bangalore office overhead means better value for you. Our team specialises in modern stack (Next.js, React, Node.js), we communicate in clear English, and every project gets direct founder attention with no outsourcing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started from Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fill out our contact form or email weblabshorizon@gmail.com. We will schedule a free 30-minute discovery call and send a detailed proposal within 24 hours. Everything is handled remotely — Google Meet, Slack, and WhatsApp for communication.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Web Developer in India', item: `${BASE}/web-developer-india` },
    { '@type': 'ListItem', position: 3, name: 'Web Developer in Bangalore', item: `${BASE}/web-developer-bangalore` },
  ],
};

const areas = ['Koramangala', 'Whitefield', 'Indiranagar', 'Electronic City', 'HSR Layout', 'Marathahalli', 'JP Nagar', 'Bellandur', 'Sarjapur Road', 'Hebbal', 'Yelahanka', 'Bannerghatta Road', 'BTM Layout', 'Jayanagar'];

const services = [
  { icon: Code2, title: 'SaaS & Web Application Development', desc: 'React, Next.js & Node.js SaaS MVPs, internal tools, and full-stack web apps built for Bangalore startups and scale-ups.', color: '#6d28d9' },
  { icon: Globe, title: 'Corporate & Startup Websites', desc: 'High-converting marketing websites and product landing pages that reflect the quality Bangalore-level businesses expect.', color: '#0369a1' },
  { icon: Search, title: 'SEO & Digital Growth', desc: 'Rank on Google for your target keywords. Data-driven SEO strategies that reduce CAC and drive organic leads in Bangalore\'s competitive market.', color: '#b45309' },
  { icon: Star, title: 'E-Commerce Development', desc: 'Scalable online stores with Shopify, WooCommerce, or fully custom builds. Fast, mobile-first, conversion-optimized.', color: '#be185d' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting campaign and product landing pages. Ideal for Bangalore startups running paid ads or product launches.', color: '#0d9488' },
  { icon: Shield, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces designed in Figma — from wireframes to pixel-perfect design systems that developers can build from.', color: '#15803d' },
];

export default function WebDeveloperBangalorePage() {
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
            <Link href="/web-developer-india" className="hover:text-violet-600 transition-colors">India</Link>
            <span>/</span>
            <span className="text-zinc-600">Web Developer in Bangalore</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Bangalore (Bengaluru), Karnataka
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in{' '}
              <span className="gradient-text">Bangalore</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Looking for a trusted <strong className="text-zinc-700">web developer in Bangalore</strong>? Horizon Web Labs builds modern websites, SaaS products, and custom web applications for Bangalore startups and growing businesses — with Bangalore-quality output at startup-friendly pricing.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              Bangalore is India's Silicon Valley — home to thousands of startups, global tech giants, and innovative SMEs. In this hyper-competitive market, your website and digital presence are your first impression. We build digital products that make you stand out, convert visitors, and scale with your business.
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
                See Our Portfolio
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
              { value: '3+', label: 'Years Experience' },
              { value: '24h', label: 'Response Time' },
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
              Web Development Services in Bangalore
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Everything Bangalore startups and businesses need to win online.
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

      {/* Areas */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4">
            Areas We Serve in Bangalore
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            We work with businesses from every major neighbourhood in Bengaluru.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 text-sm font-medium">
                {area}
              </span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Also serving{' '}
            <Link href="/web-developer-hyderabad" className="text-violet-600 hover:underline">Hyderabad</Link>
            {', '}
            <Link href="/web-developer-telangana" className="text-violet-600 hover:underline">Telangana</Link>
            {' and '}
            <Link href="/web-developer-india" className="text-violet-600 hover:underline">all of India</Link>.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-6">
                Bangalore Quality. Without Bangalore Overhead.
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Most Bangalore-based agencies charge a premium — not because their work is better, but because of office rent, large teams, and multiple layers of management. We operate lean: a focused team of specialists delivering Bangalore-grade quality at significantly lower cost.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                Every project gets direct access to senior developers. No juniors handling your build. No outsourcing to other vendors. No surprise invoices. Just clean, modern, fast web development delivered on time.
              </p>
              <ul className="space-y-3">
                {[
                  'Modern stack — React, Next.js, Node.js, MongoDB',
                  'Remote-first — Google Meet, Slack, WhatsApp',
                  'Direct founder/senior developer access',
                  'No outsourcing — we build everything in-house',
                  'Transparent pricing — no hidden charges',
                  '3-month free post-launch support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-violet-700 rounded-3xl text-white">
              <p className="text-violet-300 text-sm font-bold uppercase tracking-widest mb-3">Ready to start?</p>
              <h3 className="text-2xl font-black mb-4">Launch Your Bangalore Project Today</h3>
              <p className="text-violet-200 leading-relaxed mb-6">
                Share your requirements and get a detailed proposal with transparent pricing within 24 hours. Free discovery call, no strings attached.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-6 py-3 rounded-full hover:bg-violet-50 transition-colors"
              >
                Request a Free Quote <ArrowRight className="w-4 h-4" />
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
            <p className="text-zinc-500">Common questions from Bangalore businesses and startups about web development.</p>
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
            Let's Build Your Bangalore Project
          </h2>
          <p className="text-zinc-500 mb-8 text-lg">
            Get a free project consultation from Horizon Web Labs. We respond within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
