import React from "react";

interface Props {
  className?: string;
  messageContent?: string;
  onClick: () => void;
}

export const GenerateFlowchart = ({ className, messageContent,onClick }: Props) => {
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-white 
       bg-white/[0.05] border border-white/[0.05]
        ${className || ""}`}
    >
      Generate Flowchart
    </button>
  );
};
