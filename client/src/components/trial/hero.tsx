"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "85%", transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <div className="relative h-screen w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl">
          {/* Top label - close to main text */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-full border border-gray-700 mb-6">
            <span>Introducing Support for AI Models</span>
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your <span className="text-blue-700 italic">Legal Ally</span> in the
            Digital Age
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Simplify complex legal documents with AI-powered summaries, and
            <br />
            book verified lawyers in minutes —all on a secure Web2 and
            <br />
            blockchain-enabled platform. Whether you're an individual or a
            <br />
            business, navigate legal challenges with confidence and clarity.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              Get Started
            </button>
            <button className="px-8 py-3 text-gray-700 font-semibold hover:text-gray-900 transition-colors duration-200">
              About Vesper
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            Trusted by 500+ lawyers and professionals worldwide
          </p>

          <motion.span
            className="block h-[3px] bg-blue-400 mx-auto mt-5 rounded-full"
            variants={lineVariants}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
