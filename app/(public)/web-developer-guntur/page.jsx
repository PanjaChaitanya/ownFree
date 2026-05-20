import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://horizonweblabs.vercel.app';

export const metadata = {
  title: 'Web Developer in Guntur — Best Web Development Company Guntur',
  description:
    'Need a web developer in Guntur? Horizon Web Labs builds custom websites, React apps, SEO solutions, and e-commerce stores for businesses in Guntur, Amaravathi, Tenali, Mangalagiri, and across Guntur district.',
  keywords: [
    'web developer in Guntur',
    'web development company Guntur',
    'website developer Guntur',
    'best web developer Guntur',
    'web design Guntur',
    'React developer Guntur',
    'full stack developer Guntur',
    'SEO company Guntur',
    'ecommerce developer Guntur',
    'website development Guntur',
    'web developer near me Guntur',
    'affordable web developer Guntur',
    'web developer Amaravathi',
    'web developer Tenali',
    'web developer Mangalagiri',
    'web developer Narasaraopet',
    'digital agency Guntur',
    'agriculture website Guntur',
    'startup web developer Guntur',
    'business website Guntur',
  ],
  alternates: { canonical: '/web-developer-guntur' },
  openGraph: {
    title: 'Web Developer in Guntur — Horizon Web Labs',
    description:
      'Top-rated web development for Guntur businesses. Custom websites, React apps, SEO & e-commerce. Serving Amaravathi, Tenali, Mangalagiri & all of Guntur district.',
    url: '/web-developer-guntur',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you have web developers serving Guntur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Web Labs provides professional web development services to businesses in Guntur city and across Guntur district, including Amaravathi, Tenali, Mangalagiri, and Narasaraopet. We work 100% remotely — location is never a barrier.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost in Guntur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A basic business website in Guntur starts from ₹12,000–₹18,000. E-commerce stores start from ₹35,000. Custom web applications start from ₹70,000. We offer installment-friendly payment plans so cost is never a barrier for Guntur businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you build websites for agriculture and trading businesses in Guntur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Guntur is a major trading hub, especially for chillies, cotton, and tobacco. We build B2B portals, product catalog websites, and online inquiry systems tailored for agriculture traders, commission agents, cold storage businesses, and exporters in the Guntur market.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my Guntur business website show up on Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — SEO is built into every website we create. We optimize on-page elements, local schema markup, Google Business profile, and page speed so your Guntur business ranks in local searches. We also provide post-launch SEO support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started from Guntur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fill out our contact form or email weblabshorizon@gmail.com. We will schedule a free 30-minute consultation call to understand your project and send a detailed proposal within 24 hours. No in-person visit needed.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Andhra Pradesh', item: `${BASE}/web-developer-andhra-pradesh` },
    { '@type': 'ListItem', position: 3, name: 'Web Developer in Guntur', item: `${BASE}/web-developer-guntur` },
  ],
};

const areas = ['Brodipet', 'Arundelpet', 'Nagarampalem', 'Kothapet', 'Lakshmipuram', 'Amaravathi', 'Tenali', 'Mangalagiri', 'Narasaraopet', 'Ponnur', 'Sattenapalli'];

const services = [
  { icon: Globe, title: 'Business & Corporate Websites', desc: 'Professional multi-page websites for Guntur businesses — agriculture, trading, education, healthcare, and retail.', color: '#6d28d9' },
  { icon: Code2, title: 'B2B Portals & Web Applications', desc: 'Scalable portals for traders, exporters, and commission agents in Guntur\'s large commodity markets.', color: '#0369a1' },
  { icon: Search, title: 'Local SEO — Guntur', desc: 'Rank on Google when customers search for your products or services in Guntur district. More leads, less ad spend.', color: '#b45309' },
  { icon: Star, title: 'E-Commerce Development', desc: 'Sell agricultural products, local handicrafts, or any merchandise online with a mobile-first store.', color: '#be185d' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting campaign pages optimized for Guntur audiences. Ideal for education institutes, clinics, and services.', color: '#0d9488' },
  { icon: Shield, title: 'Website Maintenance', desc: 'Keep your website secure, fast, and up to date with our reliable ongoing support plans.', color: '#15803d' },
];

export default function WebDeveloperGunturPage() {
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
            <Link href="/web-developer-andhra-pradesh" className="hover:text-violet-600 transition-colors">Andhra Pradesh</Link>
            <span>/</span>
            <span className="text-zinc-600">Web Developer in Guntur</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Guntur, Andhra Pradesh
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in{' '}
              <span className="gradient-text">Guntur</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Looking for a trusted <strong className="text-zinc-700">web developer in Guntur</strong>? Horizon Web Labs builds modern websites and web applications for Guntur businesses — from Brodipet's commercial hub to Amaravathi's growing capital region. We deliver digital solutions that drive real business results.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              Guntur is one of AP's most economically significant cities — a major trading center for chillies, cotton, and agricultural commodities, and home to a thriving education and healthcare sector. As Amaravathi develops nearby, the entire region is set for accelerated digital growth.
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
              Web Development Services in Guntur
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Digital solutions tailored for Guntur's diverse business ecosystem.
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
            Areas We Serve in Guntur District
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            We work with businesses across Guntur city and all major towns in the district.
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
            <Link href="/web-developer-vijayawada" className="text-violet-600 hover:underline">Vijayawada</Link>
            {', '}
            <Link href="/web-developer-vizag" className="text-violet-600 hover:underline">Vizag</Link>
            {' and '}
            <Link href="/web-developer-andhra-pradesh" className="text-violet-600 hover:underline">all of Andhra Pradesh</Link>.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-6">
                Built for Guntur's Growing Business Community
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Guntur is AP's commercial powerhouse — one of the world's largest chilli trading centers, home to major educational institutions, and a rising healthcare hub. With Amaravathi, the new state capital, taking shape just 20km away, the whole region is on an upward trajectory.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                From agricultural traders who need a B2B inquiry portal to coaching institutes that need a student enrollment website, we understand Guntur's business landscape and build digital solutions that deliver real ROI.
              </p>
              <ul className="space-y-3">
                {[
                  'Telugu & English communication — zero language barriers',
                  'Experienced with trading, agriculture & education sectors',
                  'Remote-first — no in-person meeting required',
                  'EMI / installment payment plans available',
                  'All websites include SEO & Google Analytics setup',
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
              <h3 className="text-2xl font-black mb-4">Get Your Guntur Business Online Today</h3>
              <p className="text-violet-200 leading-relaxed mb-6">
                Share your requirements and get a detailed proposal with transparent pricing within 24 hours. Free consultation, zero commitment.
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
            <p className="text-zinc-500">Common questions from Guntur businesses about web development.</p>
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
            Let's Grow Your Guntur Business Online
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
