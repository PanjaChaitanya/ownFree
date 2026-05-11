'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';

function WordReveal({ text, className = '', delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 70, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
          style={{ transformOrigin: 'bottom center' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function CountUp({ to, suffix = '', duration = 1.8 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(to);
    if (isNaN(numeric)) return;
    let frame = 0;
    const steps = Math.ceil(duration * 60);
    const inc = numeric / steps;
    const timer = setInterval(() => {
      frame++;
      setValue(Math.min(Math.round(inc * frame), numeric));
      if (frame >= steps) clearInterval(timer);
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{inView ? `${value}${suffix}` : `0${suffix}`}</span>;
}

const trusts = [
  'On-time delivery, always',
  'Transparent pricing',
  '100% satisfaction guarantee',
];

export default function Hero() {
  const sectionRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 600], [0, -120]);
  const blob2Y = useTransform(scrollY, [0, 600], [0, -60]);
  const contentY = useTransform(scrollY, [0, 400], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  const [hero, setHero] = useState({
    badge: 'Premium Digital Agency',
    heading: 'We Craft Digital Experiences That Matter',
    subheading: 'Full-stack development, SEO, and design solutions crafted for startups and growing businesses worldwide.',
    primaryCta: { label: 'Start a Project', href: '/contact' },
    secondaryCta: { label: 'View Our Work', href: '/projects' },
    stats: [
      { value: '50', suffix: '+', label: 'Projects Delivered' },
      { value: '30', suffix: '+', label: 'Happy Clients' },
      { value: '3', suffix: '+', label: 'Years Experience' },
      { value: '100', suffix: '%', label: 'Satisfaction Rate' },
    ],
  });

  useEffect(() => {
    fetch('/api/content?section=hero')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.hero) setHero((h) => ({ ...h, ...json.data.hero }));
      })
      .catch(() => {});
  }, []);

  const words = (hero.heading || '').split(' ');
  const gradientStart = Math.max(0, words.length - 2);
  const line1 = words.slice(0, gradientStart).join(' ');
  const line2 = words.slice(gradientStart).join(' ');
  const line1WordCount = line1 ? line1.split(' ').length : 0;

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-20">
      {/* Parallax background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 dot-grid opacity-50"
          style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)' }}
        />
        <motion.div
          ref={blob1Ref}
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
          animate={{ scale: [1, 1.06, 1], opacity: [0.07, 0.12, 0.07] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 65%)', y: blob1Y }}
        />
        <motion.div
          ref={blob2Ref}
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)', y: blob2Y }}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-semibold">
              <motion.span
                className="w-2 h-2 rounded-full bg-violet-500 shrink-0"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              {hero.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.25rem] font-black leading-[1.03] tracking-tight mb-8" style={{ perspective: '1000px' }}>
            {line1 && (
              <WordReveal text={line1} className="text-zinc-900 block" delay={0.15} />
            )}
            {line2 && (
              <motion.span
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + line1WordCount * 0.1 + 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block gradient-text"
              >
                {line2}
              </motion.span>
            )}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85 }}
            className="text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {hero.subheading}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <MagneticButton>
              <Link
                href={hero.primaryCta?.href || '/contact'}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-violet-700 hover:bg-violet-800 text-white text-[15px] font-semibold rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(109,40,217,0.28)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.4)] hover:-translate-y-0.5"
              >
                {hero.primaryCta?.label || 'Start a Project'}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href={hero.secondaryCta?.href || '/projects'}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 text-[15px] font-semibold rounded-full hover:bg-zinc-50 hover:border-zinc-300 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                {hero.secondaryCta?.label || 'View Our Work'}
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.15 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-16"
          >
            {trusts.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-1.5 text-sm text-zinc-500"
              >
                <CheckCircle className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                {item}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.3 }}
            className="border-t border-zinc-200 pt-12 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {(hero.stats || []).map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <div className="text-3xl sm:text-4xl font-black text-zinc-900 tabular-nums">
                  <CountUp to={stat.value} suffix={stat.suffix || ''} />
                </div>
                <div className="text-sm text-zinc-500 mt-1.5 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
