'use client';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, glow = false, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`glass rounded-2xl p-6 ${glow ? 'hover:glow-purple' : ''} ${onClick ? 'cursor-pointer' : ''} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
