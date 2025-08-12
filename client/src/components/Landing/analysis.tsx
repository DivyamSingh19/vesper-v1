import React from "react";
import { FileText, Upload, Brain } from "lucide-react";
import { motion } from "framer-motion";

const Analysis = () => {
  const analysisSteps = [
    {
      step: "01",
      title: "Upload Document",
      description:
        "Upload any legal document - contracts, agreements, court papers, or legal notices",
      icon: Upload,
    },
    {
      step: "02",
      title: "AI Analysis",
      description:
        "Our AI analyzes the document, identifying key clauses, rights, and obligations",
      icon: Brain,
    },
    {
      step: "03",
      title: "Clear Summary",
      description:
        "Receive a clear, jargon-free summary with actionable insights and recommendations",
      icon: FileText,
    },
  ];

  // Animation variants for the whole section to fade in and stagger children
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Slightly faster
        when: "beforeChildren",
        staggerChildren: 0.2, // Reduced stagger delay
      },
    },
  };

  // Animation for the individual step cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Slightly faster
  };

  // Animation for the heading and its underline
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Slightly faster
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "85%", transition: { duration: 0.6, delay: 0.2 } }, // Faster duration and reduced delay
  };

  return (
    <motion.section
      className="w-[95%] mx-auto"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Heading with orange underline */}
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative"
          variants={headingVariants}
        >
          How It Works
          <motion.span
            className="block h-[3px] bg-orange-500 mx-auto mt-2 rounded-full"
            variants={lineVariants}
          ></motion.span>
        </motion.h3>
      </div>

      {/* Steps Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {analysisSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center rounded-2xl border-1 border-white p-8 shadow-lg transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "rgba(64, 64, 64, 0.9)",
              color: "#d1cfc0",
            }}
            variants={cardVariants}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#1f1f1f] shadow-md mb-6">
              <step.icon className="h-8 w-8" />
            </div>
            <div className="text-sm font-semibold tracking-wide text-[#97b8ee] mb-1">
              STEP {step.step}
            </div>
            <h4 className="text-xl font-semibold leading-snug mb-4">
              {step.title}
            </h4>
            <p className="text-[.9rem] leading-relaxed text-white max-w-xs">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Analysis;
