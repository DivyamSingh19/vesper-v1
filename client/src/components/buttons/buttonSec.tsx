import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonSec: React.FC<ButtonProps> = ({ children, className }) => {
  return (
    <button
      className={`px-6 py-3 rounded-xl bg-[#404040] text-[#d1cfc0] font-medium hover:bg-[#343434] transition ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonSec;
