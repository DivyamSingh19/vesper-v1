"use client"
import Hero from "@/components/Landing/Hero";
import React from "react";
import FeaturesCard from "@/components/Landing/features";
import Analysis from "@/components/Landing/analysis";
import Testimonials from "@/components/Landing/testimonials";
import Flowchart from "@/components/Landing/flowchart";
import F from "@/components/Landing/footer";

function page() {
  return (
    <>
      {/* Header */}
      <Hero
        title="Your Legal Ally in the Digital Age"
        subTitle="Simplify complex legal documents with AI-powered summaries, and book verified lawyers in minutes — all on a secure Web2 and blockchain-enabled platform. Whether you’re an individual or a business, navigate legal challenges with confidence and clarity."
        // backgroundImg="/images/dg.jpg"
      />
      <Analysis />
      <div className="flex flex-col gap-5 justify-center items-center text-center text-white mt-30 ">
        <h2 className="text-3xl font-playfair font-semibold ">
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
      <Testimonials />
      <F/>
    </>
  );
}

export default page;
