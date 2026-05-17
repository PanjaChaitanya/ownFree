'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FileText, Globe, Package, Zap, Star, BookOpen,
  CheckCircle2, ArrowRight, Sparkles, GraduationCap,
} from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa6';
import CTASection from '@/components/sections/CTASection';

const ease = [0.22, 1, 0.36, 1];

const ICON_MAP = {
  FileText, Globe, Package, Zap, Star, BookOpen,
  Linkedin: FaLinkedinIn,
  GraduationCap,
};

const DEFAULT_OFFER = {
  heroTitle: 'Launch Your Career the Right Way',
  heroSubtitle: 'Special packages designed for students and freshers — from resume to portfolio to LinkedIn, we set you up for success.',
  services: [
    {
      _id: '1', icon: 'FileText', title: 'Resume Optimization',
      description: 'ATS-friendly format, action verb rewrites, keyword gap analysis, and measurable bullet points that get you shortlisted.',
      highlight: false,
    },
    {
      _id: '2', icon: 'Linkedin', title: 'LinkedIn Profile Building',
      description: 'Professional headline, keyword-rich summary, skills optimization, and profile setup that recruiters actually notice.',
      highlight: false,
    },
    {
      _id: '3', icon: 'Globe', title: 'Portfolio Website',
      description: 'Custom Next.js portfolio, hosted and deployed, SEO-optimized — your personal brand on the internet.',
      highlight: false,
    },
    {
      _id: '4', icon: 'Package', title: 'Career Starter Bundle',
      description: 'All three services together at a special student price. The complete launchpad for your first job or internship.',
      highlight: true,
    },
  ],
  resumeCtaText: "Not sure where to start? Check your ATS score first — it's free.",
  resumeCtaButton: 'Check My Resume Score →',
};

const BENEFITS = [
  'Student-friendly pricing',
  'Delivered within 48–72 hours',
  'Unlimited revisions',
  'WhatsApp support',
  'Placement-focused writing',
  'Real recruiter feedback',
];

const WA_NUMBER = '918985844558';

function buildWaUrl(serviceTitle) {
  const msg = encodeURIComponent(
    `Hi! I'm interested in your *${serviceTitle}* service for students. Can you share more details?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

function ServiceCard({ service, index }) {
  const Icon = ICON_MAP[service.icon] || FileText;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all ${
        service.highlight
          ? 'bg-violet-700 border-violet-600 text-white shadow-xl shadow-violet-200'
          : 'bg-white border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1'
      }`}
    >
      {service.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-black uppercase tracking-wide shadow-sm">
            <Star className="w-3 h-3" /> Best Value
          </span>
        </div>
      )}

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
        service.highlight ? 'bg-white/15' : 'bg-violet-50 border border-violet-100'
      }`}>
        <Icon className={`w-5 h-5 ${service.highlight ? 'text-white' : 'text-violet-600'}`} />
      </div>

      <div>
        <h3 className={`text-lg font-black mb-2 ${service.highlight ? 'text-white' : 'text-zinc-900'}`}>
          {service.title}
        </h3>
        <p className={`text-sm leading-relaxed ${service.highlight ? 'text-violet-200' : 'text-zinc-500'}`}>
          {service.description}
        </p>
      </div>

      <a
        href={buildWaUrl(service.title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${
          service.highlight
            ? 'text-white hover:text-violet-200'
            : 'text-violet-700 hover:text-violet-900'
        }`}
      >
        Get Started <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

export default function StudentSpecialPage() {
  const [offer, setOffer] = useState(DEFAULT_OFFER);

  useEffect(() => {
    fetch('/api/student')
      .then((r) => r.json())
      .then((json) => { if (json.success && json.data.offer) setOffer(json.data.offer); })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              <GraduationCap className="w-3.5 h-3.5" />
              Student & Fresher Offers
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight tracking-tight mb-5"
          >
            {offer.heroTitle.split(' ').slice(0, -2).join(' ')}
            <span className="gradient-text"> {offer.heroTitle.split(' ').slice(-2).join(' ')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-xl text-zinc-500 max-w-2xl mx-auto mb-8"
          >
            {offer.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm transition-all shadow-md shadow-violet-300"
            >
              <Sparkles className="w-4 h-4" /> Get a Free Consultation
            </Link>
            <Link
              href="/resume-checker"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-all"
            >
              Check Resume Score Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-5 bg-violet-700 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-2 text-violet-100 text-sm font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-300 shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3"
            >
              What We Offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight"
            >
              Everything you need to land your
              <span className="gradient-text"> first job</span>
            </motion.h2>
          </div>

          <div className={`grid gap-6 ${
            offer.services.length === 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : offer.services.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2'
          }`}>
            {offer.services.map((service, i) => (
              <ServiceCard key={service._id || i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-black text-zinc-900 tracking-tight mb-12"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: '01', t: 'Share your details', d: 'Fill out a quick form or WhatsApp us with your current resume or LinkedIn.' },
              { n: '02', t: 'We review & build', d: 'Our team optimizes or creates your resume, LinkedIn, or portfolio within 48–72 hours.' },
              { n: '03', t: 'Apply with confidence', d: 'Get your final files, request unlimited revisions, and start applying.' },
            ].map(({ n, t, d }) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: parseInt(n) * 0.1 - 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 text-sm font-black mb-4">
                  {n}
                </div>
                <h3 className="text-sm font-bold text-zinc-900 mb-2">{t}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume checker CTA */}
      <section className="py-14 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center mx-auto mb-5">
              <FileText className="w-6 h-6 text-violet-600" />
            </div>
            <p className="text-zinc-600 text-lg font-medium mb-5">{offer.resumeCtaText}</p>
            <Link
              href="/resume-checker"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm transition-all shadow-md shadow-violet-200"
            >
              <Sparkles className="w-4 h-4" />
              {offer.resumeCtaButton}
            </Link>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
