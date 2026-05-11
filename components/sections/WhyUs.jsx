'use client';
import { motion } from 'framer-motion';
import {
  Zap, Shield, Clock, MessageCircle,
  TrendingUp, Code2, Palette, HeartHandshake,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { staggerContainer, fadeUp } from '@/animations/variants';

const reasons = [
  { icon: Zap, title: 'Fast Delivery', description: 'Landing pages in 1-2 weeks, full apps in 4-8 weeks with weekly check-ins.', color: '#b45309' },
  { icon: Code2, title: 'Clean Code', description: 'Production-ready with proper documentation, tests, and architecture you can build on.', color: '#6d28d9' },
  { icon: Palette, title: 'Premium Design', description: 'Every pixel is intentional. Interfaces that feel as good as they look.', color: '#be185d' },
  { icon: Shield, title: 'Security First', description: 'HTTPS, sanitised inputs, secure auth, and regular vulnerability checks.', color: '#0369a1' },
  { icon: TrendingUp, title: 'SEO Optimised', description: 'Every project ships with meta tags, structured data, and Core Web Vitals.', color: '#0d9488' },
  { icon: MessageCircle, title: 'Clear Comms', description: 'Daily updates, a shared project board, and a dedicated point of contact.', color: '#7c3aed' },
  { icon: Clock, title: 'On-Time, Always', description: 'We respect your timeline. If something changes, you know immediately.', color: '#15803d' },
  { icon: HeartHandshake, title: 'Ongoing Support', description: 'Flexible retainer plans for updates, new features, and maintenance.', color: '#b91c1c' },
];

function ReasonCard({ reason }) {
  const Icon = reason.icon;
  return (
    <motion.div variants={fadeUp}>
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 16px 40px ${reason.color}18` }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="h-full rounded-2xl border border-zinc-100 overflow-hidden"
      >
        <SpotlightCard
          spotlightColor={`${reason.color}10`}
          className="h-full p-5 flex gap-4 group"
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: `${reason.color}12`, border: `1.5px solid ${reason.color}25` }}
          >
            <Icon style={{ color: reason.color, width: 18, height: 18 }} />
          </motion.div>
          <div>
            <h3 className="text-[15px] font-bold text-zinc-900 mb-1.5 group-hover:text-violet-700 transition-colors">
              {reason.title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{reason.description}</p>
          </div>
        </SpotlightCard>
      </motion.div>
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
            <ReasonCard key={i} reason={reason} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
