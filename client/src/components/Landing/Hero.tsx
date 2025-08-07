import React from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subTitle: string;
  backgroundImg?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, backgroundImg }) => {
  return (
    <div
      style={{
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="min-h-screen text-center w-[95%] mx-auto flex flex-col gap-6 justify-center items-center">
        <div className=" w-[50%] text-white">
          <h1 className="text-6xl  mb-6">{title}</h1>
          <p>{subTitle}</p>
        </div>
        <div className=" flex gap-6 justify-center">
          <Button className="px-8 py-4 bg-white hover:bg-black text-black hover:text-white">
            Button
          </Button>
          <Button className="px-8 py-4 bg-black text-white hover:bg-white hover:text-black">
            Button
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
