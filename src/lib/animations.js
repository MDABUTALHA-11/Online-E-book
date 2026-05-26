/**
 * Shaifly Premium Animation System
 * Global Framer Motion variants & easing presets
 * Easing: cubic-bezier(0.4, 0, 0.2, 1) — smooth & premium
 */

export const EASING = [0.4, 0, 0.2, 1];
export const EASE_OUT = [0, 0, 0.2, 1];
export const EASE_SPRING = { type: 'spring', stiffness: 320, damping: 28 };

/* ── Fade Up (scroll-triggered sections) ── */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASING },
  },
};

/* ── Fade Up with delay index (staggered children) ── */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
};

/* ── Hero Entrance ── */
export const heroFade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING, delay },
  }),
};

/* ── Card Hover (scale + lift + glow) ── */
export const cardHover = {
  rest:  { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -8,
    transition: { duration: 0.4, ease: EASING },
  },
};

/* ── Button: scale + gradient shift on hover ── */
export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: EASING } },
  tap:   { scale: 0.96 },
};

/* ── Navbar Slide Down ── */
export const navbarSlide = {
  hidden:  { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/* ── Note Card Staggered Entrance ── */
export const noteCardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const noteCardItem = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASING },
  },
};

/* ── Section Fade + Slide (scroll trigger) ── */
export const sectionReveal = {
  hidden:  { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING },
  },
};

/* ── Sidebar Filter Expand ── */
export const filterReveal = {
  hidden:  { scaleX: 0, opacity: 0, originX: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

/* ── Checkmark Pop ── */
export const checkPop = {
  hidden:  { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 500, damping: 22 },
  },
  exit: { scale: 0, transition: { duration: 0.15 } },
};

/* ── Dark Mode Theme Morph ── */
export const themeTransition = {
  transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
};

/* ── Floating micro-bubble ── */
export const floatY = {
  initial: { y: 0 },
  animate: {
    y: [-8, 0, -8],
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
  },
};

/* ── Parallax helper (hero bg) ── */
export const parallaxVariant = (scrollYProgress, factor = 0.3) => ({
  y: scrollYProgress * factor,
});

/* ── Download Button Pulse ── */
export const downloadPulse = {
  rest:  { scale: 1, boxShadow: '0 4px 16px rgba(20,184,166,0.3)' },
  hover: {
    scale: 1.07,
    boxShadow: '0 8px 32px rgba(20,184,166,0.55)',
    transition: { duration: 0.4, ease: EASING },
  },
  tap: { scale: 0.95 },
};

/* ── Quick Preview Reveal ── */
export const quickPreview = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};
