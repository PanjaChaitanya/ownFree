'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const variants = {
  primary: 'bg-violet-700 hover:bg-violet-800 text-white shadow-sm hover:shadow-[0_8px_24px_rgba(109,40,217,0.35)]',
  secondary: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm',
  outline: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 bg-white',
  ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  glass: 'glass text-white hover:bg-white/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
  xl: 'px-9 py-4 text-base',
};

function Ripple({ x, y, size }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white/25 pointer-events-none"
      style={{ left: x - size / 2, top: y - size / 2, width: size, height: size }}
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    />
  );
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  disabled,
  loading,
  className = '',
  icon,
  iconRight,
  onClick,
  type = 'button',
}) {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const addRipple = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.2;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  const base = `relative overflow-hidden inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer select-none ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const content = (
    <>
      {ripples.map((rp) => <Ripple key={rp.id} x={rp.x} y={rp.y} size={rp.size} />)}
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {iconRight && !loading && <span className="relative z-10 shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} className="inline-flex">
        <Link
          href={href}
          ref={containerRef}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={base}
          onMouseDown={addRipple}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={containerRef}
      whileHover={{ scale: disabled || loading ? 1 : 1.03, y: disabled || loading ? 0 : -1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={base}
      onMouseDown={addRipple}
    >
      {content}
    </motion.button>
  );
}
