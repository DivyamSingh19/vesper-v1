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
      points: [
        "Multiple file formats supported",
        "Secure cloud storage",
        "Instant processing",
      ],
    },
    {
      step: "02",
      title: "AI Analysis",
      description:
        "Our AI analyzes the document, identifying key clauses, rights, and obligations",
      icon: Brain,
      points: [
        "Advanced NLP processing",
        "Legal expertise trained",
        "Real-time analysis",
      ],
    },
    {
      step: "03",
      title: "Clear Summary",
      description:
        "Receive a clear, jargon-free summary with actionable insights and recommendations",
      icon: FileText,
      points: [
        "Plain language output",
        "Actionable recommendations",
        "Risk assessment",
      ],
    },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "85%", transition: { duration: 0.8, delay: 0.2 } },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="w-[95%] mx-auto py-16">
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl md:text-6xl font-playfair font-semibold text-gray-800 inline-block relative"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          How It Works
          <motion.span
            className="block h-[3px] bg-blue-400 mx-auto mt-5 rounded-full"
            variants={lineVariants}
          />
        </motion.h3>
        <motion.p
          className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          Three simple steps to transform complex legal documents into clear,
          actionable insights
        </motion.p>
      </div>

      {/* Responsive Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {analysisSteps.map((step, index) => (
          <motion.div
            key={index}
            variants={cardItemVariants}
            className="relative w-full text-center rounded-2xl p-8 border border-blue-400/20 shadow-lg hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 bg-white/95 backdrop-blur-sm text-gray-700"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 via-blue-main to-blue-500 opacity-0 hover:opacity-10 blur-xl transition-opacity duration-300 pointer-events-none"></div>

            {/* Icon */}
            

            {/* Step Number */}
            <div className="relative z-10 text-sm font-semibold tracking-wide text-blue-400 mb-1">
              STEP {step.step}
            </div>

            {/* Title */}
            <h4 className="relative z-10 text-xl font-semibold mb-3 text-gray-800">
              {step.title}
            </h4>

            {/* Description */}
            <p className="relative z-10 text-sm text-gray-600 mb-4">
              {step.description}
            </p>

            {/* Bullet Points */}
            <ul className="relative z-10 text-left space-y-1 text-gray-600 text-sm">
              {step.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">✔</span> {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Analysis;