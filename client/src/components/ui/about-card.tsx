"use client";
import React from "react";
import ViewRepo from "../buttons/view-repo";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
interface props {
  className?: string;
}

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "15%", transition: { duration: 0.8, delay: 0.2 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
};

const AboutCard = ({ className }: props) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col gap-10 min-h-screen  p-4 sm:p-6 md:p-10${
        className || ""
      }`}
    >
      <motion.div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <motion.h2
            className="text-4xl"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            The{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Problem
            </span>
            <motion.span
              className="block h-[3px] bg-orange-500 mt-5 rounded-full"
              variants={lineVariants}
            />
          </motion.h2>
          <motion.p
            className="leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Legal documents are notoriously difficult to understand, filled with
            complex terminology and intricate clauses that can overwhelm
            non-legal professionals. This creates a significant barrier for
            individuals and small businesses who need to comprehend important
            legal information but lack specialized legal knowledge.
          </motion.p>
        </div>
        <div className="flex flex-col gap-3">
          <motion.h2
            className="text-4xl"
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Solution
            </span>
            <motion.span
              className="block h-[3px] bg-orange-500 mt-5 rounded-full"
              variants={lineVariants}
            />
          </motion.h2>
          <motion.p
            className="leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Vesper bridges this gap by leveraging artificial intelligence to
            break down legal documents into digestible, understandable content.
            We transform dense legal text into clear summaries and create visual
            flowcharts that outline actionable steps, making legal information
            accessible to everyone.
          </motion.p>
        </div>
      </motion.div>

      <motion.div className="flex flex-col gap-5">
        <motion.h2
          className="text-4xl"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Our{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Mission
          </span>
          <motion.span
            className="block h-[3px] bg-orange-500  mt-5 rounded-full"
            variants={lineVariants}
          />
        </motion.h2>
        <motion.p
          className="leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          To make legal information accessible and understandable for everyone,
          regardless of their background or education
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-5"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <ViewRepo
          onClick={() =>
            window.open("https://github.com/DivyamSingh19/vesper-v1", "_blank")
          }
        />
      </motion.div>
    </div>
  );
};

export { AboutCard };
