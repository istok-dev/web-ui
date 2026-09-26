'use client';

import { Popover } from '@base-ui/react/popover';
import type { PopoverTriggerProps } from '@base-ui/react/popover';
import { isValidElement, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type {
  DateRange as PickerDateRange,
  DayPickerProps,
} from 'react-day-picker';
import { ru } from 'react-day-picker/locale';

import { cn } from '@/utils/cn';

import { Calendar, type CalendarProps } from '../../calendar';

export type DatePickerValue = PickerDateRange | undefined;

type CommonProps = PropsWithChildren<{
  /** Заблокированные даты (передаётся в Calendar) */
  disabled?: DayPickerProps['disabled'];
  /** Управление открытием (вместе с onOpenChange) */
  open?: boolean;
  /** Колбэк при открытии/закрытии */
  onOpenChange?: (open: boolean) => void;
  triggerProps?: PopoverTriggerProps;
  positionerProps?: {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'bottom' | 'left' | 'right';
    sideOffset?: number;
    alignOffset?: number;
    className?: string;
  };
  /** Доп. пропсы календаря */
  calendarProps?: Omit<
    CalendarProps,
    | 'mode'
    | 'selected'
    | 'onSelect'
    | 'required'
    | 'disabled'
    | 'locale'
    | 'numberOfMonths'
  >;
}>;

export type DatePickerSingleProps = CommonProps & {
  mode: 'single';
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = CommonProps & {
  mode?: 'range';
  value: DatePickerValue;
  onChange: (range: DatePickerValue) => void;
  defaultRange: DatePickerValue;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

/* eslint-disable @typescript-eslint/unified-signatures -- range vs single props */
export function DatePicker(props: DatePickerSingleProps): React.ReactElement;
export function DatePicker(props: DatePickerRangeProps): React.ReactElement;
/* eslint-enable @typescript-eslint/unified-signatures */
export function DatePicker({
  mode = 'range',
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
  triggerProps,
  positionerProps,
  calendarProps,
  ...props
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled
    = controlledOpen !== undefined && controlledOnOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  const renderCalendar = () => {
    if (mode === 'range') {
      const { value, onChange, defaultRange, ...rest }
        = props as DatePickerRangeProps;

      return (
        <Calendar
          {...rest}
          {...calendarProps}
          mode={mode}
          required
          defaultMonth={value?.from ?? defaultRange?.from ?? new Date()}
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
          locale={ru}
          className={cn('rounded-4xl border-0', calendarProps?.className)}
        />
      );
    }

    const { value, onChange, ...rest } = props as DatePickerSingleProps;

    return (
      <Calendar
        {...rest}
        {...calendarProps}
        mode={mode}
        required
        defaultMonth={value}
        selected={value}
        onSelect={onChange}
        numberOfMonths={1}
        locale={ru}
        className={cn('rounded-4xl border-0', calendarProps?.className)}
      />
    );
  };

  const childRender = isValidElement(children) ? children : undefined;

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        {...triggerProps}
        render={triggerProps?.render ?? childRender}
        nativeButton={triggerProps?.nativeButton ?? false}
      />
      <Popover.Portal>
        <Popover.Positioner
          align="start"
          sideOffset={4}
          {...positionerProps}
          className={cn('z-100', positionerProps?.className)}
        >
          <Popover.Popup
            className={cn(
              `
                w-auto rounded-4xl border-0 bg-surface-card p-0 text-text-strong
                shadow-md outline-none
              `,
            )}
          >
            {renderCalendar()}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
