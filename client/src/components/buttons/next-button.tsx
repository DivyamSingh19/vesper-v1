"use client"
import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

interface NextProps {
  onClick: () => void;
  className?: string;
}

const Next = ({ onClick, className }: NextProps) => {
  return (
    <div>
      <InteractiveHoverButton onClick={onClick} className={className}>
        Next
      </InteractiveHoverButton>
    </div>
  );
};

export default Next;
