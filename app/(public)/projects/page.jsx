'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, GitFork, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/animations/variants';

const defaultProjects = [
  { _id: '1', title: 'SaaS Analytics Dashboard', slug: 'saas-dashboard', shortDescription: 'Full-featured analytics platform with real-time data, team management, and subscription billing.', category: 'SaaS', techStack: ['Next.js', 'Prisma', 'Stripe'], thumbnail: '', isActive: true, isFeatured: true },
  { _id: '2', title: 'E-Commerce Platform', slug: 'ecommerce', shortDescription: 'High-converting online store with product management, payments, and order tracking.', category: 'E-Commerce', techStack: ['Next.js', 'MongoDB', 'Vercel'], thumbnail: '', isActive: true, isFeatured: false },
  { _id: '3', title: 'Agency Landing Page', slug: 'agency-landing', shortDescription: 'Bold, conversion-optimised landing page with animations and CMS content.', category: 'Landing Page', techStack: ['Next.js', 'Framer Motion'], thumbnail: '', isActive: true, isFeatured: true },
  { _id: '4', title: 'Portfolio Website', slug: 'portfolio', shortDescription: 'Clean, fast portfolio for a senior UX designer showcasing case studies and credentials.', category: 'Portfolio', techStack: ['Next.js', 'Sanity'], thumbnail: '', isActive: true, isFeatured: false },
  { _id: '5', title: 'B2B SaaS MVP', slug: 'b2b-saas', shortDescription: 'Rapid MVP build for a B2B workflow automation tool, launched in 6 weeks.', category: 'Web App', techStack: ['Next.js', 'tRPC', 'Postgres'], thumbnail: '', isActive: true, isFeatured: true },
  { _id: '6', title: 'Restaurant Website', slug: 'restaurant', shortDescription: 'Elegant site with online reservation system, menu, and Google Maps integration.', category: 'Business Website', techStack: ['Next.js', 'MongoDB'], thumbnail: '', isActive: true, isFeatured: false },
];

const allCategories = ['All', 'Web App', 'SaaS', 'E-Commerce', 'Landing Page', 'Portfolio', 'Business Website', 'Other'];

const categoryColors = {
  'SaaS': '#6d28d9', 'Web App': '#6d28d9', 'E-Commerce': '#0d9488',
  'Landing Page': '#b45309', 'Portfolio': '#0369a1',
  'Business Website': '#15803d', 'Mobile App': '#be185d', 'Other': '#52525b',
};

function ProjectCard({ project }) {
  const color = categoryColors[project.category] || '#6d28d9';
  const stack = Array.isArray(project.techStack) ? project.techStack : [];

  return (
    <motion.div variants={fadeUp} layout className="group">
      <div className="card card-brand overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-44 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden shrink-0">
          {project.thumbnail ? (
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                style={{ background: `linear-gradient(135deg, ${color}cc, ${color})` }}
              >
                {project.title[0]}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/40 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            {project.websiteUrl && project.websiteUrl !== '#' && (
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-zinc-800 hover:bg-violet-600 hover:text-white transition-colors shadow-md">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-zinc-800 hover:bg-violet-600 hover:text-white transition-colors shadow-md">
                <GitFork className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: color }}>
              {project.category}
            </span>
          </div>
          {project.isFeatured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-amber-900">Featured</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[17px] font-bold text-zinc-900 mb-2">{project.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{project.shortDescription || project.description}</p>
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {stack.slice(0, 4).map((t) => (
                <span key={t} className="px-2 py-0.5 bg-zinc-100 rounded-md text-zinc-600 text-xs font-medium">{t}</span>
              ))}
            </div>
          )}
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors">
            View project <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(defaultProjects);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects?limit=50')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.projects?.length > 0) setProjects(json.data.projects);
      })
      .catch(() => {});
  }, []);

  const active = projects.filter((p) => p.isActive !== false);
  const categories = ['All', ...new Set(active.map((p) => p.category).filter(Boolean))];
  const filtered = filter === 'All' ? active : active.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Portfolio
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-5"
          >
            Work We're
            <span className="gradient-text"> Proud Of</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-xl text-zinc-500 max-w-2xl mx-auto"
          >
            A curated selection of projects spanning SaaS, e-commerce, landing pages, and beyond.
          </motion.p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="pb-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === cat
                    ? 'bg-violet-700 text-white shadow-sm'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center text-zinc-400 py-20"
              >
                No projects in this category yet.
              </motion.p>
            ) : (
              <motion.div
                key={filter}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
