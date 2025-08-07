import Hero from "@/components/Landing/Hero";
import React from "react";
import FeaturesCard from "@/components/Landing/features";
function page() {
  return (
    <>
      {/* Header */}
      <Hero
        title="Your Legal Ally in the Digital Age"
        subTitle="Simplify complex legal documents with AI-powered summaries, and book verified lawyers in minutes — all on a secure Web2 and blockchain-enabled platform. Whether you’re an individual or a business, navigate legal challenges with confidence and clarity."
        // backgroundImg="/images/dg.jpg"
      />
      <FeaturesCard />
    </>
  );
}

export default page;
