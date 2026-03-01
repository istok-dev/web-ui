"use client";

import { DayPicker, DayPickerProps } from "react-day-picker";

import { cn } from "@/utils/cn";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-2",
        month: "flex flex-col gap-4",
        month_caption: "relative flex items-center justify-center py-1",
        caption_label: "text-body-m font-medium text-[#2c2c2c]",
        nav: "flex items-center gap-1 flex-1 z-2",
        button_previous:
          "flex absolute left-3 top-3 h-9 w-9 rounded-md border border-[#E5E0D8] bg-white p-0 opacity-100 hover:bg-[#F2F0EB] hover:opacity-100 disabled:pointer-events-none disabled:opacity-50 cursor-pointer items-center justify-center",
        button_next:
          "flex absolute right-3 top-3 h-9 w-9 rounded-md border border-[#E5E0D8] bg-white p-0 opacity-100 hover:bg-[#F2F0EB] hover:opacity-100 disabled:pointer-events-none disabled:opacity-50 cursor-pointer items-center justify-center",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-[#5D5D5D] rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-body-m focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#F2F0EB] [&:has([aria-selected].day-outside)]:bg-transparent [&:has([aria-selected].day-range-end)]:rounded-r-md",
        day_button: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md transition-colors",
          "hover:bg-[#F2F0EB] hover:text-[#2c2c2c]",
          "text-[#2c2c2c] cursor-pointer"
        ),
        range_start:
          "day-range-start rounded-s-md bg-[#8F9F83] text-white hover:bg-[#8F9F83] hover:text-white",
        range_end:
          "day-range-end rounded-e-md bg-[#8F9F83] text-white hover:bg-[#8F9F83] hover:text-white",
        selected: "bg-[#8F9F83] text-white hover:bg-[#8F9F83] hover:text-white",
        today: "bg-[#E1EFFF]",
        outside:
          "day-outside text-[#5D5D5D] opacity-50 aria-selected:bg-transparent aria-selected:text-[#5D5D5D]",
        disabled: "text-[#5D5D5D] opacity-50",
        range_middle: "aria-selected:bg-[#E8EDE4] aria-selected:text-[#2c2c2c]",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
