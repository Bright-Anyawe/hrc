'use client';

import { motion, useReducedMotion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Framer Motion transforms run via JS/rAF, not CSS — the global
// `prefers-reduced-motion` rule in globals.css only catches CSS
// animations/transitions, so this needs its own check via Framer's hook.
const reducedAnimations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedAnimations : animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: prefersReducedMotion ? 0.15 : 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
