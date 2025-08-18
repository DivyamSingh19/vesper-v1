"use client";
import Hero from "@/components/Landing/Hero";
import React from "react";
import FeaturesCard from "@/components/Landing/features";
import Analysis from "@/components/Landing/analysis";
import Flowchart from "@/components/Landing/flowchart";
import F from "@/components/Landing/footer";
import Header from "@/components/Landing/header";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "85%", transition: { duration: 0.8, delay: 0.2 } },
};

function page() {
  return (
    <>
      <Header />
      <Hero />
      <Analysis />
      <div className="flex flex-col gap-5 justify-center items-center text-[#d1cfc0] text-center mt-29">
        <motion.h3
          className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Legal Flowcharts
          <motion.span
            className="block h-[3px] bg-orange-500 mx-auto mt-5 rounded-full"
            variants={lineVariants}
          />
          <motion.p className="text-xl text-muted-foreground max-w-3xl mt-4">
            Get personalized legal guidance through AI-generated flowcharts that
            break down complex legal processes into clear, actionable steps
            tailored to your situation.
          </motion.p>
        </motion.h3>
      </div>
      <Flowchart />
      <FeaturesCard />
      <F />
    </>
  );
}

export default page;
