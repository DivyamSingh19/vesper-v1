"use client";
import React from "react";
import { RippleButton } from "../magicui/ripple-button";
import { useRouter } from "next/navigation";

const AboutVesper = () => {
  const router = useRouter();
  return (
    <div>
      <RippleButton className="px-6 py-3 rounded-xl bg-[#404040] text-[#d1cfc0] font-medium hover:bg-[#343434] transition" onClick={()=>{router.push("/about-project")}}>
        About Vesper
      </RippleButton>
    </div>
  );
};

export default AboutVesper;
