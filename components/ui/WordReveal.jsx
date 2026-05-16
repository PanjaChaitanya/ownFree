'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function WordReveal({ text, delay = 0, className = '', wordClassName = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.26em] ${wordClassName}`}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
