// Easing curves
const cinematic = [0.25, 0.46, 0.45, 0.94];
const spring = { type: 'spring', stiffness: 300, damping: 26 };

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: cinematic } },
};

export const fadeUpSm = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cinematic } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: cinematic } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: cinematic } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: cinematic } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: cinematic } },
};

export const scaleInSpring = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease: cinematic } },
};

export const slideUp = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: cinematic } },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: cinematic } },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.65, ease: cinematic } },
};

export const flipIn = {
  hidden: { opacity: 0, rotateX: 30, y: 40 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.7, ease: cinematic } },
};

// Stagger containers
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

export const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

export const staggerTight = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

// Hover interactions
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.018, y: -5, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const liftHover = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  hover: { y: -6, boxShadow: '0 20px 40px rgba(109,40,217,0.12)', transition: { duration: 0.3 } },
};

// Page transitions
export const pageTransition = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

// Pulse glow (for dark elements)
export const glowPulse = {
  initial: { boxShadow: '0 0 0px rgba(124, 58, 237, 0)' },
  animate: {
    boxShadow: [
      '0 0 0px rgba(124, 58, 237, 0)',
      '0 0 40px rgba(124, 58, 237, 0.4)',
      '0 0 0px rgba(124, 58, 237, 0)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Floating (infinite up-down)
export const floatY = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Counter (used with useInView + state)
export const countUp = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } };
