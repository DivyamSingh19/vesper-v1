"use client";
import React from "react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

interface NextProps {
  onClick: () => void;
  className?: string;
}

const Next = ({ onClick, className }: NextProps) => {
  return (
    <InteractiveHoverButton
      onClick={onClick}
      className={`h-10 flex items-center justify-center text-sm font-medium ${className}`}
    >
      Next
    </InteractiveHoverButton>
  );
};

export default Next;
