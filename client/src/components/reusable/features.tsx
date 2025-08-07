import React from "react";
import { CardSpotlight } from "../ui/card-spotlight";
import { Brain, Share, Lock } from "lucide-react";
const FeaturesCard = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-evenly items-center">
      <CardSpotlight className="w-75 h-75 text-white shadow-black shadow-2xl">
        <Brain className="h-12 w-12 text-white mx-auto mb-4 relative z-20" />
        <h3 className="relative z-20 text-lg md:text-xl font-semibold md:font-bold mt-2">
          AI Powered Summarization
        </h3>
        <p className="relative z-20 mt-4 text-neutral-300 font-normal md:font-medium text-md md:text-lg">
          Advanced AI breaks down complex legal jargon into understandable
          language
        </p>
      </CardSpotlight>

      <CardSpotlight className="w-75 h-75 text-white shadow-black shadow-2xl">
        <Lock className="h-12 w-12 text-white mx-auto mb-4 relative z-20" />
        <h3 className="relative z-20 text-lg md:text-xl font-semibold md:font-bold mt-2">
          Blockchain Security
        </h3>
        <p className="relative z-20 mt-4 text-neutral-300 font-normal md:font-medium text-md md:text-lg">
          IPFS technology ensures your documents are tamper-proof and encrypted
        </p>
      </CardSpotlight>

      <CardSpotlight className="w-75 h-75 text-white shadow-black shadow-2xl">
        <Share className="h-12 w-12 text-white mx-auto mb-4 relative z-20" />
        <h3 className="relative z-20 text-lg md:text-xl font-semibold md:font-bold mt-2">
          One-Click Sharing
        </h3>
        <p className="relative z-20 mt-4 text-neutral-300 font-normal md:font-medium text-md md:text-lg">
          Securely share analysis with legal temas or clients with encrypted
          links
        </p>
      </CardSpotlight>
    </div>
  );
};

export default FeaturesCard;
