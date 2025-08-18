"use client";
import React, { useState } from "react";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Next from "./next-button";

const twelvehr = [
  { time: "9:30am" },
  { time: "10:00am" },
  { time: "10:30am" },
  { time: "11:00am" },
  { time: "11:30am" },
  { time: "12:00pm" },
  { time: "12:30pm" },
  { time: "1:00pm" },
  { time: "1:30pm" },
  { time: "2:00pm" },
  { time: "2:30pm" },
  { time: "3:00pm" },
  { time: "3:30pm" },
  { time: "4:00pm" },
  { time: "4:30pm" },
];

const twentyfourhr = [
  { time: "9:30" },
  { time: "10:00" },
  { time: "10:30" },
  { time: "11:00" },
  { time: "11:30" },
  { time: "12:00" },
  { time: "12:30" },
  { time: "13:00" },
  { time: "13:30" },
  { time: "14:00" },
  { time: "14:30" },
  { time: "15:00" },
  { time: "15:30" },
  { time: "16:00" },
  { time: "16:30" },
];

interface TimeSlotProps {
  format: string;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
  className?: string;
}

const TimeSlot = ({
  format,
  selectedTime,
  onTimeSelect,
  onNext,
  className,
}: TimeSlotProps) => {
  return (
    <div className={`w-full ${className}`}>
      {format === "12h" ? (
        <div className="flex flex-col w-full space-y-2">
          {twelvehr.map((times, index) => {
            return (
              <div key={index} className="w-full">
                {selectedTime === times.time ? (
                  <Next onClick={onNext} className="w-full rounded-md" />
                ) : (
                  <ShinyButton
                    className="w-full h-10 text-sm font-medium"
                    onClick={() => onTimeSelect(times.time)}
                  >
                    {times.time}
                  </ShinyButton>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full space-y-2">
          {twentyfourhr.map((times, index) => {
            return (
              <div key={index} className="w-full">
                {selectedTime === times.time ? (
                  <Next onClick={onNext} className="w-full rounded-md" />
                ) : (
                  <ShinyButton
                    className="w-full h-10 text-sm font-medium"
                    onClick={() => onTimeSelect(times.time)}
                  >
                    {times.time}
                  </ShinyButton>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlot;
