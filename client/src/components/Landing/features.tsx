import React from "react";
import { CardSpotlight } from "../ui/card-spotlight";
import { Brain, Share, Lock } from "lucide-react";

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

const FeaturesCard = () => {
  return (
    <>
      <section className="mt-40">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative">
            Our Features
            <span className="block h-[3px] w-[85%] bg-orange-500 mx-auto mt-2 rounded-full"></span>
          </h3>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8">
          {features.map((feature, i) => (
            <CardSpotlight
              key={i}
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
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturesCard;
