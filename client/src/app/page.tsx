import Hero from "@/components/Landing/Hero";
import React from "react";
import FeaturesCard from "@/components/Landing/features"
import Analysis from "@/components/Landing/analysis";
import  Testimonials  from "@/components/Landing/testimonials";
function page() {
  return <>
      {/* Header */}
      <Hero
        title="All your Business Expenses in one place"
        subTitle="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
        // backgroundImg="/images/dg.jpg"
      />
      <Analysis />
      <FeaturesCard />
      <Testimonials/>
    </>

}

export default page;
