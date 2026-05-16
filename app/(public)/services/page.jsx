'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Code2, Globe, Search, FileText, Smartphone, Layout,
  Rocket, Zap, TrendingUp, Palette, Shield, Star,
  CheckCircle, ArrowRight,
} from 'lucide-react';
import { fadeUp } from '@/animations/variants';
import Button from '@/components/ui/Button';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const iconMap = {
  Code2, Globe, Search, FileText, Smartphone, Layout,
  Rocket, Zap, TrendingUp, Palette, Shield, Star,
  User: Code2, Briefcase: Layout,
};

const defaultServices = [
  {
    _id: '1', title: 'Web App Development', slug: 'web-development', icon: 'Code2', color: '#6d28d9',
    shortDescription: 'Custom full-stack applications built with modern frameworks.',
    description: 'Custom full-stack applications built with modern frameworks. From simple CRUD apps to complex multi-tenant SaaS platforms.',
    features: ['Next.js 14 / React', 'REST & GraphQL APIs', 'PostgreSQL / MongoDB', 'Auth, payments, email', 'Admin dashboards', 'CI/CD deployment'],
    pricing: { startingAt: 2500, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '2', title: 'Landing Pages', slug: 'landing-pages', icon: 'Layout', color: '#0d9488',
    shortDescription: 'Conversion-focused landing pages that turn visitors into paying customers.',
    description: 'Conversion-focused landing pages that turn visitors into paying customers. Fast, beautiful, and built to convert.',
    features: ['Mobile-first design', 'A/B tested layouts', 'CMS integration', 'Analytics & tracking', 'Fast load (90+ score)', 'Ongoing optimisation'],
    pricing: { startingAt: 500, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '3', title: 'SEO Services', slug: 'seo', icon: 'Search', color: '#b45309',
    shortDescription: 'Data-driven SEO strategies that move the needle.',
    description: 'Data-driven SEO strategies that move the needle. Technical audits, content strategy, and ongoing rank tracking.',
    features: ['Technical SEO audit', 'Keyword research', 'On-page optimisation', 'Content strategy', 'Link building', 'Monthly reporting'],
    pricing: { startingAt: 499, currency: 'USD', type: 'monthly' },
  },
  {
    _id: '4', title: 'Portfolio & Business Sites', slug: 'portfolio', icon: 'Globe', color: '#0369a1',
    shortDescription: 'Professional websites that establish credibility and attract new clients.',
    description: 'Professional websites that establish credibility and attract new clients. Designed to impress, built to perform.',
    features: ['Custom design', 'CMS-powered content', 'Blog / case studies', 'Contact forms', 'SEO setup', '1 year support'],
    pricing: { startingAt: 1500, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '5', title: 'UI/UX Design', slug: 'design', icon: 'Palette', color: '#be185d',
    shortDescription: 'Beautiful, intuitive interfaces that users love.',
    description: 'Beautiful, intuitive interfaces that users love. From wireframes to high-fidelity Figma prototypes and design systems.',
    features: ['User research', 'Wireframes & prototypes', 'Design systems', 'Figma handoff', 'Accessibility audit', 'Usability testing'],
    pricing: { startingAt: 800, currency: 'USD', type: 'fixed' },
  },
  {
    _id: '6', title: 'Resume Optimisation', slug: 'resume', icon: 'FileText', color: '#15803d',
    shortDescription: 'ATS-friendly resumes and personal branding that help you stand out.',
    description: 'ATS-friendly resumes and personal branding that help you stand out. Used by engineers who got offers at FAANG companies.',
    features: ['ATS-optimised format', 'LinkedIn profile', 'Personal branding', 'Cover letter templates', 'Job board strategy', '1-on-1 review call'],
    pricing: { startingAt: 149, currency: 'USD', type: 'fixed' },
  },
];

function ServiceStackCard({ service }) {
  const Icon = iconMap[service.icon] || Code2;
  const features = service.features?.slice(0, 6) || [];
  const hasImage = !!service.image;

  return (
    <div
      id={service.slug}
      className="relative w-full bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-xl flex flex-col md:flex-row"
      style={{ minHeight: '22rem' }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
        style={{ backgroundColor: service.color }}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 px-8 md:px-10 py-8 pl-10 md:pl-12">
        {/* Icon + badges row */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: `${service.color}15`, border: `1.5px solid ${service.color}30` }}
          >
            <Icon className="w-7 h-7" style={{ color: service.color }} />
          </div>
          <div className="pt-1">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <h2 className="text-2xl font-black text-zinc-900 leading-tight">{service.title}</h2>
              {service.isFeatured && (
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ color: service.color, background: `${service.color}12` }}
                >
                  <Star className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
              {service.shortDescription || service.description}
            </p>
          </div>
        </div>

        {/* Features grid */}
        {features.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 flex-1">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-600">
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: service.color }} />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Pricing row */}
        <div className="flex items-center justify-between pt-5 border-t border-zinc-100 mt-auto">
          {service.pricing?.startingAt > 0 ? (
            <div>
              <p className="text-zinc-400 text-xs mb-0.5">Starting from</p>
              <p className="text-zinc-900 font-black text-2xl leading-none">
                {service.pricing.currency === 'USD' ? '$' : ''}
                {service.pricing.startingAt.toLocaleString()}
                <span className="text-zinc-400 font-normal text-sm ml-1.5">/ {service.pricing.type}</span>
              </p>
            </div>
          ) : (
            <div />
          )}
          <a
            href={`/contact?service=${service.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:gap-3"
            style={{ color: service.color, backgroundColor: `${service.color}12` }}
          >
            Get started <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Right image panel */}
      {hasImage ? (
        <div className="relative w-full md:w-80 lg:w-96 shrink-0 min-h-[14rem] md:min-h-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent md:block hidden" />
        </div>
      ) : (
        <div
          className="relative w-full md:w-72 lg:w-80 shrink-0 min-h-[6rem] md:min-h-0 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${service.color}18 0%, ${service.color}05 100%)` }}
        >
          <Icon
            className="opacity-[0.07]"
            style={{ color: service.color, width: '10rem', height: '10rem' }}
          />
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          const list = json.data?.services;
          setServices(Array.isArray(list) && list.length > 0 ? list : defaultServices);
        } else {
          setServices(defaultServices);
        }
      })
      .catch(() => setServices(defaultServices))
      .finally(() => setLoading(false));
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

      {/* Scroll stack */}
      <section className="bg-zinc-50 pt-0 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-6 pt-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-zinc-200 p-10 animate-pulse" style={{ minHeight: '22rem' }}>
                  <div className="flex gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-100 shrink-0" />
                    <div className="flex-1 pt-1 space-y-2">
                      <div className="h-6 bg-zinc-100 rounded w-1/2" />
                      <div className="h-4 bg-zinc-100 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-4 bg-zinc-100 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ScrollStack
              useWindowScroll={true}
              itemDistance={80}
              itemScale={0.03}
              itemStackDistance={18}
              stackPosition="9%"
              scaleEndPosition="2%"
              baseScale={0.92}
            >
              {active.map((service) => (
                <ScrollStackItem key={service._id}>
                  <ServiceStackCard service={service} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          )}
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
