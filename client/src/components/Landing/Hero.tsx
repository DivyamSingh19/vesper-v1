import React from "react";
import { Briefcase, Shield, Scale, Users } from "lucide-react";
import ButtonPrime from "../buttons/buttonPrime";
import ButtonSec from "../buttons/buttonSec";


export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-[#1f1f1f] text-center px-6 overflow-hidden">
      {/* Soft background glow */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)]"></div> */}

      <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-serif leading-tight text-[#d1cfc0] relative z-10">
        Your <span className="italic text-[#f76f53]">Leagl Ally</span> in
        digital Age
        <br className="md:hidden" />
      </h1>

      <p className="mt-6 text-base md:text-lg text-gray-400 max-w-xl relative z-10">
        Simplify complex legal documents with AI-powered summaries, and book
        verified lawyers in minutes — all on a secure Web2 and
        blockchain-enabled platform. Whether you’re an individual or a business,
        navigate legal challenges with confidence and clarity.
      </p>

      <div className="mt-8 flex gap-4 flex-wrap justify-center relative z-10">
       <ButtonPrime children="Get Started"/>
       <ButtonSec children="Learn more"/>
      </div>

      {/* Trusted by row */}
      <div className="mt-10 text-sm text-gray-500 relative z-10 flex flex-col items-center gap-3">
        <span>
          Trusted by{" "}
          <span className="text-gray-300 font-medium">500+ lawyers</span> and
          professionals worldwide
        </span>
        <div className="flex gap-6 text-gray-500">
          <Briefcase size={28} strokeWidth={1.5} />
          <Shield size={28} strokeWidth={1.5} />
          <Scale size={28} strokeWidth={1.5} />
          <Users size={28} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
