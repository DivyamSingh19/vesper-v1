import { div } from "framer-motion/client";
import { MagicCard } from "../magicui/magic-card";
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

const Flowchart = () => {
  const flowchartExample = [
    {
      id: 1,
      type: "start",
      title: "Employment Issue",
      description: "Something happened at work",
      icon: HelpCircle,
      color: "bg-yellow-300/10 text-yellow-300",
    },
    {
      id: 2,
      type: "question",
      title: "Was it discrimination?",
      description: "Based on protected class",
      icon: AlertCircle,
      color: "bg-blue-300/10 text-blue-300",
    },
    {
      id: 3,
      type: "action",
      title: "Document Everything",
      description: "Gather evidence and witnesses",
      icon: CheckCircle,
      color: "bg-green-300/10 text-green-300",
    },
    {
      id: 4,
      type: "outcome",
      title: "File EEOC Complaint",
      description: "Within 180 days of incident",
      icon: Users,
      color: "bg-blue-300/10 text-gray-300",
    },
  ];

  const features = [
    {
      title: "Personalized Guidance",
      description:
        "AI creates custom flowcharts based on your specific legal situation and jurisdiction",
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

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-12 py-10 px-4 ">
      <MagicCard
        className="w-full max-w-lg p-5 rounded-2xl text-white"
        backgroundClass="bg-black"
      >
        <div className="flex flex-col text-center p-4">
          <h3 className="flex items-self-center  gap-2 text-xl md:text-3xl font-playfair font-bold text-white">
            <GitBranch className="h-8 w-8" />
            Employment Law Example
          </h3>
          <p className="text-xl text-muted-foreground mt-2">
            Interactive flowchart for workplace discrimination issues
          </p>
        </div>

        <div className="p-8">
          {flowchartExample.map((content, index) => (
            <div key={content.id} className="relative">
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10">
                <div className={`p-3 rounded-full ${content.color}`}>
                  <content.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4>{content.title}</h4>
                  <p>{content.description}</p>
                </div>
              </div>
              {index < flowchartExample.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-6 w-6 text-gray-100" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 p-4 bg-white/10 rounded-lg">
          <p className="text-sm text-gray-500">
            <strong>AI Insight:</strong> Based on your situation, you have 180
            days to file an EEOC complaint. Document all incidents and consider
            consulting with an employment attorney.
          </p>
        </div>
        <Button className="bg-[#294b88] mt-5 w-full">Create Flowchart</Button>
      </MagicCard>

      <div className="flex flex-col items-center">
        <div className="space-y-15">
          {features.map((feature, index) => (
            <div key={index} className="flex  items-start space-x-4 ml-10">
              <div className="p-3 bg-blue-300/10 text-gray-300 rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20 max-w-xl">
          <h3 className="text-2xl font-playfair font-semibold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-6">
            Answer a few questions about your legal situation and get a
            personalized flowchart with actionable next steps.
          </p>
          <Button className="btn-primary">
            Create My Legal Roadmap
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;
