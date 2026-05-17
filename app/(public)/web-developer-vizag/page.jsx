import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

export const metadata = {
  title: 'Web Developer in Vizag (Visakhapatnam) — Top Web Development Company',
  description:
    'Need a web developer in Vizag? Horizon Web Labs builds custom websites, React apps, SEO solutions, and e-commerce stores for businesses in Visakhapatnam. Serving Waltair, Dwaraka Nagar, MVP Colony, Gajuwaka, and all of Vizag.',
  keywords: [
    'web developer in Vizag',
    'web developer Visakhapatnam',
    'web development company Vizag',
    'website developer Vizag',
    'best web developer Vizag',
    'web design Vizag',
    'React developer Vizag',
    'full stack developer Visakhapatnam',
    'SEO company Vizag',
    'ecommerce developer Vizag',
    'website development Visakhapatnam',
    'web developer near me Vizag',
    'affordable web developer Vizag',
    'startup web developer Vizag',
    'web developer Waltair',
    'web developer Dwaraka Nagar',
    'web developer MVP Colony',
    'web developer Gajuwaka',
    'web developer Rushikonda',
    'digital agency Vizag',
  ],
  alternates: { canonical: '/web-developer-vizag' },
  openGraph: {
    title: 'Web Developer in Vizag (Visakhapatnam) — Horizon Web Labs',
    description:
      'Top-rated web development for Vizag businesses. Custom websites, React apps, SEO & e-commerce. Serving Waltair, Dwaraka Nagar, MVP Colony, Gajuwaka & all of Visakhapatnam.',
    url: '/web-developer-vizag',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you have web developers in Vizag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Horizon Web Labs provides professional web development services to businesses in Visakhapatnam (Vizag). We work remotely with Vizag clients and have successfully delivered projects for businesses in Waltair, Dwaraka Nagar, MVP Colony, Gajuwaka, Rushikonda, and across the city.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost in Vizag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A basic business website in Vizag starts from ₹12,000–₹20,000. E-commerce websites start from ₹35,000. Custom web applications start from ₹75,000. We offer EMI-friendly payment options and competitive pricing for Vizag businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help my Vizag business rank on Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We specialize in local SEO for Vizag businesses. We optimize your website and Google Business profile to appear when customers search for your services in Visakhapatnam. All our websites are built SEO-first.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of businesses in Vizag do you work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with a wide range of Vizag businesses — shipping & logistics companies, tourism operators, seafood exporters, educational institutions, hospitals, retail shops, IT companies, startups, restaurants, and real estate agents.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started with Horizon Web Labs from Vizag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply fill out our contact form or email us at weblabshorizon@gmail.com. We\'ll schedule a free 30-minute consultation call to understand your project, and send you a detailed proposal within 24 hours. No in-person meeting required.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizonweblabs.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Web Developer in Vizag', item: 'https://horizonweblabs.vercel.app/web-developer-vizag' },
  ],
};

const vizagAreas = ['Waltair', 'Dwaraka Nagar', 'MVP Colony', 'Gajuwaka', 'Rushikonda', 'Bheemunipatnam', 'Steel Plant Area', 'Madhurawada', 'Kommadi', 'Seethammadhara', 'Akkayyapalem', 'Port Area'];

const services = [
  { icon: Code2, title: 'Custom Web Applications', desc: 'Scalable React & Node.js applications for Vizag businesses in shipping, logistics, tourism, and more.', color: '#6d28d9' },
  { icon: Globe, title: 'Business & Corporate Websites', desc: 'Professional multi-page websites that represent your Vizag business online with authority.', color: '#0369a1' },
  { icon: Search, title: 'Local SEO — Vizag', desc: 'Rank on Google when customers search for your service in Visakhapatnam. More calls, more leads.', color: '#b45309' },
  { icon: Star, title: 'E-Commerce Development', desc: 'Start selling online. We build fast, mobile-first stores for Vizag retailers and exporters.', color: '#be185d' },
  { icon: Zap, title: 'Landing Pages', desc: 'High-converting pages for your campaigns. Optimized for leads, calls, and sign-ups.', color: '#0d9488' },
  { icon: Shield, title: 'Website Maintenance', desc: 'Keep your existing Vizag business website secure, fast, and up to date.', color: '#15803d' },
];

export default function WebDeveloperVizagPage() {
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
            <span className="text-zinc-600">Web Developer in Vizag</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Visakhapatnam (Vizag), AP
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Web Developer in{' '}
              <span className="gradient-text">Vizag</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Looking for a trusted <strong className="text-zinc-700">web developer in Visakhapatnam</strong>? Horizon Web Labs builds modern websites and web applications for Vizag businesses — from the Port Trust area to Rushikonda's growing tech corridor. We've helped Vizag companies establish, grow, and dominate their online presence.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              Vizag is growing fast as an IT and business hub — with major investments coming into the city. Whether you're an established shipping company, a new startup, a retail business, or a hospitality venture, your customers are searching online. We make sure they find you.
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
              Web Development Services in Vizag
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Everything your Vizag business needs to compete online.
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
            Areas We Serve in Visakhapatnam
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            We work with businesses across all major localities in Vizag.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {vizagAreas.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-600 text-sm font-medium">
                {area}
              </span>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-6">
            Also serving{' '}
            <Link href="/web-developer-vijayawada" className="text-violet-600 hover:underline">Vijayawada</Link>
            {', '}
            <Link href="/web-developer-hyderabad" className="text-violet-600 hover:underline">Hyderabad</Link>
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
                Built for Vizag's Growing Business Scene
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                Vizag (Visakhapatnam) is becoming one of India's fastest-growing cities — with IT parks, port expansion, and new industries driving economic growth. Businesses that invest in a strong online presence now will have a major competitive advantage.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                From seafood exporters who need a B2B portal to tourism operators who need a booking system, we understand the unique needs of Vizag businesses and build solutions that deliver real results.
              </p>
              <ul className="space-y-3">
                {[
                  'Telugu & English communication — no language barriers',
                  'Remote-first — no need to travel to meet us',
                  'EMI / installment payment plans available',
                  'All websites include basic SEO & Google Analytics setup',
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
              <h3 className="text-2xl font-black mb-4">Get Your Vizag Business Online Today</h3>
              <p className="text-violet-200 leading-relaxed mb-6">
                Share your requirements and get a detailed proposal with pricing within 24 hours. Free consultation, no commitment.
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
            <p className="text-zinc-500">Common questions from Vizag businesses about web development.</p>
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
            Let's Grow Your Vizag Business Online
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
