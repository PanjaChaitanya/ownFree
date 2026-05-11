'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function scramble(target, duration = 900, onUpdate, onDone) {
  const len = target.length;
  const start = performance.now();

  const frame = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const revealedCount = Math.floor(progress * len);

    let result = '';
    for (let i = 0; i < len; i++) {
      if (target[i] === ' ') { result += ' '; continue; }
      if (i < revealedCount) {
        result += target[i];
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    onUpdate(result);
    if (progress < 1) requestAnimationFrame(frame);
    else onDone();
  };

  requestAnimationFrame(frame);
}

export default function ScrambleText({ text, className = '', duration = 900, triggerOnView = true }) {
  const [display, setDisplay] = useState(triggerOnView ? text : '');
  const [done, setDone] = useState(!triggerOnView);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const triggered = useRef(false);

  useEffect(() => {
    if (!triggerOnView || (inView && !triggered.current)) {
      triggered.current = true;
      scramble(text, duration, setDisplay, () => setDone(true));
    }
  }, [inView, text, duration, triggerOnView]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
