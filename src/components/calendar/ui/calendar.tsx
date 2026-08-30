'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker, formatCaption } from 'react-day-picker';
import type { DayPickerProps } from 'react-day-picker';

import { cn } from '@/utils/cn';

type CalendarView = 'days' | 'years';

const DEFAULT_START_MONTH = new Date(1900, 0);
const DEFAULT_END_MONTH = new Date(2100, 11);

function formatCalendarCaption(
  month: Date,
  options?: Parameters<typeof formatCaption>[1],
  dateLib?: Parameters<typeof formatCaption>[2],
) {
  const localeCode = options?.locale?.code;
  if (localeCode?.startsWith('ru')) {
    return new Intl.DateTimeFormat('ru', {
      month: 'long',
      year: 'numeric',
    }).format(month);
  }
  return formatCaption(month, options, dateLib);
}

type YearGridProps = {
  selectedYear: number;
  startYear: number;
  endYear: number;
  onSelectYear: (year: number) => void;
};

function YearGrid({
  selectedYear,
  startYear,
  endYear,
  onSelectYear,
}: YearGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const years = useMemo(() => {
    const list: number[] = [];
    for (let year = startYear; year <= endYear; year += 1) {
      list.push(year);
    }
    return list;
  }, [startYear, endYear]);

  useEffect(() => {
    const container = containerRef.current;
    const selected = selectedRef.current;
    if (!container || !selected) return;
    container.scrollTop
      = selected.offsetTop
        - container.clientHeight / 2
        + selected.clientHeight / 2;
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid max-h-70 grid-cols-3 gap-1 overflow-y-auto py-1"
      role="listbox"
      aria-label="Выбор года"
    >
      {years.map((year) => {
        const isSelected = year === selectedYear;
        return (
          <button
            key={year}
            ref={isSelected ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelectYear(year)}
            className={cn(
              `
                flex h-10 cursor-pointer items-center justify-center
                rounded-full text-body-md transition-colors
              `,
              isSelected
                ? 'text-white bg-primary-600 font-medium'
                : `
                  text-text-strong
                  hover:bg-neutral-100
                `,
            )}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month: controlledMonth,
  defaultMonth,
  onMonthChange,
  startMonth = DEFAULT_START_MONTH,
  endMonth = DEFAULT_END_MONTH,
  formatters,
  components,
  ...props
}: DayPickerProps) {
  const [view, setView] = useState<CalendarView>('days');
  const [internalMonth, setInternalMonth] = useState(
    () => controlledMonth ?? defaultMonth ?? new Date(),
  );

  const displayMonth = controlledMonth ?? internalMonth;
  const startYear = startMonth.getFullYear();
  const endYear = endMonth.getFullYear();

  const handleMonthChange = (nextMonth: Date) => {
    if (controlledMonth === undefined) {
      setInternalMonth(nextMonth);
    }
    onMonthChange?.(nextMonth);
  };

  const handleSelectYear = (year: number) => {
    handleMonthChange(new Date(year, displayMonth.getMonth(), 1));
    setView('days');
  };

  const toggleView = () => {
    setView(current => (current === 'days' ? 'years' : 'days'));
  };

  const captionLabel = formatCalendarCaption(
    displayMonth,
    props.locale ? { locale: props.locale as never } : undefined,
  );

  if (view === 'years') {
    return (
      <div className={cn('w-70 p-3', className)}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={toggleView}
            aria-expanded
            aria-label="Закрыть выбор года"
            className="
              flex cursor-pointer items-center gap-1 rounded-lg border-0
              bg-transparent p-0 text-body-md font-medium text-text-strong
              capitalize
            "
          >
            {captionLabel}
            <ChevronRight
              className="size-4 rotate-90 text-primary-600"
              aria-hidden
            />
          </button>
        </div>
        <YearGrid
          selectedYear={displayMonth.getFullYear()}
          startYear={startYear}
          endYear={endYear}
          onSelectYear={handleSelectYear}
        />
      </div>
    );
  }

  return (
    <DayPicker
      {...props}
      showOutsideDays={showOutsideDays}
      navLayout="after"
      month={displayMonth}
      onMonthChange={handleMonthChange}
      startMonth={startMonth}
      endMonth={endMonth}
      className={cn('w-70 p-3', className)}
      formatters={{
        formatCaption: formatCalendarCaption,
        ...formatters,
      }}
      classNames={{
        months: 'flex flex-col',
        month: 'flex w-full flex-wrap items-center',
        month_caption: 'flex flex-1 items-center justify-start py-1',
        caption_label: `
          text-text-strong flex cursor-pointer items-center gap-1
          text-body-md font-medium capitalize
        `,
        nav: 'flex items-center gap-0.5',
        button_previous: `
          flex size-8 cursor-pointer items-center justify-center
          rounded-full border-0 bg-transparent p-0 text-primary-600
          hover:bg-primary-50
          disabled:pointer-events-none disabled:opacity-40
        `,
        button_next: `
          flex size-8 cursor-pointer items-center justify-center
          rounded-full border-0 bg-transparent p-0 text-primary-600
          hover:bg-primary-50
          disabled:pointer-events-none disabled:opacity-40
        `,
        chevron: 'size-5',
        month_grid: 'mt-3 w-full border-collapse',
        weekdays: 'flex w-full',
        weekday: `
          text-text-secondary flex h-9 w-9 items-center justify-center
          text-body-sm font-normal lowercase
        `,
        week: 'mt-1 flex w-full',
        day: `
          relative p-0 text-center text-body-md
          focus-within:relative focus-within:z-20
          [&:has([aria-selected])]:bg-neutral-100
          [&:has([aria-selected].day-outside)]:bg-transparent
          [&:has([aria-selected].day-range-end)]:rounded-r-md
        `,
        day_button: cn(
          `
            size-9 rounded-full p-0 font-normal transition-colors
            aria-selected:opacity-100
          `,
          'hover:bg-neutral-100 hover:text-text-strong',
          'cursor-pointer text-text-strong',
        ),
        range_start:
          'day-range-start rounded-full bg-accent-600 text-white hover:bg-accent-600 hover:text-white',
        range_end:
          'day-range-end rounded-full bg-accent-600 text-white hover:bg-accent-600 hover:text-white',
        selected:
          'bg-accent-600 text-white hover:bg-accent-600 hover:text-white',
        today: 'bg-primary-100',
        outside:
          'day-outside text-text-muted aria-selected:bg-transparent aria-selected:text-text-muted',
        disabled: 'text-text-muted opacity-50',
        range_middle:
          'aria-selected:bg-accent-100 aria-selected:text-text-strong',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        ...components,
        Chevron: ({ orientation, className: chevronClassName, disabled }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
          return (
            <Icon
              className={cn(
                'size-5',
                disabled && 'opacity-40',
                chevronClassName,
              )}
              aria-hidden
            />
          );
        },
        CaptionLabel: ({ className: labelClassName, children }) => (
          <button
            type="button"
            aria-live="polite"
            aria-expanded={false}
            aria-label="Выбрать год"
            onClick={toggleView}
            className={cn(labelClassName)}
          >
            {children}
            <ChevronRight
              className="size-4 shrink-0 text-primary-600"
              aria-hidden
            />
          </button>
        ),
      }}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
