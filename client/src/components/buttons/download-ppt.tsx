import React from "react";
import { RainbowButton } from "../magicui/rainbow-button";
import { Download } from "lucide-react";

const DownloadPPT = () => {
  return (
    <div>
      <RainbowButton
        variant="outline"
        className="group px-6 py-5 w-45 text-white font-playfair text-md relative transition-all duration-300 hover:scale-105 hover:shadow-[0_0_11px_rgba(255,255,255,0.4)]"
      >
        Download PPT
        <Download className="h-8 w-8 mu-1 transition-transform duration-300 group-hover:translate-x-1" />
      </RainbowButton>
    </div>
  );
};

export default DownloadPPT;
