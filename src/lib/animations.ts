// animations.ts - Global animation presets
import type { MotionProps } from 'framer-motion';

// Define the cubic bezier easing
const customEase = [0.25, 0.46, 0.45, 0.94] as const;

// Base animation configurations
export const animations = {
  // 1. Fade in from bottom (most common)
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: customEase }
  } as MotionProps,

  // 2. Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: customEase }
  } as MotionProps,

  // 3. Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: customEase }
  } as MotionProps,

  // 4. Scale in with fade (for images and cards)
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: customEase }
  } as MotionProps
};

// Stagger container for animating multiple children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Child animation for stagger effects
export const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: customEase }
};

export default animations;