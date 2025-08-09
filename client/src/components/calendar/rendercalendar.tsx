"use client";
import { Calendar } from "./calendar";
import { today, getLocalTimeZone } from "@internationalized/date";

// interface iappProps {
//   availability: {
//     day: string;
//     isActive: boolean;
//   }[];
// }

// { availability }: iappProps
export const RenderCalendar = () => {
  return <Calendar minValue={today(getLocalTimeZone())} />;
};
