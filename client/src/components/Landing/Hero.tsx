"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const StarsCanvas = dynamic(() => import("./starCanvas"), { ssr: false });

interface HeroProps {
  title: string;
  subTitle: string;
  backgroundImg?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, backgroundImg }) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* 3D stars canvas */}
      <div className="absolute inset-0 z-0">
        <StarsCanvas />
      </div>

      {/* Hero content */}
      <section className="min-h-screen text-center w-[95%] mx-auto flex flex-col gap-6 justify-center items-center relative z-10">
        <div className="w-[100%] md:w-[70%] lg:w-[50%] text-white">
          <h1 className="text-4xl md:text-[3rem] lg:text-6xl mb-6">{title}</h1>
          <p>{subTitle}</p>
        </div>
        <div className="flex gap-6 justify-center text-lg">
          <Button className="px-8 py-6 border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-md">
            Get Started
          </Button>

          <Button className="px-8 py-6 text-white bg-white/20  hover:bg-white hover:text-black transition-all duration-300 rounded-md">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
