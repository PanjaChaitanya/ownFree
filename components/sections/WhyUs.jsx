'use client';
import { motion } from 'framer-motion';
import {
  Zap, Shield, Clock, MessageCircle,
  TrendingUp, Code2, Palette, HeartHandshake,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, fadeUp } from '@/animations/variants';

const reasons = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'We move fast without cutting corners. Landing pages in 1-2 weeks, full apps in 4-8 weeks with weekly check-ins.',
    color: '#b45309',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Production-ready code with proper documentation, tests, and architecture you can build on for years.',
    color: '#6d28d9',
  },
  {
    icon: Palette,
    title: 'Premium Design',
    description: 'Every pixel is intentional. We obsess over detail to create interfaces that feel as good as they look.',
    color: '#be185d',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built with industry best practices — HTTPS, sanitised inputs, secure auth, and regular vulnerability checks.',
    color: '#0369a1',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimised',
    description: 'Every project ships with proper meta tags, structured data, performance optimisation, and Core Web Vitals.',
    color: '#0d9488',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description: 'No ghosting, no surprises. You get daily updates, a shared project board, and a dedicated point of contact.',
    color: '#7c3aed',
  },
  {
    icon: Clock,
    title: 'On-Time, Always',
    description: 'We respect your timeline and budget. If something changes, you know immediately — never at the last minute.',
    color: '#15803d',
  },
  {
    icon: HeartHandshake,
    title: 'Ongoing Support',
    description: 'We don\'t disappear after launch. Flexible retainer plans for updates, new features, and maintenance.',
    color: '#b91c1c',
  },
];

function ReasonCard({ reason, i }) {
  const Icon = reason.icon;
  return (
    <motion.div variants={fadeUp} className="group">
      <div className="flex gap-4 p-5 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 transition-all duration-250">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${reason.color}12`, border: `1.5px solid ${reason.color}25` }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: reason.color, width: 18, height: 18 }} />
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-zinc-900 mb-1.5">{reason.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">{reason.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Built Different, Delivered Better"
          subtitle="We combine technical excellence with a client-first approach to deliver results that speak for themselves."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
