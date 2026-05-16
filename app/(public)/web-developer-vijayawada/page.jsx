import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

export const metadata = {
  title: 'Web Developer in Vijayawada — Best Website Development Company',
  description:
    'Top web developer in Vijayawada, Andhra Pradesh. Horizon Web Labs builds websites, web apps, e-commerce stores, and SEO solutions for businesses in Vijayawada, Guntur, and the Krishna district.',
  keywords: [
    'web developer in Vijayawada',
    'web development company Vijayawada',
    'website developer Vijayawada',
    'best web developer Vijayawada',
    'web design Vijayawada',
    'React developer Vijayawada',
    'SEO company Vijayawada',
    'ecommerce developer Vijayawada',
    'web developer near me Vijayawada',
    'affordable web developer Vijayawada',
    'digital agency Vijayawada',
    'startup web developer Vijayawada',
    'web developer Krishna district AP',
  ],
  alternates: { canonical: '/web-developer-vijayawada' },
  openGraph: {
    title: 'Web Developer in Vijayawada — Horizon Web Labs',
    description:
      'Professional web development for Vijayawada businesses. Websites, web apps, SEO & e-commerce. Fast delivery, transparent pricing.',
    url: '/web-developer-vijayawada',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizonweblabs.com' },
    { '@type': 'ListItem', position: 2, name: 'Andhra Pradesh', item: 'https://horizonweblabs.com/web-developer-andhra-pradesh' },
    { '@type': 'ListItem', position: 3, name: 'Web Developer in Vijayawada', item: 'https://horizonweblabs.com/web-developer-vijayawada' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a website cost in Vijayawada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A basic business website in Vijayawada starts at ₹12,000. E-commerce stores start at ₹30,000. Custom web applications start from ₹70,000. We offer installment-based payments and competitive pricing for Vijayawada businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide web development services in Vijayawada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Web Labs provides end-to-end web development services to businesses in Vijayawada, Guntur, Tenali, Eluru, and the broader Krishna and Guntur districts. We work remotely, so you can get started without a physical meeting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help my Vijayawada business rank on Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer dedicated local SEO services for Vijayawada businesses. We optimize for searches like "best hospital in Vijayawada" or "CA firm Vijayawada." All our websites include basic SEO setup by default.',
      },
    },
  ],
};

const areas = ['MG Road Area', 'Benz Circle', 'Moghalrajpuram', 'Suryaraopet', 'Governorpet', 'Patamata', 'Auto Nagar', 'Kanuru', 'Gannavaram', 'Guntur'];

const services = [
  { icon: Globe, title: 'Business Websites', desc: 'Professional multi-page websites for Vijayawada businesses in trade, education, and services.', color: '#0369a1' },
  { icon: Search, title: 'SEO — Rank in Vijayawada', desc: 'Local SEO that puts your business on page 1 for searches in Vijayawada and Krishna district.', color: '#b45309' },
  { icon: Star, title: 'E-Commerce Stores', desc: 'Sell online with a mobile-first store. Perfect for Vijayawada retailers and traders going digital.', color: '#be185d' },
  { icon: Code2, title: 'Web Applications', desc: 'Custom software solutions for Vijayawada businesses — ERPs, portals, booking systems, and more.', color: '#6d28d9' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting pages for your Google Ads and social media campaigns.', color: '#0d9488' },
  { icon: Shield, title: 'Website Maintenance', desc: 'Keep your site fast, secure, and updated with our maintenance plans.', color: '#15803d' },
];

export default function WebDeveloperVijayawadaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/web-developer-andhra-pradesh" className="hover:text-violet-600 transition-colors">Andhra Pradesh</Link>
            <span>/</span>
            <span className="text-zinc-600">Web Developer in Vijayawada</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Vijayawada, Andhra Pradesh
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in <span className="gradient-text">Vijayawada</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Vijayawada is the <strong className="text-zinc-700">commercial capital of Andhra Pradesh</strong> — a city of traders, manufacturers, and growing IT businesses. Horizon Web Labs helps Vijayawada businesses establish a powerful digital presence that drives real growth.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              From traditional Vijayawada businesses going digital to modern startups in the city's growing tech scene — we build websites and web applications that rank on Google, convert visitors, and scale with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 transition-all duration-200">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-violet-50 border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Satisfied Clients' },
              { value: '₹15K', label: 'Starting Price' },
              { value: '24h', label: 'Quote Turnaround' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-black text-violet-700 mb-1">{s.value}</div>
                <div className="text-sm text-zinc-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">Services for Vijayawada Businesses</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Complete web solutions for every type of business in Vijayawada.</p>
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

      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4">Areas We Serve in Vijayawada</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {areas.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 text-sm font-medium">{area}</span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Also serving{' '}
            <Link href="/web-developer-vizag" className="text-violet-600 hover:underline">Vizag</Link>,{' '}
            <Link href="/web-developer-hyderabad" className="text-violet-600 hover:underline">Hyderabad</Link>, and{' '}
            <Link href="/web-developer-andhra-pradesh" className="text-violet-600 hover:underline">all of AP</Link>.
          </p>
        </div>
      </section>

      <section className="py-20 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Frequently Asked Questions</h2>
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

      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">Ready to Grow Your Vijayawada Business?</h2>
          <p className="text-zinc-500 mb-8 text-lg">Contact us today for a free consultation and quote.</p>
          <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
