'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Globe, Search, FileText, Smartphone, Layout,
  Rocket, Zap, TrendingUp, Palette, Shield, Star,
  CheckCircle, ArrowRight,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '@/animations/variants';
import Button from '@/components/ui/Button';

const iconMap = {
  Code2, Globe, Search, FileText, Smartphone, Layout,
  Rocket, Zap, TrendingUp, Palette, Shield, Star,
  User: Code2, Briefcase: Layout,
};

const defaultServices = [
  {
    _id: '1', title: 'Web App Development', slug: 'web-development', icon: 'Code2', color: '#6d28d9',
    description: 'Custom full-stack applications built with modern frameworks. From simple CRUD apps to complex multi-tenant SaaS platforms.',
    features: ['Next.js 14 / React', 'REST & GraphQL APIs', 'PostgreSQL / MongoDB', 'Auth, payments, email', 'Admin dashboards', 'CI/CD deployment'],
    pricing: { startingAt: 2500, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '2', title: 'Landing Pages', slug: 'landing-pages', icon: 'Layout', color: '#0d9488',
    description: 'Conversion-focused landing pages that turn visitors into paying customers. Fast, beautiful, and built to convert.',
    features: ['Mobile-first design', 'A/B tested layouts', 'CMS integration', 'Analytics & tracking', 'Fast load (90+ score)', 'Ongoing optimisation'],
    pricing: { startingAt: 500, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '3', title: 'SEO Services', slug: 'seo', icon: 'Search', color: '#b45309',
    description: 'Data-driven SEO strategies that move the needle. Technical audits, content strategy, and ongoing rank tracking.',
    features: ['Technical SEO audit', 'Keyword research', 'On-page optimisation', 'Content strategy', 'Link building', 'Monthly reporting'],
    pricing: { startingAt: 499, currency: 'USD', type: 'monthly' },
  },
  {
    _id: '4', title: 'Portfolio & Business Sites', slug: 'portfolio', icon: 'Globe', color: '#0369a1',
    description: 'Professional websites that establish credibility and attract new clients. Designed to impress, built to perform.',
    features: ['Custom design', 'CMS-powered content', 'Blog / case studies', 'Contact forms', 'SEO setup', '1 year support'],
    pricing: { startingAt: 1500, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '5', title: 'UI/UX Design', slug: 'design', icon: 'Palette', color: '#be185d',
    description: 'Beautiful, intuitive interfaces that users love. From wireframes to high-fidelity Figma prototypes and design systems.',
    features: ['User research', 'Wireframes & prototypes', 'Design systems', 'Figma handoff', 'Accessibility audit', 'Usability testing'],
    pricing: { startingAt: 800, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '6', title: 'Resume Optimisation', slug: 'resume', icon: 'FileText', color: '#15803d',
    description: 'ATS-friendly resumes and personal branding that help you stand out. Used by engineers who got offers at FAANG companies.',
    features: ['ATS-optimised format', 'LinkedIn profile', 'Personal branding', 'Cover letter templates', 'Job board strategy', '1-on-1 review call'],
    pricing: { startingAt: 149, currency: 'USD', type: 'fixed' },
  },
];

function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Code2;
  const features = service.features || [];

  return (
    <motion.div variants={fadeUp} id={service.slug} className="card card-brand flex flex-col p-7">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0"
        style={{ backgroundColor: `${service.color}12`, border: `1.5px solid ${service.color}30` }}
      >
        <Icon className="w-6 h-6" style={{ color: service.color }} />
      </div>

      <h2 className="text-xl font-black text-zinc-900 mb-3">{service.title}</h2>
      <p className="text-zinc-500 text-[15px] leading-relaxed mb-5">{service.description}</p>

      {features.length > 0 && (
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-600">
              <CheckCircle className="w-4 h-4 shrink-0" style={{ color: service.color }} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {service.pricing?.startingAt > 0 && (
        <div className="pt-4 border-t border-zinc-100 mt-auto">
          <p className="text-zinc-500 text-xs mb-1">Starting from</p>
          <p className="text-zinc-900 font-black text-xl">
            {service.pricing.currency === 'USD' ? '$' : ''}{service.pricing.startingAt.toLocaleString()}
            <span className="text-zinc-400 font-normal text-sm ml-1">/ {service.pricing.type}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.services?.length > 0) setServices(json.data.services);
      })
      .catch(() => {});
  }, []);

  const active = services.filter((s) => s.isActive !== false);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Services
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-5"
          >
            Everything You Need to
            <span className="block gradient-text">Compete Online</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed"
          >
            From a single landing page to a full-scale SaaS platform — we have the skills, team, and processes to deliver.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {active.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black text-zinc-900 mb-4">Not Sure Where to Start?</h2>
            <p className="text-zinc-500 mb-8">Book a free 30-minute consultation and we'll help you figure out exactly what you need.</p>
            <Button href="/contact" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
              Book Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
