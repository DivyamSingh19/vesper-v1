"use client";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

export const useHeroAnimations = () => {
  const prefersReducedMotion = useReducedMotion();

  const animations = useMemo(() => {
    const baseVariants = {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      },
      item: {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
      },
      icon: {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
      },
      line: {
        initial: { width: 0, x: "50%" },
        animate: {
          width: ["0%", "80%", "0%"],
          x: ["50%", "10%", "90%"],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
            repeatType: "reverse" as const,
          },
        },
      },
    };

    if (prefersReducedMotion) {
      return {
        container: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        icon: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        line: { initial: { width: "50%" }, animate: { width: "50%" } },
      };
    }

    return baseVariants;
  }, [prefersReducedMotion]);

  return {
    animations,
    prefersReducedMotion,
  };
};
