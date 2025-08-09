import React from "react";
import { FileText, Upload, Brain } from "lucide-react";

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

  return (
    <section className=" w-[95%] mx-auto">
      {/* Heading with orange underline */}
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-6xl font-playfair font-semibold text-[#d1cfc0] inline-block relative">
          How It Works
          <span className="block h-[3px] w-[85%] bg-orange-500 mx-auto mt-2 rounded-full"></span>
        </h3>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {analysisSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center rounded-2xl border-1 border-white p-8 shadow-lg transition-transform hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 0.2}s`,
              backgroundColor: "rgba(64, 64, 64, 0.9)",
              color: "#d1cfc0",
            }}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Analysis;
