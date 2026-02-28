"use client";

import React, { isValidElement, cloneElement } from "react";
import { PropsWithChildren, useState } from "react";
import type {
  DateRange as PickerDateRange,
  DayPickerProps,
} from "react-day-picker";
import { ru } from "react-day-picker/locale";
import { Popover } from "@base-ui/react/popover";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

import { Calendar } from "../../calendar";

export type DatePickerValue = PickerDateRange | undefined;

type CommonProps = PropsWithChildren<{
  /** Заблокированные даты (передаётся в Calendar) */
  disabled?: DayPickerProps["disabled"];
  /** Управление открытием (вместе с onOpenChange) */
  open?: boolean;
  /** Колбэк при открытии/закрытии */
  onOpenChange?: (open: boolean) => void;
}>;

export type DatePickerSingleProps = CommonProps & {
  mode: "single";
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = CommonProps & {
  mode?: "range";
  value: DatePickerValue;
  onChange: (range: DatePickerValue) => void;
  defaultRange: DatePickerValue;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export function DatePicker(props: DatePickerSingleProps): React.ReactElement;
export function DatePicker(props: DatePickerRangeProps): React.ReactElement;
export function DatePicker({
  mode = "range",
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
  ...props
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled =
    controlledOpen !== undefined && controlledOnOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  const renderCalendar = () => {
    if (mode === "range") {
      const { value, onChange, defaultRange, ...rest } =
        props as DatePickerRangeProps;

      return (
        <Calendar
          {...rest}
          mode={mode}
          required
          defaultMonth={value?.from ?? defaultRange?.from ?? new Date()}
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
          locale={ru}
          className="rounded-xl border-0"
        />
      );
    }

    const { value, onChange, ...rest } = props as DatePickerSingleProps;

    return (
      <Calendar
        {...rest}
        mode={mode}
        required
        defaultMonth={value}
        selected={value}
        onSelect={onChange}
        numberOfMonths={1}
        locale={ru}
        className="rounded-xl border-0"
      />
    );
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        render={(triggerProps) => {
          if (isValidElement(children)) {
            const child = children as React.ReactElement;
            return cloneElement(child, {
              ...triggerProps,
              ...(child.props as Record<string, unknown>),
            });
          }
          return <button {...triggerProps}>{children}</button>;
        }}
      />
      <Popover.Portal>
        <Popover.Positioner align="start" sideOffset={4}>
          <Popover.Popup
            className={twMerge(
              clsx(
                "z-50 w-auto rounded-xl border border-[#E5E0D8] bg-white p-0 text-[#2c2c2c] shadow-md outline-none",
                "data-[open]:animate-in data-[closed]:animate-out",
                "data-[closed]:fade-out-0 data-[open]:fade-in-0",
                "data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2",
                "data-[side=top]:slide-in-from-bottom-2"
              )
            )}
          >
            {renderCalendar()}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
