// Animation utilities and constants for consistent motion design
// Based on the animation guidelines in .claude/animation-guidelines.md

import { Variants, Transition } from "motion/react";

// Easing functions
export const easings = {
  // ease-out (best for elements entering the screen)
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] as const,
  easeOutCubic: [0.215, 0.61, 0.355, 1] as const,
  easeOutQuart: [0.165, 0.84, 0.44, 1] as const,
  easeOutQuint: [0.23, 1, 0.32, 1] as const,
  easeOutExpo: [0.19, 1, 0.22, 1] as const,
  easeOutCirc: [0.075, 0.82, 0.165, 1] as const,

  // ease-in-out (smooth acceleration and deceleration)
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955] as const,
  easeInOutCubic: [0.645, 0.045, 0.355, 1] as const,
  easeInOutQuart: [0.77, 0, 0.175, 1] as const,
  easeInOutQuint: [0.86, 0, 0.07, 1] as const,
  easeInOutExpo: [1, 0, 0, 1] as const,
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86] as const,
};

// Default transition durations (in seconds)
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

// Spring configurations
export const springs = {
  // Default spring (recommended for most use cases)
  default: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  // Gentle spring (for subtle animations)
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
  },
  // Bouncy spring (only for drag/interactive elements)
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 15,
  },
  // Snappy spring (for quick interactions)
  snappy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
  },
};

// Common animation variants

// Fade in
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Slide in from bottom
export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Slide in from top
export const slideInFromTop: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

// Slide in from left
export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// Slide in from right
export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

// Scale in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Scale in (larger initial scale)
export const scaleInLarge: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Default transitions for common use cases
export const transitions = {
  fadeIn: {
    duration: durations.normal,
    ease: easings.easeOutCubic,
  } as Transition,

  slideIn: {
    duration: durations.normal,
    ease: easings.easeOutCubic,
  } as Transition,

  scaleIn: {
    duration: durations.fast,
    ease: easings.easeOutCubic,
  } as Transition,

  page: {
    duration: durations.normal,
    ease: easings.easeOutQuart,
  } as Transition,

  dropdown: {
    duration: durations.fast,
    ease: easings.easeOutCubic,
  } as Transition,
};

// Stagger configurations
export const staggerConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },

  containerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  },

  containerSlow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
};

// Page transition wrapper variants
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.page,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.fast,
    },
  },
};

// Card entrance animation
export const cardEntrance: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Dropdown menu animation
export const dropdownMenu: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
};

// Modal/Dialog animation
export const modalAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

// Sidebar animation
export const sidebarAnimation = {
  expanded: { width: 256 }, // w-64 = 16rem = 256px
  collapsed: { width: 80 },  // w-20 = 5rem = 80px
};

// Floating element (chatbot, notifications)
export const floatingElement: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

// Hover animation helpers
export const hoverScale = {
  scale: 1.02,
  transition: {
    duration: durations.fast,
    ease: easings.easeOutCubic,
  },
};

export const hoverLift = {
  y: -2,
  transition: {
    duration: durations.fast,
    ease: easings.easeOutCubic,
  },
};

// Utility function to check if user prefers reduced motion
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation variants based on reduced motion preference
export const getVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return variants;
};

// Get transition based on reduced motion preference
export const getTransition = (transition: Transition): Transition => {
  if (shouldReduceMotion()) {
    return { duration: 0.01 };
  }
  return transition;
};
