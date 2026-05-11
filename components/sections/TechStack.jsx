'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const techs = [
  { name: 'Next.js', bg: '#18181b', text: '#ffffff' },
  { name: 'React', bg: '#0d1117', text: '#61dafb' },
  { name: 'TypeScript', bg: '#3178c6', text: '#ffffff' },
  { name: 'Tailwind CSS', bg: '#0f172a', text: '#38bdf8' },
  { name: 'Node.js', bg: '#166534', text: '#bbf7d0' },
  { name: 'MongoDB', bg: '#14532d', text: '#86efac' },
  { name: 'PostgreSQL', bg: '#1e3a5f', text: '#93c5fd' },
  { name: 'Prisma', bg: '#2d1b69', text: '#c4b5fd' },
  { name: 'Vercel', bg: '#09090b', text: '#ffffff' },
  { name: 'AWS', bg: '#7c2d12', text: '#fed7aa' },
  { name: 'Framer Motion', bg: '#4c0519', text: '#fda4af' },
  { name: 'Stripe', bg: '#1a1a2e', text: '#a5b4fc' },
  { name: 'Cloudinary', bg: '#1e3a5f', text: '#93c5fd' },
  { name: 'GraphQL', bg: '#3d0066', text: '#e879f9' },
  { name: 'Redis', bg: '#7f1d1d', text: '#fca5a5' },
  { name: 'Docker', bg: '#172554', text: '#93c5fd' },
];

const row1 = techs.slice(0, 8);
const row2 = techs.slice(8, 16);

function TechBadge({ tech }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0 select-none"
      style={{ backgroundColor: tech.bg, color: tech.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full opacity-70" style={{ backgroundColor: tech.text }} />
      {tech.name}
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tech Stack"
          title="Tools We Master"
          subtitle="We stay current with the best technologies to give your project an unfair advantage."
        />
      </div>

      {/* Marquee rows — full width, no container constraint */}
      <div className="space-y-3 relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, #fafaf8, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, #fafaf8, transparent)' }} />

        {/* Row 1 — left to right */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex gap-3 w-max"
          >
            {[...row1, ...row1].map((tech, i) => (
              <TechBadge key={i} tech={tech} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — right to left */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            className="flex gap-3 w-max"
          >
            {[...row2, ...row2].map((tech, i) => (
              <TechBadge key={i} tech={tech} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
