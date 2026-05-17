'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

const HIGHLIGHTS = [
  'ATS score in seconds',
  'Keyword gap analysis',
  'Bullet point quality check',
  'Free — no sign-up needed',
];

export default function StudentCTASection() {
  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-5">
              <GraduationCap className="w-3.5 h-3.5" />
              For Students &amp; Freshers
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight tracking-tight mb-4">
              Are you a student?{' '}
              <span className="gradient-text">Check your resume score</span>{' '}
              for free.
            </h2>

            <p className="text-zinc-500 text-base leading-relaxed mb-7">
              Upload your resume and get an instant ATS score, section analysis, and actionable tips — completely free, no account required. If you want us to fix it, we offer student-special packages too.
            </p>

            <ul className="space-y-2.5 mb-8">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/resume-checker"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm transition-all shadow-md shadow-violet-200"
              >
                <FileText className="w-4 h-4" />
                Check My Resume — Free
              </Link>
              <Link
                href="/student-special"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition-all"
              >
                View Student Packages
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right — mock score card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-100 p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">Resume Score</p>
                  <p className="text-xs text-zinc-400">Instant ATS analysis</p>
                </div>
              </div>

              {/* Ring mockup */}
              <div className="flex flex-col items-center py-4">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f4f4f5" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#7c3aed" strokeWidth="3"
                      strokeDasharray="72 28"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-zinc-900">72</span>
                    <span className="text-xs text-zinc-400 font-medium">/100</span>
                  </div>
                </div>
                <p className="text-xs text-amber-600 font-semibold mt-2 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Needs Improvement
                </p>
              </div>

              {/* Section bars */}
              <div className="space-y-3">
                {[
                  { label: 'Completeness', val: 36, max: 45, color: 'bg-violet-500' },
                  { label: 'Quality', val: 22, max: 35, color: 'bg-cyan-500' },
                  { label: 'Format', val: 14, max: 20, color: 'bg-emerald-500' },
                ].map(({ label, val, max, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-600 font-medium">{label}</span>
                      <span className="text-zinc-400">{val}/{max}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${color}`}
                        style={{ width: `${(val / max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-zinc-400 pt-1">
                Upload yours to see your real score →
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
