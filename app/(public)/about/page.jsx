'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Target, Eye, CheckCircle, Users, Zap, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '@/animations/variants';
import Button from '@/components/ui/Button';

const defaultAbout = {
  heading: 'About Horizon Web Labs',
  story: 'We started as a small team of developers and designers who believed that great digital experiences should be accessible to every business — not just the Fortune 500. Today, we\'ve helped 50+ clients across the globe launch products they\'re truly proud of.',
  mission: 'To deliver world-class digital solutions that help startups and growing businesses compete at the highest level.',
  vision: 'A world where every great idea has the digital presence it deserves — regardless of company size or budget.',
  journey: [
    { year: '2021', title: 'Founded', description: 'Started with a single landing page client and a vision to build better.' },
    { year: '2022', title: 'First SaaS Launch', description: 'Launched our first full-stack SaaS product. The team grew to 4 people.' },
    { year: '2023', title: 'Scaled to 30+ Clients', description: 'Expanded our service offering and hit 30+ satisfied clients across 8 countries.' },
    { year: '2024', title: 'Premium Agency Status', description: 'Recognised as a top-rated web development agency with 100% satisfaction rate.' },
  ],
  team: [],
};

function JourneyTimeline({ journey }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Ghost track */}
      <div className="absolute left-[25px] top-6 bottom-6 w-[2px] bg-zinc-100" />
      {/* Scroll-drawn fill */}
      <motion.div
        className="absolute left-[25px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-violet-300 via-violet-600 to-violet-900 origin-top"
        style={{ scaleY: lineScaleY }}
      />

      <div className="space-y-0">
        {journey.map((item, i) => {
          const isLatest = i === journey.length - 1;
          return (
            <div key={i} className="flex gap-5 sm:gap-8 items-start pb-10 last:pb-0">
              {/* Badge — visible on all sizes */}
              <div className="shrink-0 relative z-10">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.08 + i * 0.07 }}
                >
                  <div className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center border-2 ${
                    isLatest
                      ? 'bg-violet-700 border-violet-700 shadow-lg shadow-violet-200'
                      : 'bg-white border-violet-200 shadow-sm'
                  }`}>
                    <span className={`text-xs font-black leading-none ${isLatest ? 'text-white' : 'text-violet-700'}`}>
                      {item.year}
                    </span>
                  </div>
                  {isLatest && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-violet-400"
                      animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                className="flex-1 pt-3 pb-2"
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h3 className="text-[17px] font-black text-zinc-900 mb-1.5">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const values = [
  { icon: Zap, title: 'Speed', description: 'We move fast without breaking things.' },
  { icon: CheckCircle, title: 'Quality', description: 'Every pixel and every line of code is intentional.' },
  { icon: Users, title: 'Partnership', description: 'We treat your business like our own.' },
];

export default function AboutPage() {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    fetch('/api/content?section=about')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.about) setAbout({ ...defaultAbout, ...json.data.about }); })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
                About Us
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-6"
            >
              We Build Digital
              <span className="block gradient-text">That Lasts</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="text-xl text-zinc-500 leading-relaxed max-w-2xl"
            >
              {about.story}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={fadeLeft} className="card p-8">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center mb-5">
                <Target className="w-5 h-5 text-violet-700" />
              </div>
              <h2 className="text-xl font-black text-zinc-900 mb-3">Our Mission</h2>
              <p className="text-zinc-500 leading-relaxed">{about.mission}</p>
            </motion.div>
            <motion.div variants={fadeRight} className="card p-8">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center mb-5">
                <Eye className="w-5 h-5 text-violet-700" />
              </div>
              <h2 className="text-xl font-black text-zinc-900 mb-3">Our Vision</h2>
              <p className="text-zinc-500 leading-relaxed">{about.vision}</p>
            </motion.div>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6"
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="card p-6 flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-violet-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-1">{v.title}</h3>
                    <p className="text-zinc-500 text-sm">{v.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About image */}
      {about.image && (
        <section className="py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm"
            >
              <Image src={about.image} alt="About Horizon Web Labs" fill className="object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Journey timeline */}
      {about.journey?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900">How We Got Here</h2>
            </motion.div>
            <JourneyTimeline journey={about.journey} />
          </div>
        </section>
      )}

      {/* Team */}
      {about.team?.length > 0 && (
        <section className="py-20 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-4">
                The Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900">The People Behind the Work</h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {about.team.map((member, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 overflow-hidden bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                    {member.avatar ? (
                      <Image src={member.avatar} alt={member.name} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-white text-2xl font-black">{member.name?.[0]}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-0.5">{member.name}</h3>
                  <p className="text-violet-700 text-sm font-medium mb-3">{member.position}</p>
                  {member.bio && <p className="text-zinc-500 text-sm leading-relaxed">{member.bio}</p>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">Let's Work Together</h2>
            <p className="text-zinc-500 mb-8">Ready to start your next project? Drop us a message and we'll get back within 24 hours.</p>
            <Button href="/contact" size="lg" iconRight={<ArrowRight className="w-4 h-4" />}>
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
