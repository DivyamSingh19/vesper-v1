import React from "react";
import { Briefcase, Shield, Scale, Users } from "lucide-react";
import { motion } from "framer-motion";
import ButtonPrime from "../buttons/buttonPrime";
import AboutVesper from "../buttons/about-vesper";
import { useRouter } from "next/navigation";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-[#1f1f1f] text-center px-6 overflow-hidden">
      {/* Softer Glow Above Heading */}
      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[450px] h-[220px] 
                   bg-gradient-to-r from-[#fbbf77] via-[#fcd7a3] to-[#fbbf77] 
                   rounded-full blur-[140px] opacity-15"
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <motion.h1
          className="text-[2rem] md:text-[4rem] lg:text-[5rem] font-playfair leading-tight text-[#d1cfc0]"
          variants={itemVariants}
        >
          Your <span className="italic text-[#f76f53]">Legal Ally</span> in the
          Digital Age
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-base md:text-lg text-gray-400 max-w-xl"
          variants={itemVariants}
        >
          Simplify complex legal documents with AI-powered summaries, and book
          verified lawyers in minutes — all on a secure Web2 and
          blockchain-enabled platform. Whether you’re an individual or a
          business, navigate legal challenges with confidence and clarity.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex gap-4 flex-wrap justify-center"
          variants={itemVariants}
        >
          <ButtonPrime
            onClick={() => {
              router.push("/vesper-ai");
            }}
          >
            Get Started
          </ButtonPrime>
          <AboutVesper />
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          className="mt-10 text-sm text-gray-500 flex flex-col items-center gap-3"
          variants={itemVariants}
        >
          <span className="text-gray-300 font-medium">
            Trusted by 500+ lawyers and professionals worldwide
          </span>

          <div className="relative flex flex-col items-center gap-1 w-full">
            {/* Icons */}
            <motion.div
              className="flex gap-6 text-gray-500"
              variants={containerVariants}
            >
              {[Briefcase, Shield, Scale, Users].map((Icon, i) => (
                <motion.div key={i} variants={iconVariants}>
                  <Icon size={28} strokeWidth={1.5} />
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Underline */}
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
