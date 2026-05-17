import Link from 'next/link';
import { CheckCircle, ArrowRight, Code2, Search, Globe, Zap, Star, Shield } from 'lucide-react';

export const metadata = {
  title: 'Web Developer in India — Affordable & Top-Rated | Horizon Web Labs',
  description:
    'Horizon Web Labs is a top-rated web development company in India. We build custom websites, React & Next.js apps, SaaS products, and SEO solutions for Indian businesses and global clients. Affordable pricing, world-class quality.',
  keywords: [
    'web developer India',
    'web development company India',
    'best web developer India',
    'affordable web development India',
    'top web development company India',
    'hire web developer India',
    'React developer India',
    'Next.js developer India',
    'MERN stack developer India',
    'full stack developer India',
    'Node.js developer India',
    'startup web developer India',
    'SaaS development India',
    'ecommerce developer India',
    'UI UX design company India',
    'SEO company India',
    'custom web application India',
    'offshore web developer India',
    'remote web developer India',
    'Indian web development agency',
    'freelance web developer India',
    'top rated web developer India',
    'web developer for startups India',
    'US UK clients India web developer',
  ],
  alternates: { canonical: '/web-developer-india' },
  openGraph: {
    title: 'Top Web Development Company in India — Horizon Web Labs',
    description:
      'Affordable, world-class web development from India. Custom websites, React & Next.js apps, SEO, and SaaS for Indian and global businesses.',
    url: '/web-developer-india',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why hire a web developer from India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'India has a large pool of highly skilled web developers who deliver world-class work at competitive rates compared to the US, UK, or Europe. Horizon Web Labs specifically combines senior-level React, Next.js, and Node.js expertise with transparent pricing, clear communication, and a product mindset — not just coding-for-hire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients (US, UK, Australia)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with clients worldwide — US, UK, Australia, Canada, and beyond. We adjust our working hours to overlap with your timezone, communicate in English, use global project management tools, and accept payments in USD/GBP. Many of our clients have never met us in person and are very happy with results.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost to hire a web developer from India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs vary by project. A landing page starts from $300 USD. A full business website from $800 USD. A custom web application from $2,500 USD. SaaS products from $5,000 USD. These are significantly lower than equivalent US/UK agency rates while maintaining the same quality standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does your Indian development team use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use the most in-demand modern stack: React 19, Next.js 15, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Tailwind CSS, Prisma, GraphQL, AWS, Cloudinary, Stripe, and more. We stay up to date with industry standards and choose the right tool for each project.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you ensure quality when working remotely across India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We follow a structured process: discovery call → wireframes/scope → sprint-based development → staging review → launch. We use GitHub for version control, Notion for project management, and Slack/WhatsApp for communication. Every deliverable is reviewed before handover, and we offer a 3-month support period post-launch.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizonweblabs.vercel.app' },
    { '@type': 'ListItem', position: 2, name: 'Web Developer in India', item: 'https://horizonweblabs.vercel.app/web-developer-india' },
  ],
};

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js 15', color: '#000' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'Prisma', color: '#0c344b' },
  { name: 'GraphQL', color: '#e10098' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Shopify', color: '#95bf47' },
  { name: 'Stripe', color: '#635bff' },
];

const services = [
  { icon: Code2, title: 'SaaS & Web App Development', desc: 'Build your startup idea or business tool with React, Next.js, and Node.js. MVPs in 6 weeks.', color: '#6d28d9' },
  { icon: Globe, title: 'Corporate & Business Websites', desc: 'Professional multi-language, multi-region websites for Indian and global businesses.', color: '#0369a1' },
  { icon: Search, title: 'SEO & Digital Growth', desc: 'Rank globally with data-driven SEO. We\'ve helped Indian businesses rank in US and UK markets.', color: '#b45309' },
  { icon: Star, title: 'E-Commerce Development', desc: 'Scalable online stores for D2C brands, retailers, and B2B companies across India.', color: '#be185d' },
  { icon: Zap, title: 'Performance Landing Pages', desc: 'High-converting pages for Google Ads, Meta Ads, and product launches in any market.', color: '#0d9488' },
  { icon: Shield, title: 'UI/UX Design Systems', desc: 'Research-backed design from wireframes to Figma handoffs and full implementation.', color: '#15803d' },
];

