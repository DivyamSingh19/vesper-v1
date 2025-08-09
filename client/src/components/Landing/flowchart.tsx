import {
  ArrowDown,
  GitBranch,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { MagicCard } from "../magicui/magic-card";
import ButtonSec from "../buttons/buttonSec";
import ButtonPrime from "../buttons/buttonPrime";

const flowchartExample = [
  {
    id: 1,
    title: "Employment Issue",
    description: "Something happened at work",
    icon: HelpCircle,
    color: "bg-blue-400 text-white", 
  },
  {
    id: 2,
    title: "Was it discrimination?",
    description: "Based on protected class",
    icon: AlertCircle,
    color: "bg-[#d1cfc0]/10 text-[#d1cfc0]",
  },
  {
    id: 3,
    title: "Document Everything",
    description: "Gather evidence and witnesses",
    icon: CheckCircle,
    color: "bg-green-400/10 text-green-400",
  },
  {
    id: 4,
    title: "File EEOC Complaint",
    description: "Within 180 days of incident",
    icon: Users,
    color: "bg-[#a9b2c0]/10 text-[#a9b2c0]",
  },
];

const features = [
  {
    title: "Personalized Guidance",
    description:
      "AI creates custom flowcharts based on your specific legal situation",
    icon: GitBranch,
  },
  {
    title: "Step-by-Step Actions",
    description:
      "Clear action items with deadlines, required documents, and next steps",
    icon: CheckCircle,
  },
  {
    title: "Interactive Decision Trees",
    description:
      "Dynamic flowcharts that adapt based on your answers and circumstances",
    icon: ArrowRight,
  },
];

const Flowchart = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-28 mt-10">
      {/* Flowchart Card */}
      <MagicCard className="w-full max-w-lg p-8 text-[#d1cfc0] bg-[#1f1f1f]/90 border border-white/5 rounded-2xl shadow-lg">
        <h3 className="flex items-center gap-2 text-2xl font-playfair font-semibold">
          <GitBranch className="h-8 w-8" />
          Employment Law Example
        </h3>
        <p className="mt-2 text-sm text-[#d1cfc0]/80">
          Interactive flowchart for workplace discrimination issues
        </p>

        <div className="mt-8 space-y-4">
          {flowchartExample.map((step, i) => (
            <div key={step.id} className="relative">
              <div className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-[#2a2a2a]/80">
                <div className={`p-3 rounded-full ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{step.title}</h4>
                  <p className="text-sm text-[#d1cfc0]/80">
                    {step.description}
                  </p>
                </div>
              </div>
              {i < flowchartExample.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-6 w-6 text-[#a9b2c0]/60" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#2a2a2a]/80 rounded-xl border border-white/5">
          <p className="text-sm text-[#d1cfc0]/80">
            <strong className="text-[#f97316]">AI Insight:</strong> You have 180
            days to file an EEOC complaint. Document everything and consult an
            attorney.
          </p>
        </div>

        <ButtonPrime children="Create Flowchart" className="bg-blue-400 mt-6 text-white" />
      </MagicCard>

      {/* Features & CTA */}
      <div className="flex flex-col gap-8 max-w-xl">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-start space-x-4 bg-[#2a2a2a]/80 p-4 rounded-xl border border-white/5"
          >
            <div className="p-3 bg-[#f97316]/10 text-[#f97316] rounded-full">
              <f.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-[#d1cfc0]/80">{f.description}</p>
            </div>
          </div>
        ))}

        <div className="p-6 bg-[#2a2a2a]/90 rounded-xl border border-white/5">
          <h3 className="text-2xl font-playfair font-semibold text-white">
            Ready to Get Started?
          </h3>
          <p className="mb-4 text-[#d1cfc0]/80 text-sm">
            Answer a few questions to get your personalized legal roadmap.
          </p>
          <ButtonPrime children="Create My Legal Roadmap" />
        </div>
      </div>
    </div>
  );
};

export default Flowchart;
