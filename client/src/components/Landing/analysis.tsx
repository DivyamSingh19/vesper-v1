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
          className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          How It Works
          <motion.span
            className="block h-[3px] bg-orange-500 mx-auto mt-5 rounded-full"
            variants={lineVariants}
          />
        </motion.h3>
        <motion.p
          className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
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
            className="relative w-full text-center rounded-2xl p-8 border border-white/10 shadow-lg hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300"
            style={{
              background:
                "linear-gradient(145deg, rgba(50,50,50,0.95), rgba(35,35,35,0.9))",
              color: "#d1cfc0",
            }}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 opacity-0 hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none"></div>

            {/* Icon */}
            <motion.div
              className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f97316] text-white shadow-md mb-6"
              variants={iconVariants}
            >
              <step.icon className="h-8 w-8" />
            </motion.div>

            {/* Step Number */}
            <div className="relative z-10 text-sm font-semibold tracking-wide text-[#97b8ee] mb-1">
              STEP {step.step}
            </div>

            {/* Title */}
            <h4 className="relative z-10 text-xl font-semibold mb-3">
              {step.title}
            </h4>

            {/* Description */}
            <p className="relative z-10 text-sm text-gray-300 mb-4">
              {step.description}
            </p>

            {/* Bullet Points */}
            <ul className="relative z-10 text-left space-y-1 text-gray-400 text-sm">
              {step.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#d1cfc0]">✔</span> {point}
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
