'use client';
import { motion } from 'framer-motion';
import { MessageCircle, PenTool, Code2, Rocket } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { staggerContainer, fadeUp } from '@/animations/variants';

const steps = [
  {
    icon: MessageCircle,
    label: 'Step 01',
    title: 'Discovery Call',
    description: 'We start with a free 30-minute call to understand your goals, audience, timeline, and budget. No commitment needed.',
    color: '#6d28d9',
  },
  {
    icon: PenTool,
    label: 'Step 02',
    title: 'Design & Proposal',
    description: 'We create wireframes, select your tech stack, and send a detailed proposal with milestones and pricing.',
    color: '#0d9488',
  },
  {
    icon: Code2,
    label: 'Step 03',
    title: 'Build & Iterate',
    description: 'Development starts with weekly progress demos. You give feedback, we iterate — no surprises at the end.',
    color: '#b45309',
  },
  {
    icon: Rocket,
    label: 'Step 04',
    title: 'Launch & Support',
    description: 'We deploy, handle DNS, test across devices, and stay on for 30 days of post-launch support.',
    color: '#15803d',
  },
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-zinc-200 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={i} variants={fadeUp} className="relative z-10 text-center">
                {/* Icon circle */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white border-2 shadow-sm"
                    style={{ borderColor: `${step.color}40`, boxShadow: `0 4px 16px ${step.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                </div>

                <span className="inline-block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                  {step.label}
                </span>
                <h3 className="text-lg font-black text-zinc-900 mb-3">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
