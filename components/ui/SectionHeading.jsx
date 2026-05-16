'use client';
import { motion } from 'framer-motion';
import WordReveal from '@/components/ui/WordReveal';

const ease = [0.22, 1, 0.36, 1];

export default function SectionHeading({ badge, title, subtitle, center = true, dark = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease }}
          className="mb-5"
        >
          <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            dark
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'bg-violet-50 text-violet-700 border border-violet-200'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            {badge}
          </span>
        </motion.div>
      )}

      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight tracking-tight mb-4 ${
          dark ? 'text-white' : 'text-zinc-900'
        }`}
      >
        <WordReveal text={title} delay={badge ? 0.1 : 0} />
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.38, ease }}
          className={`text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${
            dark ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        style={{ transformOrigin: center ? 'center' : 'left' }}
        className={`mt-6 h-[2px] w-10 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 ${center ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
