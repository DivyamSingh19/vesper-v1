"use client";

import { format } from "date-fns";

// display the availability/time slots and then like a small form to fill the details

interface Props {
  selectedDate: Date;
  className?: string;
}

export const TimeTable = ({ selectedDate,className }: Props) => {
  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}
        {""}
        <span className={`text-sm text-muted-foreground ${className}||""`}>
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
    </div>
  );
};
