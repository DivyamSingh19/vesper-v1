"use client"
import Hero from "@/components/Landing/Hero";
import React from "react";
import FeaturesCard from "@/components/Landing/features";
import Analysis from "@/components/Landing/analysis";
// import Testimonials from "@/components/Landing/testimonials";
import Flowchart from "@/components/Landing/flowchart";
import F from "@/components/Landing/footer";
import Header from "@/components/Landing/header";

function page() {
  return (
    <>
      <Header />
      <Hero />
      <Analysis />
      <div className="flex flex-col gap-5 justify-center items-center text-[#d1cfc0] text-center mt-29">
        <h2 className="text-4xl font-playfair font-semibold ">
          Legal Flowcharts
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Get personalized legal guidance through AI-generated flowcharts that
          break down complex legal processes into clear, actionable steps
          tailored to your situation.
        </p>
      </div>
      <Flowchart />
      <FeaturesCard />
      {/* <Testimonials /> */}
      <F />
    </>
  );
}

export default page;
