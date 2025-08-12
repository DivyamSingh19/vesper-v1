"use client"
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface props {
  onClick: () => void;
  className?: string;
}

const Back = ({onClick,className}:props) => {
  return (
    <Button
      className={`w-full sm:w-auto sm:px-14 font-playfair text-md cursor-pointer relative ${className||""}`}
      onClick={onClick}
    >
      <ChevronLeft />
      Back
    </Button>
  );
};

export default Back;
