'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, ArrowRight, X } from 'lucide-react';

export default function StudentBar() {
  const [offer, setOffer] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('student-bar-dismissed')) {
      setDismissed(true);
      return;
    }
    fetch('/api/student')
      .then((r) => r.json())
      .then((json) => { if (json.success) setOffer(json.data.offer); })
      .catch(() => {});
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('student-bar-dismissed', '1');
    setDismissed(true);
  };

  const visible = offer?.isEnabled && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40, y: 10 }}
          transition={{ duration: 0.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[88px] right-6 z-40 flex items-center gap-3 bg-white rounded-2xl border border-violet-200 shadow-lg shadow-violet-100/60 px-4 py-3 max-w-[calc(100vw-3rem)] sm:max-w-xs"
        >
          {/* Icon */}
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>

          {/* Text + link */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-800 leading-tight truncate">
              {offer.barText}
            </p>
            <Link
              href="/student-special"
              className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 transition-colors mt-0.5"
            >
              {offer.barCta}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
