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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="w-[95%] mx-auto py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Heading with Orange Underline */}
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
          <motion.span
            className="block h-[3px] bg-orange-500 mx-auto mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.span>
        </motion.h3>
        <motion.p
          className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Three simple steps to transform complex legal documents into clear,
          actionable insights
        </motion.p>
      </div>

      {/* Steps */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {analysisSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center rounded-2xl border border-gray-600 p-8 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(209,207,192,0.25)]"
            style={{
              background:
                "linear-gradient(145deg, rgba(50,50,50,0.95), rgba(35,35,35,0.9))",
              color: "#d1cfc0",
            }}
            variants={cardVariants}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d1cfc0] text-[#1f1f1f] shadow-md mb-6"
              variants={iconVariants}
            >
              <step.icon className="h-8 w-8" />
            </motion.div>
            <div className="text-sm font-semibold tracking-wide text-[#97b8ee] mb-1">
              STEP {step.step}
            </div>
            <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
            <p className="text-sm text-gray-300 mb-4">{step.description}</p>
            <ul className="text-left space-y-1 text-gray-400 text-sm">
              {step.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#d1cfc0]">✔</span> {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Button Text + Button */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-gray-300 text-lg mb-4">
          Ready to simplify your legal documents?
        </p>
        <button className="px-8 py-3 rounded-full bg-[#d1cfc0] text-[#1f1f1f] font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(209,207,192,0.4)] transition">
          Start Analysis
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Analysis;
