import Hero from "@/components/landing/Hero";
import TrialHero from "@/components/trial/hero";
import Navbar from "@/components/trial/navbar";

import React from "react";

const page = () => {
  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
            <Navbar/>
        </div>
      </div>
    </div>
  );
};

export default page;
