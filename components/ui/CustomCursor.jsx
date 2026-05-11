'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const dotX = useSpring(cursorX, { damping: 50, stiffness: 800, mass: 0.1 });
  const dotY = useSpring(cursorY, { damping: 50, stiffness: 800, mass: 0.1 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, select, label').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    addHover();

    // Re-scan for new elements (e.g. after hydration)
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot — exact position */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: clicked ? 0.4 : hovered ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-600"
      />

      {/* Ring — spring follow */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: clicked ? 0.7 : hovered ? 2.2 : 1,
          opacity: hidden ? 0 : hovered ? 0.5 : 0.35,
          borderColor: hovered ? '#7c3aed' : '#6d28d9',
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-2 border-violet-700"
      />
    </>
  );
}
