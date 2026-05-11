'use client';
import { motion } from 'framer-motion';
import { MessageCircle, PenTool, Code2, Rocket } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, fadeUp } from '@/animations/variants';

const steps = [
  { icon: MessageCircle, label: 'Step 01', title: 'Discovery Call', description: 'Free 30-minute call to understand your goals, audience, timeline, and budget. No commitment needed.', color: '#6d28d9' },
  { icon: PenTool, label: 'Step 02', title: 'Design & Proposal', description: 'We create wireframes, select your tech stack, and send a detailed proposal with milestones and pricing.', color: '#0d9488' },
  { icon: Code2, label: 'Step 03', title: 'Build & Iterate', description: 'Weekly progress demos. You give feedback, we iterate — no surprises at the end.', color: '#b45309' },
  { icon: Rocket, label: 'Step 04', title: 'Launch & Support', description: 'We deploy, handle DNS, test across devices, and stay on for 30 days post-launch.', color: '#15803d' },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How We Work"
          title="Our Process, Simplified"
          subtitle="A proven four-step process that keeps you in control and delivers results on schedule."
        />

        <div className="relative">
          {/* Animated connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
            className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-violet-300 via-violet-200 to-violet-300 z-0"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="relative z-10 text-center group">
                  {/* Step number indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex justify-center mb-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0], boxShadow: `0 8px 28px ${step.color}30` }}
                      transition={{ duration: 0.4 }}
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-white border-2 shadow-sm cursor-default"
                      style={{ borderColor: `${step.color}50`, boxShadow: `0 4px 16px ${step.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                      {/* Ping animation on icon */}
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                        className="absolute inset-0 rounded-2xl"
                        style={{ backgroundColor: `${step.color}15` }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="inline-block text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </motion.span>
                  <h3 className="text-lg font-black text-zinc-900 mb-3 group-hover:text-violet-700 transition-colors">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
