'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AdminModal({ open, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] bg-black/90 overflow-y-auto overscroll-contain"
          onClick={onClose}
        >
          <div className="flex min-h-full items-start justify-center p-4 pt-8 pb-8">
            <motion.div
              initial={{ scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 24, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className={`relative w-full ${maxWidth} bg-[#0c0e16] border border-white/[0.08] rounded-2xl shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/[0.06]">
                <h2 className="text-white font-semibold text-base">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="px-6 pb-6 pt-5">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
