"use client"
import React from "react";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";

interface props {
  className?: string;
  onClick?: () => void;
}

const ConfirmBooking = ({ className, onClick }: props) => {
  return (
    <div>
      <AnimatedSubscribeButton
        className={`bg-black text-white font-playfair text-md w-full ${
          className || ""
        }`}
        onClick={onClick}
      >
        <span>Book Meeting</span>
        <span>Meeting Booked!</span>
      </AnimatedSubscribeButton>
    </div>
  );
};

export default ConfirmBooking;
