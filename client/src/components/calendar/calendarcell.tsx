"use client";
import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import type { CalendarState } from "react-stately";
import { CalendarDate,getLocalTimeZone,isSameMonth,isToday } from "@internationalized/date";
import { cn } from "@/lib/utils";

export const CalendarCell = ({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) => {
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isDateToday = isToday(date,getLocalTimeZone());
  const isOutsideofMonth = !isSameMonth(currentMonth,date)
  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideofMonth}
        className="size-10 sm:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
            isDisabled ? "text-muted-foreground cursor-not-alloweds" : "",
            isSelected ? "bg-gray-500 text-white" : "",
            !isSelected && !isDisabled ? "bg-gray-500/10" : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-5 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-gray-600 rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
};
