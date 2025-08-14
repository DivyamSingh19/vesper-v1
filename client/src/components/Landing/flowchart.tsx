import {
  ArrowDown,
  GitBranch,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ButtonPrime from "../buttons/buttonPrime";

const flowchartExample = [
  {
    id: 1,
    title: "Employment Issue",
    description: "Something happened at work",
    icon: HelpCircle,
    color:
      "bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/30",
  },
  {
    id: 2,
    title: "Was it discrimination?",
    description: "Based on protected class",
    icon: AlertCircle,
    color: "bg-[#d1cfc0]/10 text-[#d1cfc0] shadow-md shadow-[#d1cfc0]/20",
  },
  {
    id: 3,
    title: "Document Everything",
    description: "Gather evidence and witnesses",
    icon: CheckCircle,
    color: "bg-green-400/10 text-green-400 shadow-md shadow-green-400/20",
  },
  {
    id: 4,
    title: "File EEOC Complaint",
    description: "Within 180 days of incident",
    icon: Users,
    color: "bg-[#a9b2c0]/10 text-[#a9b2c0] shadow-md shadow-[#a9b2c0]/20",
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
    icon: ArrowDown,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Flowchart = () => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-28 mt-10 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Flowchart Card */}
      <motion.div className="w-full max-w-lg" variants={itemVariants}>
        <Card className="p-6 lg:p-8 text-[#d1cfc0] border border-white/5 rounded-2xl shadow-2xl bg-[#1a1a1a]/80">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center gap-2 text-xl lg:text-2xl font-playfair font-semibold border-b-2 border-[#f97316] pb-2">
              <GitBranch className="h-6 w-6 lg:h-8 lg:w-8" />
              Employment Law Example
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-[#d1cfc0]/80">
              Interactive flowchart for workplace discrimination issues
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="mt-2 space-y-3">
              {flowchartExample.map((step, i) => (
                <motion.div key={step.id} variants={itemVariants}>
                  <div className="flex items-center space-x-4 p-4 rounded-xl border border-white/5 bg-[#2e2e2e]/80 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 transition-transform duration-200">
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
                    <div className="flex justify-center my-0.2">
                      <ArrowDown className="h-8 w-8 text-[#a9b2c0]/60" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 p-4 bg-[#2e2e2e]/80 rounded-xl border border-white/5"
              variants={itemVariants}
            >
              <p className="text-sm text-[#d1cfc0]/80">
                <strong className="text-[#f97316]">AI Insight:</strong> You have
                180 days to file an EEOC complaint. Document everything and
                consult an attorney.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                className="px-6 py-3 rounded-xl w-full text-white mt-6 bg-[#f97316] shadow-lg shadow-orange-500/30 
               transition-all duration-300 ease-in-out hover:bg-[#f97316] hover:shadow-orange-500/50 hover:scale-[1.02]"
              >
                Create Flowchart
              </button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features & CTA */}
      <motion.div
        className="flex flex-col gap-8 max-w-xl"
        variants={containerVariants}
      >
        <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-white border-b-2 border-[#f97316] pb-2">
          How it Works
        </h3>
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="flex items-start space-x-4 bg-[#252525]/80 p-5 rounded-xl border border-white/5 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10 transition-transform duration-200"
            variants={itemVariants}
          >
            <div className="p-3 bg-gradient-to-br from-[#f97316] to-[#ff8f3c] text-white rounded-full shadow-lg shadow-[#f97316]/30">
              <f.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-[#d1cfc0]/80">{f.description}</p>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="p-6 bg-[#252525]/90 rounded-xl border border-white/5"
          variants={itemVariants}
        >
          <h1 className="text-2xl sm:text-3xl md:text-[1.875rem] lg:text-3xl xl:text-4xl font-semibold text-white mb-3 leading-[1.2] tracking-tight font-sans">
            Ready to Get Started?
          </h1>
          <p className="mb-4 text-[#d1cfc0]/80 text-sm md:text-base leading-relaxed">
            Answer a few questions to get your personalized legal roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <ButtonPrime
              children="Create My Legal Roadmap"
              className="flex-1 w-full bg-[#f97316] text-white shadow-md md:w-auto text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
            />
            <ButtonPrime
              children="Learn More"
              className="flex-1 w-full md:w-auto text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Flowchart;
