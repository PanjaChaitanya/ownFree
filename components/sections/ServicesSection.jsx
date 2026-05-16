'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code2, Globe, Search, FileText, Smartphone, Layout,
  Rocket, Zap, TrendingUp, Palette, Shield, Star, ArrowRight,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { staggerContainer, fadeUp } from '@/animations/variants';

const iconMap = {
  Code2, Globe, Search, FileText, Smartphone, Layout,
  Rocket, Zap, TrendingUp, Palette, Shield, Star,
  User: Code2,
  Briefcase: Layout,
};

const defaultServices = [
  {
    _id: '1', title: 'Web App Development', slug: 'web-development',
    shortDescription: 'Custom full-stack applications built with Next.js, React, and modern backend technologies.',
    icon: 'Code2', color: '#6d28d9',
    features: ['Next.js & React', 'REST & GraphQL APIs', 'Database design', 'Auth & payments'],
  },
  {
    _id: '2', title: 'Landing Pages', slug: 'landing-pages',
    shortDescription: 'Conversion-focused landing pages that turn visitors into customers with compelling design.',
    icon: 'Layout', color: '#0d9488',
    features: ['A/B tested layouts', 'Fast load times', 'Mobile-first', 'Analytics setup'],
  },
  {
    _id: '3', title: 'SEO Services', slug: 'seo',
    shortDescription: 'Data-driven SEO strategies that improve your search rankings and drive organic traffic.',
    icon: 'Search', color: '#b45309',
    features: ['Technical SEO audit', 'Keyword research', 'Content strategy', 'Link building'],
  },
  {
    _id: '4', title: 'Portfolio & Business Sites', slug: 'portfolio',
    shortDescription: 'Professional websites that showcase your work and establish credibility with clients.',
    icon: 'Globe', color: '#0369a1',
    features: ['Custom design', 'CMS integration', 'Fast & secure', 'SEO-optimised'],
  },
  {
    _id: '5', title: 'UI/UX Design', slug: 'design',
    shortDescription: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
    icon: 'Palette', color: '#be185d',
    features: ['Figma prototypes', 'Design systems', 'User research', 'Accessibility'],
  },
  {
    _id: '6', title: 'Resume Optimisation', slug: 'resume',
    shortDescription: 'ATS-friendly resumes and personal branding that help you stand out in the job market.',
    icon: 'FileText', color: '#15803d',
    features: ['ATS-optimised', 'LinkedIn profile', 'Personal branding', 'Cover letter'],
  },
];

function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || Code2;
  const features = service.features?.slice(0, 4) || [];

  return (
    <motion.div variants={fadeUp}>
      <TiltCard intensity={6} className="group h-full">
      <Link href={`/services#${service.slug}`} className="block h-full">
        <div className="card card-brand h-full overflow-hidden">
        <SpotlightCard spotlightColor={`${service.color}08`} className="h-full p-6 flex flex-col">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
            style={{ backgroundColor: `${service.color}12`, border: `1.5px solid ${service.color}25` }}
          >
            <Icon className="w-5 h-5" style={{ color: service.color }} />
          </div>

          <h3 className="text-[17px] font-bold text-zinc-900 mb-2 leading-tight">{service.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5 flex-1">
            {service.shortDescription || service.description}
          </p>

          {features.length > 0 && (
            <ul className="space-y-1.5 mb-5">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div
            className="inline-flex items-center gap-1 text-sm font-semibold mt-auto transition-all duration-200"
            style={{ color: service.color }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Learn more</span>
            <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </SpotlightCard>
        </div>
      </Link>
      </TiltCard>
    </motion.div>
  );
}

export default function ServicesSection() {
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
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Do"
          title="Services Built for Results"
          subtitle="From concept to launch, we deliver full-stack solutions that grow with your business."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card card-brand p-6 animate-pulse">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 mb-5" />
                <div className="h-4 bg-zinc-100 rounded mb-2 w-3/4" />
                <div className="h-3 bg-zinc-100 rounded mb-1 w-full" />
                <div className="h-3 bg-zinc-100 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {active.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-violet-700 font-semibold text-sm hover:text-violet-900 transition-colors"
          >
            See all services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
