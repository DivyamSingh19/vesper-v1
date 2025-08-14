import React from "react";

interface SpacingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const Spacing: React.FC<SpacingProps> = ({ size = "md", className = "" }) => {
  const spacingClasses = {
    xs: "h-4 lg:h-6",
    sm: "h-8 lg:h-12",
    md: "h-12 lg:h-16",
    lg: "h-16 lg:h-24",
    xl: "h-20 lg:h-32",
    "2xl": "h-24 lg:h-40",
  };

  return <div className={`${spacingClasses[size]} ${className}`} />;
};

export default Spacing;
