"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SectionSeparatorProps {
  className?: string;
  variant?: "gradient" | "line" | "dots";
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  className = "",
  variant = "gradient",
}) => {
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const variants = {
    gradient: (
      <div
        className={`w-full h-px bg-gradient-to-r from-transparent via-[#f76f53]/30 to-transparent ${className}`}
      />
    ),
    line: <div className={`w-full h-px bg-white/10 ${className}`} />,
    dots: (
      <div className={`flex justify-center items-center py-4 ${className}`}>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#f76f53] rounded-full opacity-60" />
          <div className="w-2 h-2 bg-[#f76f53] rounded-full opacity-40" />
          <div className="w-2 h-2 bg-[#f76f53] rounded-full opacity-20" />
        </div>
      </div>
    ),
  };

  // Don't render animations until client-side
  if (!isClient) {
    return variants[variant];
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {variants[variant]}
    </motion.div>
  );
};

export default SectionSeparator;
