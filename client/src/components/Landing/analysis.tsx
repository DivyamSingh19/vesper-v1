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
    <div className="mb-20">
      <h3 className="text-3xl font-playfair font-semibold text-center text-white mb-12">
        How It Works
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {analysisSteps.map((step, index) => (
          <div
            key={index}
            className="text-center slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-6">
              <step.icon className="h-8 w-8" />
            </div>
            <div className="text-gray-400 font-bold text-lg mb-2">
              STEP {step.step}
            </div>
            <h4 className="text-xl font-semibold text-white mb-4">
              {step.title}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
