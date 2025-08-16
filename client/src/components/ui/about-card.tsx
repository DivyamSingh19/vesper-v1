"use client";
import React from "react";
import ViewRepo from "../buttons/view-repo";
import { motion } from "framer-motion";

interface Props {
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

// 🔹 Reusable Section component (full width + left-aligned text)
const Section = ({
  title,
  highlight,
  children,
}: {
  title: string;
  highlight: string;
  children: React.ReactNode;
}) => (
  <motion.div className="w-full py-10">
    {" "}
    {/* reduced from py-16 */}
    <div className="w-full px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col gap-4">
      {" "}
      {/* reduced from gap-6 */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {title}{" "}
        <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          {highlight}
        </span>
        <motion.span
          className="block h-[3px] bg-orange-500 mt-3 rounded-full" // mt reduced from 5
          variants={lineVariants}
        />
      </motion.h2>
      <motion.p
        className="leading-relaxed text-base sm:text-lg lg:text-xl"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {children}
      </motion.p>
    </div>
  </motion.div>
);

const AboutCard = ({ className }: Props) => {
  return (
    <div className={`flex flex-col gap-10 min-h-screen ${className || ""}`}>
      {/* gap reduced from 20 to 10 */}

      {/* Problem */}
      <Section title="The" highlight="Problem">
        Legal documents are notoriously difficult to understand, filled with
        complex terminology and intricate clauses that can overwhelm non-legal
        professionals. This creates a significant barrier for individuals and
        small businesses who need to comprehend important legal information but
        lack specialized legal knowledge.
      </Section>

      {/* Solution */}
      <Section title="Our" highlight="Solution">
        Vesper bridges this gap by leveraging artificial intelligence to break
        down legal documents into digestible, understandable content. We
        transform dense legal text into clear summaries and create visual
        flowcharts that outline actionable steps, making legal information
        accessible to everyone.
      </Section>

      {/* Mission */}
      <Section title="Our" highlight="Mission">
        To make legal information accessible and understandable for everyone,
        regardless of their background or education.
      </Section>

      {/* Repo Button */}
      <motion.div
        className=" px-6 sm:px-12 md:px-20 lg:px-40"
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
