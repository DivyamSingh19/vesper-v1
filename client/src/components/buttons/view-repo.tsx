"use client";
import React from "react";
import { Heart} from "lucide-react";
import { Button } from "../ui/button";

interface props {
  onClick: () => void;
  className?: string;
}

const ViewRepo = ({ className, onClick }: props) => {
  return (
    <Button
      className={`group w-full sm:w-auto sm:px-10 font-playfair text-md cursor-pointer relative${
        className || ""
      }`}
      onClick={onClick}
    >
      Show Love
      <Heart className="ml-2 transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:-translate-y-1 group-hover:text-red-500 group-hover:fill-red-500" />
    </Button>
  );
};

export default ViewRepo;
