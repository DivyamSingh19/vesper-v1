"use client";
import React from "react";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";

interface props {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ConfirmBooking = ({ className, onClick, disabled }: props) => {
  return (
    <div>
      <AnimatedSubscribeButton
        className={`bg-black text-white font-playfair text-md w-full ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className || ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span>Book Meeting</span>
        <span>Meeting Booked!</span>
      </AnimatedSubscribeButton>
    </div>
  );
};

export default ConfirmBooking;
