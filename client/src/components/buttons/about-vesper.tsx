"use client";
import React from "react";
import { RippleButton } from "../magicui/ripple-button";

const AboutVesper = () => {
  return (
    <div>
      <RippleButton className="rounded-md w-25 bg-white font-semibold hover:bg-white/50 text-black font-playfair text-md">
        About
      </RippleButton>
    </div>
  );
};

export default AboutVesper;
