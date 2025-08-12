import React from "react";
import { CardSpotlight } from "../ui/card-spotlight";
import { Brain, Share, Lock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summarization",
    description:
      "Advanced AI breaks down complex legal jargon into understandable language",
  },
  {
    icon: Lock,
    title: "Blockchain Security",
    description:
      "IPFS technology ensures your documents are tamper-proof and encrypted",
  },
  {
    icon: Share,
    title: "One-Click Sharing",
    description:
      "Securely share analysis with legal teams or clients with encrypted links",
  },
];

// Animation variants for the heading and line
const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "85%", transition: { duration: 0.8, delay: 0.2 } },
};

// Animation variants for the card container and individual cards
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect for children cards
      delayChildren: 0.4,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesCard = () => {
  return (
    <section className="mt-40">
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Our Features
          <motion.span
            className="block h-[3px] bg-orange-500 mx-auto mt-2 rounded-full"
            variants={lineVariants}
          ></motion.span>
        </motion.h3>
      </div>

      <motion.div
        className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {features.map((feature, i) => (
          <motion.div key={i} variants={cardItemVariants}>
            <CardSpotlight
              className="relative w-full max-w-md text-center rounded-2xl p-6 bg-[#404040]/80 backdrop-blur-sm border border-white/10 shadow-lg 
          hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Glow Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-orange-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Icon */}
              <div className="relative z-10 p-4 rounded-full bg-gradient-to-tr from-blue-500 to-orange-400 text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <feature.icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-semibold text-[#d1cfc0]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-4 text-gray-400 text-base leading-relaxed">
                {feature.description}
              </p>
            </CardSpotlight>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesCard;
