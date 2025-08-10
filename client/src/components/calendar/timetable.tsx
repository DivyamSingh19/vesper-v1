"use client";

import { format } from "date-fns";

// display the availability/time slots and then like a small form to fill the details

interface iAppProps {
  selectedDate: Date;
}

export const TimeTable = ({ selectedDate }: iAppProps) => {
  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{""}
        <span className="text-sm text-muted-foreground">{format(selectedDate, "MMM. d")}</span>
      </p>
    </div>
  );
};
