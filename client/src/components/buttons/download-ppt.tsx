import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const DownloadPPT = () => {
  return (
    <div>
      <Button className="px-6 py-5 w-45 text-black hover:bg-white/30 font-playfair text-md relative">
        Download PPT
        <Download className="h-8 w-8"/>
      </Button>
    </div>
  );
};

export default DownloadPPT;
