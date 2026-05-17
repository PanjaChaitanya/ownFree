'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Upload, FileText, CheckCircle2, XCircle, AlertCircle,
  Lock, ArrowRight, Loader2, RotateCcw, Sparkles,
  Search, Target, MessageSquare, Zap, MessageCircle,
} from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

const WA_NUMBER = '918985844558';

const ease = [0.22, 1, 0.36, 1];

function getGrade(score) {
  if (score >= 85) return { letter: 'A+', label: 'Excellent', color: '#15803d' };
  if (score >= 70) return { letter: 'A', label: 'Good', color: '#0369a1' };
  if (score >= 55) return { letter: 'B', label: 'Fair', color: '#b45309' };
  if (score >= 40) return { letter: 'C', label: 'Needs Work', color: '#be185d' };
  return { letter: 'D', label: 'Poor', color: '#b91c1c' };
}

function buildWaUrl(score, grade) {
  const msg = encodeURIComponent(
    `Hi! I just checked my resume on your ATS Resume Checker and scored ${score}/100 (Grade ${grade}). I'd like help optimizing it to pass ATS filters and land more interviews. Can you review it?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

function ScoreRing({ score }) {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const grade = getGrade(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="136" height="136" className="-rotate-90">
        <circle cx="68" cy="68" r={radius} fill="none" stroke="#e4e4e7" strokeWidth="10" />
        <motion.circle
          cx="68" cy="68" r={radius}
          fill="none"
          stroke={grade.color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-zinc-900">{score}</span>
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">/ 100</span>
      </div>
    </div>
  );
}

function SectionCheck({ label, found }) {
  return (
    <div className="flex items-center gap-3">
      {found
        ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
        : <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
      <span className={`text-sm font-medium ${found ? 'text-zinc-700' : 'text-zinc-500'}`}>
        {label}
      </span>
    </div>
  );
}

function LockedSection({ icon: Icon, title, teaser, waUrl, rows = 4 }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      {/* Visible header — always shown */}
      <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-zinc-800">{title}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{teaser}</p>
        </div>
        <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 font-semibold">
          Locked
        </span>
      </div>

      {/* Blurred content + CTA overlay */}
      <div className="relative px-5 py-5">
        <div className="blur-sm select-none pointer-events-none space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-lg bg-zinc-100 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-zinc-100 rounded" style={{ width: `${[85, 70, 90, 60, 75][i % 5]}%` }} />
                {i < 2 && <div className="h-2.5 bg-zinc-100 rounded w-1/2" />}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/75 backdrop-blur-[2px]">
          <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
            <Lock className="w-4 h-4 text-zinc-500" />
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-md"
            style={{ background: '#25D366' }}
          >
            <MessageCircle className="w-4 h-4" />
            Get Full Analysis on WhatsApp
          </a>
          <p className="text-xs text-zinc-400">Free — we reply within 24 hours</p>
        </div>
      </div>
    </div>
  );
}

export default function ResumeCheckerPage() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const fileRef = useRef(null);
  const resultRef = useRef(null);

  const ACCEPTED_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ];
  const ACCEPTED_EXT = ['.pdf', '.docx', '.doc', '.txt'];

  const handleFile = (f) => {
    if (!f) return;
    const ext = '.' + f.name.split('.').pop().toLowerCase();
    if (!ACCEPTED_TYPES.includes(f.type) && !ACCEPTED_EXT.includes(ext)) {
      setApiError('Please upload a PDF, DOCX, DOC, or TXT file.');
      return;
    }
    if (f.size > 5 * 1024 * 1024) { setApiError('File size must be under 5 MB.'); return; }
    setApiError('');
    setFile(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setApiError('Please select a file.'); return; }
    setLoading(true);
    setApiError('');

    const form = new FormData();
    form.append('resume', file);
    form.append('name', name);
    form.append('email', email);

    try {
      const res = await fetch('/api/resume', { method: 'POST', body: form });
      const json = await res.json();
      if (!json.success) { setApiError(json.error || 'Something went wrong.'); return; }
      setResult(json.data.result);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setApiError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setFile(null); setResult(null); setApiError(''); setName(''); setEmail(''); };

  const grade = result ? getGrade(result.score) : null;
  const waUrl = result ? buildWaUrl(result.score, grade.letter) : '#';

  // Compute teaser text for locked sections
  const keywordMissingCount = result?.keywordGaps?.length ?? 0;
  const bulletTotal = result?.bulletCount ?? 0;
  const bulletWeak = bulletTotal - (result?.bulletsWithMetrics ?? 0);
  const sectionsNeedingWork = result
    ? Object.values(result.sections).filter((v) => !v).length
    : 0;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
              Free Tool
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl font-black text-zinc-900 leading-tight tracking-tight mb-5"
          >
            ATS Resume
            <span className="gradient-text"> Checker</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="text-xl text-zinc-500 max-w-xl mx-auto"
          >
            Instantly score your resume against ATS criteria. Find out what's missing and how to fix it — free.
          </motion.p>
        </div>
      </section>

      {/* Upload / Results */}
      <section className="pb-24 bg-zinc-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease }}
              >
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8 space-y-6">
                  <div
                    className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all ${
                      dragging ? 'border-violet-400 bg-violet-50'
                      : file ? 'border-green-300 bg-green-50'
                      : 'border-zinc-200 bg-zinc-50 hover:border-violet-300 hover:bg-violet-50/40'
                    }`}
                    onDrop={onDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onClick={() => fileRef.current?.click()}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files[0])}
                    />
                    {file ? (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-sm font-semibold text-zinc-800">{file.name}</p>
                        <p className="text-xs text-zinc-400">{(file.size / 1024).toFixed(0)} KB — click to change</p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-violet-600" />
                        </div>
                        <p className="text-sm font-semibold text-zinc-700">
                          Drop your resume here or <span className="text-violet-700 underline underline-offset-2">browse</span>
                        </p>
                        <p className="text-xs text-zinc-400">PDF, DOCX, DOC, TXT · Max 5 MB</p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Name <span className="text-zinc-300">(optional)</span></label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Email <span className="text-zinc-300">(optional)</span></label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition"
                      />
                    </div>
                  </div>

                  {apiError && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {apiError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-violet-300"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing your resume…</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Check My Resume — Free</>
                    )}
                  </button>
                  <p className="text-center text-xs text-zinc-400">
                    Your resume is analyzed instantly and never stored as a file.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                ref={resultRef}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease }}
                className="space-y-4"
              >
                {/* Score card */}
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                    <ScoreRing score={result.score} />
                    <div className="text-center sm:text-left">
                      <div
                        className="inline-block px-4 py-1 rounded-full text-sm font-black mb-2"
                        style={{ backgroundColor: `${grade.color}18`, color: grade.color }}
                      >
                        Grade {grade.letter} — {grade.label}
                      </div>
                      <h2 className="text-2xl font-black text-zinc-900 mb-1">Your ATS Score</h2>
                      <p className="text-sm text-zinc-500 max-w-xs">
                        {result.score >= 70
                          ? 'Good score! A few tweaks can make it even stronger.'
                          : result.score >= 50
                          ? 'Your resume needs some improvements to pass ATS filters.'
                          : 'Your resume is missing key sections that ATS systems look for.'}
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-xs text-zinc-500">
                        <span>Completeness <strong className="text-zinc-800">{result.completeness}/45</strong></span>
                        <span>Quality <strong className="text-zinc-800">{result.quality}/35</strong></span>
                        <span>Format <strong className="text-zinc-800">{result.format}/20</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section checklist */}
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-zinc-800 mb-4">Section Checklist</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SectionCheck label="Contact Information" found={result.sections.contact} />
                    <SectionCheck label="Professional Summary" found={result.sections.summary} />
                    <SectionCheck label="Work / Internship Experience" found={result.sections.experience} />
                    <SectionCheck label="Education" found={result.sections.education} />
                    <SectionCheck label="Skills" found={result.sections.skills} />
                    <SectionCheck label="Projects" found={result.sections.projects} />
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap gap-4 text-xs text-zinc-500">
                    <span>Words: <strong className="text-zinc-700">{result.wordCount}</strong></span>
                    <span>Action verbs: <strong className="text-zinc-700">{result.verbCount}</strong></span>
                    <span>Bullet points: <strong className="text-zinc-700">{result.bulletCount}</strong></span>
                    <span>Bullets with metrics: <strong className={result.bulletsWithMetrics > 0 ? 'text-green-600' : 'text-red-500'}>{result.bulletsWithMetrics}</strong></span>
                  </div>
                </div>

                {/* Top issues */}
                {result.issues.length > 0 && (
                  <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-zinc-800 mb-4">
                      Top Issues Found ({Math.min(3, result.issues.length)} of {result.issues.length})
                    </h3>
                    <div className="space-y-3">
                      {result.issues.slice(0, 3).map((issue, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                            <AlertCircle className="w-3 h-3 text-amber-500" />
                          </div>
                          <p className="text-sm text-zinc-600">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Locked advanced sections ── */}
                <LockedSection
                  icon={Search}
                  title="Keyword Gap Analysis"
                  teaser={
                    keywordMissingCount > 0
                      ? `${keywordMissingCount} important keywords missing from your resume`
                      : 'Good keyword coverage — see the full breakdown'
                  }
                  waUrl={waUrl}
                  rows={4}
                />

                <LockedSection
                  icon={Target}
                  title="Bullet Point Quality"
                  teaser={
                    bulletTotal === 0
                      ? 'No bullet points detected — this is a problem'
                      : bulletWeak > 0
                      ? `${bulletWeak} of ${bulletTotal} bullet points lack measurable results`
                      : `All ${bulletTotal} bullets look good — see detailed feedback`
                  }
                  waUrl={waUrl}
                  rows={3}
                />

                <LockedSection
                  icon={MessageSquare}
                  title="Section-by-Section Feedback"
                  teaser={
                    sectionsNeedingWork > 0
                      ? `${sectionsNeedingWork} section${sectionsNeedingWork > 1 ? 's' : ''} need improvement — see exactly what to fix`
                      : 'All sections detected — get detailed improvement tips'
                  }
                  waUrl={waUrl}
                  rows={4}
                />

                <LockedSection
                  icon={Zap}
                  title="Rewrite Suggestions"
                  teaser="Get optimized rewrites for your weakest bullet points"
                  waUrl={waUrl}
                  rows={3}
                />

                {/* WhatsApp CTA */}
                <div className="bg-gradient-to-br from-violet-700 to-violet-900 rounded-2xl p-6 sm:p-8 text-center text-white">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-2">Get Your Resume ATS-Ready</h3>
                  <p className="text-violet-200 text-sm mb-6 max-w-sm mx-auto">
                    Our experts will review your full resume, close all keyword gaps, rewrite weak bullets, and help you land more interviews.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                      style={{ background: '#25D366', color: '#fff' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Message Us on WhatsApp
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Check Another Resume
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {!result && (
        <section className="py-16 bg-white border-t border-zinc-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-xl font-black text-zinc-900 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { step: '01', title: 'Upload Resume', desc: 'Drop your PDF, DOCX, or DOC — no sign-up required.' },
                { step: '02', title: 'Instant ATS Score', desc: 'Our engine checks 6 key areas and bullet quality in seconds.' },
                { step: '03', title: 'Fix & Win Jobs', desc: 'Use our free WhatsApp review to land more interviews.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 text-xs font-black mb-4">
                    {step}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">{title}</h3>
                  <p className="text-sm text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
