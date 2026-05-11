'use client';
import { motion } from 'framer-motion';
import ScrambleText from '@/components/ui/ScrambleText';

export default function SectionHeading({ badge, title, subtitle, center = true, dark = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          className="mb-4"
        >
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            dark
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'bg-violet-50 text-violet-700 border border-violet-200'
          }`}>
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight tracking-tight mb-4 ${
          dark ? 'text-white' : 'text-zinc-900'
        }`}
      >
        <ScrambleText text={title} duration={800} />
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${
            dark ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: center ? 'center' : 'left' }}
        className={`mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 ${center ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
