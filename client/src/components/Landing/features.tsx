import React from "react";
import { Brain, Shield, Zap, Users, Lock, Upload } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summarization",
    description:
      "AI breaks down complex legal jargon into understandable language",
    points: ["GDPR compliant", "SOC 2 certified", "Legal industry standards"],
    iconColor: "from-blue-400 to-cyan-300", // lighter, cooler tones
  },
  {
    icon: Lock,
    title: "Blockchain Security",
    description:
      "IPFS technology ensures your documents are tamper-proof and encrypted",
    points: ["Real-time processing", "Instant results", "24/7 availability"],
    iconColor: "from-cyan-300 to-green-300",
  },
  {
    icon: Upload,
    title: "One-Click Sharing",
    description:
      "Secure share analysis with legal teams or clients with encrypted links ",
    points: ["Real-time collaboration", "Role-based access", "Version control"],
    iconColor: "from-violet-400 to-indigo-300",
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

const FeaturesCard = () => {
  return (
    <section className="mt-40 mb-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Our Features
          <motion.span
            className="block h-[3px] bg-orange-500 mx-auto mt-2 rounded-full"
            variants={lineVariants}
          />
        </motion.h3>
      </div>

      {/* Cards */}
      <motion.div
        className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardItemVariants}
            className="relative w-full max-w-sm text-center rounded-2xl p-6 bg-[#2d2d2d]/80 border border-white/10 shadow-lg hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 opacity-0 hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none"></div>

            {/* <motion.div
            key={i}
            variants={cardItemVariants}
            className="relative w-full max-w-sm text-center rounded-2xl p-6 bg-[#2d2d2d]/80 border border-white/10 shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
             Hover Glow
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div> */}

            {/* Icon */}
            <div
              className={`relative z-10 p-4 rounded-full bg-gradient-to-tr ${feature.iconColor} text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg`}
            >
              <feature.icon className="h-8 w-8" />
            </div>

            {/* Title */}
            <h3 className="relative z-10 text-xl font-semibold text-[#f3f3f3]">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="relative z-10 mt-2 text-gray-400 text-base leading-relaxed">
              {feature.description}
            </p>

            {/* Bullet Points */}
            {/* <ul className="mt-4 text-left space-y-1 text-sm text-gray-300">
              {feature.points.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-cyan-300">•</span> {point}
                </li>
              ))}
            </ul> */}

            {/* Learn More */}
            <button className="mt-4 text-cyan-300 hover:text-cyan-200 text-sm transition-colors">
              Learn more →
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesCard;
