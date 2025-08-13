"use client";
import { Calendar } from "./calendar";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

interface Props {
  onDateSelect?: (date: Date) => void;
}

export const RenderCalendar = ({ onDateSelect }: Props) => {
  const handleDateChange = (date: any) => {
    if (date && onDateSelect) {
      const jsDate = new Date(date.year, date.month - 1, date.day);
      onDateSelect(jsDate);
    }
  };

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      onChange={handleDateChange}
    />
  );
};
