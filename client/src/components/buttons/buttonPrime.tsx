import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ButtonPrime: React.FC<ButtonProps> = ({
  children,
  className,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-xl bg-[#d1cfc0] text-[#1f1f1f] font-medium hover:opacity-70 transition ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children} {icon}
    </button>
  );
};

export default ButtonPrime;
