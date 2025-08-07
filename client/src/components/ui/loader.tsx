"use client";
import { motion } from "framer-motion";
import React from "react";

export const LoaderOne = () => {
  const transition = (x: number) => {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: x * 0.2,
      ease: "easeInOut" as const,
    };
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={transition(index)}
          className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300"
        />
      ))}
    </div>
  );
};

export const LoaderTwo = () => {
  const transition = (delay: number) => {
    return {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: delay,
      ease: "easeInOut" as const,
    };
  };

  return (
    <div className="flex items-center">
      {[0, 0.4, 0.8].map((delay, index) => (
        <motion.div
          key={index}
          initial={{ x: 0 }}
          animate={{ x: [0, 20, 0] }}
          transition={transition(delay)}
          className={`h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 ${
            index === 1 ? "-translate-x-2" : index === 2 ? "-translate-x-4" : ""
          }`}
        />
      ))}
    </div>
  );
};

export const LoaderThree = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-20 w-20 stroke-neutral-500 [--fill-final:theme(colors.yellow.300)] [--fill-initial:theme(colors.neutral.50)] dark:stroke-neutral-100 dark:[--fill-final:theme(colors.yellow.500)] dark:[--fill-initial:theme(colors.neutral.800)]"
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        initial={{ pathLength: 0, fill: "var(--fill-initial)" }}
        animate={{ pathLength: 1, fill: "var(--fill-final)" }}
        transition={{
          duration: 2,
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatType: "reverse" as const,
        }}
        d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
      />
    </motion.svg>
  );
};

export const LoaderFour = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="relative font-bold text-black [perspective:1000px] dark:text-white">
      <motion.span
        animate={{
          skewX: [0, -40, 0],
          scaleX: [1, 2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut" as const,
        }}
        className="relative z-20 inline-block"
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#00e571]/50 blur-[0.5px] dark:text-[#00e571]"
        animate={{
          x: [-2, 4, -3, 1.5, -2],
          y: [-2, 4, -3, 1.5, -2],
          opacity: [0.3, 0.9, 0.4, 0.8, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut" as const,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#8b00ff]/50 dark:text-[#8b00ff]"
        animate={{
          x: [0, 1, -1.5, 1.5, -1, 0],
          y: [0, -1, 1.5, -0.5, 0],
          opacity: [0.4, 0.8, 0.3, 0.9, 0.4],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut" as const,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export const LoaderFive = ({ text }: { text: string }) => {
  return (
    <div className="font-sans font-bold [--shadow-color:theme(colors.neutral.500)] dark:[--shadow-color:theme(colors.neutral.100)]">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              "0 0 0 var(--shadow-color)",
              "0 0 1px var(--shadow-color)",
              "0 0 0 var(--shadow-color)",
            ],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop" as const,
            delay: i * 0.1,
            ease: "easeInOut" as const,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};
