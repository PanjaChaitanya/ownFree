'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900">How We Got Here</h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-0 relative"
            >
              <div className="absolute left-[39px] top-8 bottom-8 w-px bg-zinc-200 hidden sm:block" />
              {about.journey.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-5 sm:gap-8 items-start pb-8 last:pb-0">
                  <div className="relative z-10 shrink-0">
                    <div className="w-[52px] h-[52px] sm:w-[52px] sm:h-[52px] rounded-xl bg-white border-2 border-violet-200 flex items-center justify-center shadow-sm">
                      <span className="text-violet-700 text-xs font-black">{item.year}</span>
                    </div>
                  </div>
                  <div className="pt-2.5">
                    <h3 className="text-[17px] font-bold text-zinc-900 mb-1.5">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
