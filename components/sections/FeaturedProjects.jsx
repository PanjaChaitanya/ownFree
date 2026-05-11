'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight, GitFork } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';
import { staggerContainer, fadeUp } from '@/animations/variants';

const defaultProjects = [
  {
    _id: '1', title: 'SaaS Dashboard', slug: 'saas-dashboard',
    shortDescription: 'A full-featured analytics dashboard with real-time data, team management, and subscription billing.',
    category: 'SaaS', techStack: ['Next.js', 'Prisma', 'Stripe', 'TailwindCSS'],
    thumbnail: '', websiteUrl: '#', isFeatured: true,
  },
  {
    _id: '2', title: 'E-Commerce Platform', slug: 'ecommerce',
    shortDescription: 'High-converting online store with product management, payment processing, and order tracking.',
    category: 'E-Commerce', techStack: ['Next.js', 'MongoDB', 'Shopify API', 'Vercel'],
    thumbnail: '', websiteUrl: '#', isFeatured: true,
  },
  {
    _id: '3', title: 'Agency Landing Page', slug: 'agency-landing',
    shortDescription: 'Bold, conversion-optimised landing page with animations and CMS-powered content.',
    category: 'Landing Page', techStack: ['Next.js', 'Framer Motion', 'Sanity'],
    thumbnail: '', websiteUrl: '#', isFeatured: true,
  },
];

const categoryColors = {
  'SaaS': '#6d28d9',
  'Web App': '#6d28d9',
  'E-Commerce': '#0d9488',
  'Landing Page': '#b45309',
  'Portfolio': '#0369a1',
  'Business Website': '#15803d',
  'Mobile App': '#be185d',
  'Other': '#52525b',
};

function ProjectCard({ project }) {
  const color = categoryColors[project.category] || '#6d28d9';
  const stack = Array.isArray(project.techStack) ? project.techStack : [];

  return (
    <motion.div variants={fadeUp}>
      <TiltCard intensity={5} className="group h-full">
      <div className="card card-brand overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden">
          {project.thumbnail ? (
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
              >
                {project.title[0]}
              </div>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/40 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            {project.websiteUrl && project.websiteUrl !== '#' && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-zinc-800 hover:bg-violet-600 hover:text-white transition-colors shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-zinc-800 hover:bg-violet-600 hover:text-white transition-colors shadow-md"
              >
                <GitFork className="w-4 h-4" />
              </a>
            )}
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[17px] font-bold text-zinc-900 mb-2 leading-tight">{project.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">
            {project.shortDescription || project.description}
          </p>

          {stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {stack.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-zinc-100 rounded-md text-zinc-600 text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors mt-auto"
          >
            View project <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      </TiltCard>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    fetch('/api/projects?featured=true&limit=6')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.projects?.length > 0) setProjects(json.data.projects);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <SectionHeading
            badge="Our Work"
            title="Projects We're Proud Of"
            subtitle="A selection of work that showcases our range and quality."
            center={false}
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-sm font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all shrink-0 self-start sm:self-end"
          >
            All projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.filter((p) => p.isActive !== false).slice(0, 6).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
