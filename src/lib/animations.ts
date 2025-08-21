// animations.ts - Luxury animation presets (3 essential animations only)
import type { MotionProps } from 'framer-motion';

// Luxury easing - smooth and sophisticated
const luxuryEase = [0.16, 1, 0.3, 1] as const;

// Only 3 essential luxury animations
export const animations = {
  // 1. Elegant fade up - for most content
  fadeUp: {
    initial: { opacity: 0, y: 4 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  } as MotionProps,
  
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" }
  } as MotionProps,

  // 3. Subtle scale - for cards and interactive elements
  scaleUp: {
    initial: { opacity: 0, scale: 0.98 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1.3, ease: luxuryEase }
  } as MotionProps
};

// Simple stagger for multiple elements
export const stagger = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  },
  item: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: luxuryEase }
  }
};

export default animations;