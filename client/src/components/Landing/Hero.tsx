import React from "react";
import { Briefcase, Shield, Scale, Users } from "lucide-react";
import ButtonPrime from "../buttons/buttonPrime";
import ButtonSec from "../buttons/buttonSec";
import { motion } from "framer-motion";

// Variants for entrance animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const lineAnimation = {
  initial: { width: 0, x: "50%" },
  animate: {
    width: ["0%", "80%", "0%"],
    x: ["50%", "10%", "90%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-[#1f1f1f] text-center px-6 overflow-hidden">
      {/* Subtle, glowing half-circle at the bottom right, now more noticeable */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-[#f76f53] rounded-t-full blur-[100px] opacity-20"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2], // Increased opacity values
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-serif leading-tight text-[#d1cfc0]"
          variants={itemVariants}
        >
          Your <span className="italic text-[#f76f53]">Legal Ally</span> in
          digital Age
        </motion.h1>

        <motion.p
          className="mt-6 text-base md:text-lg text-gray-400 max-w-xl"
          variants={itemVariants}
        >
          Simplify complex legal documents with AI-powered summaries, and book
          verified lawyers in minutes — all on a secure Web2 and
          blockchain-enabled platform. Whether you’re an individual or a
          business, navigate legal challenges with confidence and clarity.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4 flex-wrap justify-center"
          variants={itemVariants}
        >
          <ButtonPrime children="Get Started" />
          <ButtonSec children="Learn more" />
        </motion.div>

        <motion.div
          className="mt-10 text-sm text-gray-500 flex flex-col items-center gap-3"
          variants={itemVariants}
        >
          <span className="text-gray-300 font-medium">
            Trusted by 500+ lawyers and professionals worldwide
          </span>
          <div className="relative flex flex-col items-center gap-1 w-full">
            <motion.div
              className="flex gap-6 text-gray-500"
              variants={containerVariants}
            >
              <motion.div variants={iconVariants}>
                <Briefcase size={28} strokeWidth={1.5} />
              </motion.div>
              <motion.div variants={iconVariants}>
                <Shield size={28} strokeWidth={1.5} />
              </motion.div>
              <motion.div variants={iconVariants}>
                <Scale size={28} strokeWidth={1.5} />
              </motion.div>
              <motion.div variants={iconVariants}>
                <Users size={28} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute left-0 right-0 bottom-[-5px] h-[1px] bg-[#f76f53]"
              initial="initial"
              animate="animate"
              variants={lineAnimation}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}