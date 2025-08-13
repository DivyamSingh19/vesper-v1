"use client";
import { Calendar } from "./calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

interface props {
  // availability: {
  //   day: string;
  //   isActive: boolean;
  // }[];
 
}

export const RenderCalendar = ({}:props) => {
  return (
    <Calendar  minValue={today(getLocalTimeZone())} />
  );
};
