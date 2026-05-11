'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const defaultCTA = {
  heading: 'Ready to Build Something Amazing?',
  subheading: "Let's transform your vision into a powerful digital reality. Get a free consultation today — no commitment required.",
  primaryCta: { label: 'Start Your Project', href: '/contact' },
  secondaryCta: { label: 'View Our Work', href: '/projects' },
};

export default function CTASection() {
  const [cta, setCTA] = useState(defaultCTA);

  useEffect(() => {
    fetch('/api/content?section=cta')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.cta) setCTA({ ...defaultCTA, ...json.data.cta }); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative bg-zinc-950 rounded-3xl overflow-hidden px-8 py-16 sm:px-16 text-center"
        >
          {/* Decorative gradient */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #7c3aed 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)' }}
          />

          {/* Top border accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-violet-900/50"
            >
              <Zap className="w-7 h-7 text-white" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              {cta.heading}
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {cta.subheading}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={cta.primaryCta?.href || '/contact'}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 hover:bg-violet-500 text-white text-[15px] font-semibold rounded-xl transition-colors shadow-lg shadow-violet-900/40"
              >
                {cta.primaryCta?.label || 'Start Your Project'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={cta.secondaryCta?.href || '/projects'}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white text-[15px] font-semibold rounded-xl hover:bg-white/8 transition-colors"
              >
                {cta.secondaryCta?.label || 'View Our Work'}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