const process = [
  { step: '01', title: 'Discovery Call', desc: 'Free 30-minute call to understand your business, goals, and requirements.' },
  { step: '02', title: 'Proposal & Scope', desc: 'Detailed proposal with timeline, tech stack, deliverables, and transparent pricing.' },
  { step: '03', title: 'Design & Development', desc: 'Sprint-based development with weekly demos and continuous feedback.' },
  { step: '04', title: 'Launch & Support', desc: 'Go live on your domain with SEO setup, analytics, and 3 months free support.' },
];

export default function WebDeveloperIndiaPage() {
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
            <span className="text-zinc-600">Web Developer in India</span>
          </nav>
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              India — Serving Clients Worldwide
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6">
              Top Web Development<br />
              <span className="gradient-text">Company in India</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed max-w-3xl mb-6">
              Horizon Web Labs is a <strong className="text-zinc-700">top-rated web development company in India</strong>, combining world-class engineering with competitive pricing. We build custom websites, SaaS applications, and digital products for Indian businesses, international startups, and global enterprises.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-3xl mb-10">
              Based in Hyderabad — India's tech capital — our team brings deep expertise in React, Next.js, Node.js, and modern web technologies. We've delivered 50+ projects for clients across India, the US, UK, Australia, and beyond. Whether you're a local Indian business or an overseas company looking to hire Indian developers — you're in the right place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 transition-all duration-200">
                View Portfolio
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
              { value: '10+', label: 'Countries Served' },
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
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">What We Build</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Full-spectrum web development and digital services from our India-based team.
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

      {/* Tech Stack */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-4">Technology Stack</h2>
          <p className="text-zinc-500 mb-10 max-w-xl mx-auto">
            We use the most in-demand modern stack — the same tools used by top global tech companies.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span key={tech.name} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-700 text-sm font-semibold">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">How We Work</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">A clear, transparent process from first contact to launch.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <div key={p.step} className="p-6 rounded-2xl border border-zinc-200 bg-white">
                <div className="text-3xl font-black text-violet-100 mb-3">{p.step}</div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{p.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why hire from India */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-6">
                Why Hire a Web Developer from India?
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                India produces over 1.5 million engineering graduates annually. Indian developers are known globally for strong computer science fundamentals, problem-solving skills, and adaptability to new technologies. Companies like Google, Microsoft, and IBM have large India engineering centres for a reason.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                At Horizon Web Labs specifically, you get senior-level expertise — not entry-level outsourcing. We don't just build what you tell us; we ask the right questions, flag potential issues early, and suggest better approaches when we see them.
              </p>
              <ul className="space-y-3">
                {[
                  'Up to 60% cost savings vs US/UK agencies',
                  'Same or higher quality output',
                  'English-first communication',
                  'GMT+5:30 — daily overlap with EU, US morning overlap',
                  'Agile, sprint-based workflow',
                  'NDA & IP protection agreements standard',
                  'Payments accepted: INR, USD, GBP, AUD',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-2xl border border-zinc-200">
                <h3 className="font-bold text-zinc-900 mb-4">Location Pages</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Web Developer in Hyderabad', href: '/web-developer-hyderabad' },
                    { label: 'Web Developer in Andhra Pradesh', href: '/web-developer-andhra-pradesh' },
                    { label: 'Web Developer in Vizag', href: '/web-developer-vizag' },
                    { label: 'Web Developer in Vijayawada', href: '/web-developer-vijayawada' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-2 text-violet-700 hover:underline text-sm font-medium">
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-violet-700 rounded-2xl text-white">
                <h3 className="font-bold text-xl mb-3">Let's Build Together</h3>
                <p className="text-violet-200 text-sm mb-4">Ready to start? Get a free project quote from our India-based team today.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold px-5 py-2.5 rounded-full hover:bg-violet-50 transition-colors text-sm">
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-zinc-500">Common questions about hiring Indian web developers.</p>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <details key={faq.name} className="group bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden">
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
      <section className="py-20 bg-zinc-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">
            Ready to Work with India's Best Web Developers?
          </h2>
          <p className="text-zinc-500 mb-8 text-lg">
            Join 30+ businesses that chose Horizon Web Labs. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 bg-violet-700 hover:bg-violet-800 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-violet-200 hover:-translate-y-0.5">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 transition-all duration-200">
              See Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
