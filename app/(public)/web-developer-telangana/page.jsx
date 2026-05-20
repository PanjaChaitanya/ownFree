import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

export const metadata = {
  title: 'Web Developer in Telangana — Best Web Development Company Telangana',
  description:
    'Horizon Web Labs provides expert web development services across Telangana — Hyderabad, Warangal, Nizamabad, Karimnagar, Khammam, and beyond. Custom websites, React apps, SEO, and SaaS development.',
  keywords: [
    'web developer in Telangana',
    'web development company Telangana',
    'best web developer Telangana',
    'website developer Telangana',
    'web developer Telangana',
    'React developer Telangana',
    'full stack developer Telangana',
    'SEO company Telangana',
    'web developer Warangal',
    'web developer Nizamabad',
    'web developer Karimnagar',
    'web developer Khammam',
    'web developer Ramagundam',
    'web developer Mahbubnagar',
    'web developer Nalgonda',
    'affordable web development Telangana',
    'top web development company Telangana',
    'startup website developer Telangana',
    'ecommerce developer Telangana',
    'digital agency Telangana',
  ],
  alternates: { canonical: '/web-developer-telangana' },
  openGraph: {
    title: 'Web Developer in Telangana — Horizon Web Labs',
    description:
      'Top-rated web development company serving all of Telangana. Custom websites, React apps, SEO & SaaS for Hyderabad, Warangal, Nizamabad, Karimnagar, and beyond.',
    url: '/web-developer-telangana',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you provide web development services across all of Telangana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Web Labs provides web development services to businesses across all major cities in Telangana including Hyderabad, Warangal, Nizamabad, Karimnagar, Khammam, Ramagundam, Mahbubnagar, Nalgonda, and more. We work remotely so location is never a barrier.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost in Telangana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website pricing varies by project type. Basic business websites start from ₹12,000. E-commerce stores start from ₹35,000. Custom web applications start from ₹75,000. We offer installment-friendly payment plans for Telangana businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help my Telangana business rank on Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We specialize in local SEO for Telangana businesses. We optimize your website and Google Business profile to appear when local customers search for your services. All websites we build include foundational SEO as standard.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of businesses in Telangana do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with businesses across all sectors — IT companies, startups, manufacturing firms, educational institutions, hospitals, government contractors, retail shops, restaurants, agriculture businesses, and more across Telangana.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started from a Telangana city other than Hyderabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply fill out our contact form or email us at weblabshorizon@gmail.com. We work 100% remotely with clients across Telangana — no in-person meetings required. You will receive a detailed proposal within 24 hours.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Web Developer in Telangana', item: `${BASE}/web-developer-telangana` },
  ],
};

const cities = ['Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Siddipet', 'Suryapet', 'Miryalaguda', 'Adilabad', 'Mancherial'];

const services = [
  { icon: Code2, title: 'Custom Web Applications', desc: 'Scalable React & Node.js applications for Telangana businesses in manufacturing, IT, agriculture, and more.', color: '#6d28d9' },
  { icon: Globe, title: 'Business & Corporate Websites', desc: 'Professional multi-page websites that represent your Telangana business with authority and credibility.', color: '#0369a1' },
  { icon: Search, title: 'Local SEO — Telangana', desc: 'Rank on Google when customers in your city search for your services. More calls, more leads, more sales.', color: '#b45309' },
  { icon: Star, title: 'E-Commerce Development', desc: 'Start selling online. We build fast, mobile-first stores for Telangana retailers and exporters.', color: '#be185d' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting pages for your campaigns. Optimized for leads, calls, and sign-ups from Telangana audiences.', color: '#0d9488' },
  { icon: Shield, title: 'Website Maintenance', desc: 'Keep your existing website secure, fast, and up to date with our ongoing support plans.', color: '#15803d' },
];

export default function WebDeveloperTelanganaPage() {
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
            <span className="text-zinc-600">Web Developer in Telangana</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Telangana, India
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in{' '}
              <span className="gradient-text">Telangana</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Looking for a trusted <strong className="text-zinc-700">web developer in Telangana</strong>? Horizon Web Labs builds modern websites and web applications for businesses across the state — from Hyderabad's tech corridors to Warangal's growing commercial hubs. We deliver digital solutions that drive real business growth.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              Telangana is one of India's fastest-growing states — with strong IT infrastructure, government digital initiatives, and a thriving startup ecosystem. Whether you're in manufacturing, education, agriculture, or retail, your customers are online. We make sure they find you.
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
              Web Development Services in Telangana
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Everything your Telangana business needs to compete and grow online.
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
            Cities We Serve in Telangana
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Beyond Hyderabad — we work with businesses in every district of Telangana.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <span key={city} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 text-sm font-medium">
                {city}
              </span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Also serving{' '}
            <Link href="/web-developer-hyderabad" className="text-violet-600 hover:underline">Hyderabad</Link>
            {', '}
            <Link href="/web-developer-andhra-pradesh" className="text-violet-600 hover:underline">Andhra Pradesh</Link>
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
                Built for Telangana's Digital Future
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Telangana has emerged as one of India's premier IT and business destinations. T-Hub, HICC, and Hyderabad's growth as a global tech city has spilled over into tier-2 cities like Warangal and Karimnagar. Businesses that invest in digital now will dominate their categories.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                From government contractors who need a professional web presence to Warangal-based manufacturers who need a B2B portal, we understand Telangana's unique business landscape and build solutions accordingly.
              </p>
              <ul className="space-y-3">
                {[
                  'Telugu & English communication — zero language barriers',
                  'Remote-first — serve all cities without travel',
                  'EMI / installment payment plans available',
                  'SEO-first development — rank on Google from day one',
                  'WhatsApp support during business hours',
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
              <h3 className="text-2xl font-black mb-4">Get Your Telangana Business Online Today</h3>
              <p className="text-violet-200 leading-relaxed mb-6">
                Share your requirements and get a detailed proposal with transparent pricing within 24 hours. Free consultation, no commitment required.
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
            <p className="text-zinc-500">Common questions from Telangana businesses about web development.</p>
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
            Let's Grow Your Telangana Business Online
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
