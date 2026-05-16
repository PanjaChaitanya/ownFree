'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Mail } from 'lucide-react';
import FuzzyText from '@/components/ui/FuzzyText';
import HorizonIcon from '@/components/ui/HorizonIcon';

const ease = [0.22, 1, 0.36, 1];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">

      {/* Soft violet glow blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* Minimal header */}
      <header className="relative z-10 px-6 py-6 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700 shadow-sm">
            <HorizonIcon size={16} />
          </div>
          <div
            className="flex flex-col leading-none gap-[2px]"
            style={{ fontFamily: 'var(--font-logo), sans-serif' }}
          >
            <span
              className="text-[18px] font-bold text-zinc-900"
              style={{ letterSpacing: '-0.04em' }}
            >
              Horizon
            </span>
            <span
              className="text-[9px] font-semibold text-zinc-400 uppercase"
              style={{ letterSpacing: '0.22em' }}
            >
              Web Labs
            </span>
          </div>
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-6">

        {/* FuzzyText 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center justify-center"
        >
          <FuzzyText
            fontSize="clamp(6rem, 20vw, 16rem)"
            fontWeight={900}
            gradient={['#5b21b6', '#7c3aed', '#a78bfa']}
            baseIntensity={0.22}
            hoverIntensity={0.88}
            enableHover
            glitchMode
            glitchInterval={4000}
            glitchDuration={160}
            transitionDuration={10}
            clickEffect
          >
            404
          </FuzzyText>
        </motion.div>

        {/* Copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease }}
          className="max-w-sm mt-10 sm:mt-14"
        >
          <h1 className="text-2xl sm:text-[1.875rem] font-black text-zinc-900 tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-zinc-500 text-[15px] sm:text-base leading-relaxed mb-10">
            This page doesn't exist or was moved. Let's get you back to somewhere real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-[0_8px_24px_rgba(109,40,217,0.3)] hover:shadow-[0_12px_32px_rgba(109,40,217,0.42)] hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-full hover:bg-zinc-50 hover:border-zinc-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Horizon Web Labs · Hyderabad, India
        </p>
      </footer>

    </div>
  );
}
