'use client';

import { DayPicker } from 'react-day-picker';
import type { DayPickerProps } from 'react-day-picker';

import { cn } from '@/utils/cn';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col gap-2',
        month: 'flex flex-col gap-4',
        month_caption: 'relative flex items-center justify-center py-1',
        caption_label: 'text-body-md font-medium text-(--text-strong)',
        nav: 'flex flex-1 items-center gap-1 z-2',
        button_previous: `
          flex absolute left-3 top-3 h-9 w-9 cursor-pointer items-center
          justify-center rounded-full border-0 bg-(--surface-muted) p-0
          opacity-100 hover:bg-neutral-200 hover:opacity-100
          disabled:pointer-events-none disabled:opacity-50
        `,
        button_next: `
          flex absolute right-3 top-3 h-9 w-9 cursor-pointer items-center
          justify-center rounded-full border-0 bg-(--surface-muted) p-0
          opacity-100 hover:bg-neutral-200 hover:opacity-100
          disabled:pointer-events-none disabled:opacity-50
        `,
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'text-(--text-secondary) rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: `
          relative p-0 text-center text-body-md focus-within:relative
          focus-within:z-20
          [&:has([aria-selected])]:bg-neutral-100
          [&:has([aria-selected].day-outside)]:bg-transparent
          [&:has([aria-selected].day-range-end)]:rounded-r-md
        `,
        day_button: cn(
          `
            size-9 rounded-full p-0 font-normal transition-colors
            aria-selected:opacity-100
          `,
          'hover:bg-neutral-200 hover:text-(--text-strong)',
          'cursor-pointer text-(--text-strong)',
        ),
        range_start:
          'day-range-start rounded-full bg-accent-600 text-white hover:bg-accent-600 hover:text-white',
        range_end:
          'day-range-end rounded-full bg-accent-600 text-white hover:bg-accent-600 hover:text-white',
        selected:
          'bg-accent-600 text-white hover:bg-accent-600 hover:text-white',
        today: 'bg-primary-100',
        outside:
          'day-outside text-(--text-muted) opacity-50 aria-selected:bg-transparent aria-selected:text-(--text-muted)',
        disabled: 'text-(--text-muted) opacity-50',
        range_middle:
          'aria-selected:bg-accent-100 aria-selected:text-(--text-strong)',
        hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
