'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Shield, Clock, MessageCircle,
  TrendingUp, Code2, Palette, HeartHandshake,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Carousel from '@/components/ui/Carousel';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { fadeUp } from '@/animations/variants';

const reasons = [
  { id: 1, icon: Zap, title: 'Fast Delivery', description: 'Landing pages in 1-2 weeks, full apps in 4-8 weeks with weekly check-ins.', color: '#b45309' },
  { id: 2, icon: Code2, title: 'Clean Code', description: 'Production-ready with proper documentation, tests, and architecture you can build on.', color: '#6d28d9' },
  { id: 3, icon: Palette, title: 'Premium Design', description: 'Every pixel is intentional. Interfaces that feel as good as they look.', color: '#be185d' },
  { id: 4, icon: Shield, title: 'Security First', description: 'HTTPS, sanitised inputs, secure auth, and regular vulnerability checks.', color: '#0369a1' },
  { id: 5, icon: TrendingUp, title: 'SEO Optimised', description: 'Every project ships with meta tags, structured data, and Core Web Vitals.', color: '#0d9488' },
  { id: 6, icon: MessageCircle, title: 'Clear Comms', description: 'Daily updates, a shared project board, and a dedicated point of contact.', color: '#7c3aed' },
  { id: 7, icon: Clock, title: 'On-Time, Always', description: 'We respect your timeline. If something changes, you know immediately.', color: '#15803d' },
  { id: 8, icon: HeartHandshake, title: 'Ongoing Support', description: 'Flexible retainer plans for updates, new features, and maintenance.', color: '#b91c1c' },
];

function ReasonCard({ reason }) {
  const Icon = reason.icon;
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: `0 24px 50px ${reason.color}22` }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="h-full w-full rounded-full border border-white/80 bg-white/95 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
    >
      <SpotlightCard
        spotlightColor={`${reason.color}14`}
        className="relative h-full w-full rounded-full px-8 py-10 sm:px-10 sm:py-12 flex flex-col items-center justify-center text-center group"
      >
        <span className="mb-4 inline-flex rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-[11px] font-bold tracking-[0.24em] text-zinc-400">
          {String(reason.id).padStart(2, '0')}
        </span>

        <motion.div
          whileHover={{ scale: 1.12, rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full shadow-sm"
          style={{
            backgroundColor: `${reason.color}12`,
            border: `1.5px solid ${reason.color}25`,
            boxShadow: `0 14px 32px ${reason.color}14`,
          }}
        >
          <Icon style={{ color: reason.color, width: 26, height: 26 }} />
        </motion.div>

        <div className="max-w-[15rem] space-y-3">
          <h3 className="text-lg sm:text-xl font-black leading-tight text-zinc-900 group-hover:text-violet-700 transition-colors">
            {reason.title}
          </h3>
          <p className="text-zinc-500 text-sm sm:text-[15px] leading-relaxed">
            {reason.description}
          </p>
        </div>

        <div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-current/15 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: reason.color }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: reason.color }} />
          Built in-house
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function WhyUs() {
  const [carouselWidth, setCarouselWidth] = useState(340);

  useEffect(() => {
    const updateCarouselWidth = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setCarouselWidth(500);
        return;
      }

      if (width >= 1024) {
        setCarouselWidth(470);
        return;
      }

      if (width >= 768) {
        setCarouselWidth(430);
        return;
      }

      if (width >= 640) {
        setCarouselWidth(380);
        return;
      }

      setCarouselWidth(Math.max(280, Math.min(width - 24, 320)));
    };

    updateCarouselWidth();
    window.addEventListener('resize', updateCarouselWidth);

    return () => window.removeEventListener('resize', updateCarouselWidth);
  }, []);

  return (
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Built Different, Delivered Better"
          subtitle="We combine technical excellence with a client-first approach to deliver results that speak for themselves."
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative mx-auto flex max-w-5xl flex-col items-center gap-5"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-[115%] -translate-y-1/2 rounded-full bg-amber-200/60 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 translate-x-[20%] -translate-y-[20%] rounded-full bg-violet-200/70 blur-3xl" />

          <div className="relative flex w-full justify-center">
            <Carousel
              items={reasons}
              baseWidth={carouselWidth}
              autoplay
              autoplayDelay={3400}
              pauseOnHover
              loop
              round
              renderItem={(reason) => <ReasonCard reason={reason} />}
              ariaLabel="Reasons to choose Horizon Web Labs"
            />
          </div>

          <p className="max-w-xl text-center text-sm leading-relaxed text-zinc-500">
            Spin through the circle cards to see the standards we bring to every build.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
