'use client';

import type { PopoverPopupProps, PopoverTriggerProps } from '@base-ui/react/popover';
import { Calendar } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { DatePicker } from '@/components/date-picker';
import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';

import type { DateInputProps } from '../date-input.types';
import { datesEqual, formatDate, parseDate } from '../parse-date';

const CALENDAR_LAYER_SELECTOR = '[data-date-input-popup], [data-date-input-trigger]';

function isCalendarLayer(target: EventTarget | null) {
  return target instanceof Element && target.closest(CALENDAR_LAYER_SELECTOR) != null;
}

export const DateInput: FC<DateInputProps> = ({
  value,
  onChange,
  disabledDates,
  open: controlledOpen,
  onOpenChange,
  placeholder = 'ДД.ММ.ГГГГ',
  disabled = false,
  startAdornment,
  openCalendarLabel = 'Открыть календарь',
  onBlur,
  onFocus,
  onClick,
  pt,
  ...inputProps
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [text, setText] = useState(() => formatDate(value));
  const lastEmittedRef = useRef(value);
  const openFromInputRef = useRef(false);
  const suppressOpenOnFocusRef = useRef(false);

  const isOpenControlled
    = controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const setOpen = isOpenControlled ? onOpenChange : setInternalOpen;

  useEffect(() => {
    if (!datesEqual(value, lastEmittedRef.current)) {
      setText(formatDate(value));
      lastEmittedRef.current = value;
    }
  }, [value]);

  const emit = (date: Date | undefined) => {
    lastEmittedRef.current = date;
    onChange(date);
  };

  const handleTextChange = (next: string) => {
    setText(next);
    if (!next.trim()) {
      emit(undefined);
      return;
    }
    const parsed = parseDate(next);
    if (parsed) {
      emit(parsed);
    }
  };

  const handleBlur = () => {
    if (!text.trim()) {
      setText('');
      emit(undefined);
      return;
    }
    const parsed = parseDate(text);
    if (parsed) {
      setText(formatDate(parsed));
      emit(parsed);
      return;
    }
    setText(formatDate(value));
  };

  const suppressNextFocusOpen = () => {
    suppressOpenOnFocusRef.current = true;
    requestAnimationFrame(() => {
      suppressOpenOnFocusRef.current = false;
    });
  };

  const closeCalendar = () => {
    suppressNextFocusOpen();
    setOpen(false);
  };

  const openFromInput = () => {
    if (disabled) return;
    openFromInputRef.current = true;
    setOpen(true);
  };

  const handleSelect = (date: Date | undefined) => {
    setText(formatDate(date));
    emit(date);
    closeCalendar();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) return;
    if (nextOpen) {
      openFromInputRef.current = false;
      setOpen(true);
      return;
    }
    suppressNextFocusOpen();
    setOpen(false);
  };

  const handleInputBlur = (event: Parameters<NonNullable<DateInputProps['onBlur']>>[0]) => {
    handleBlur();
    pt?.input?.onBlur?.(event);
    onBlur?.(event);

    const next = event.relatedTarget;
    if (isCalendarLayer(next)) return;

    if (next == null) {
      requestAnimationFrame(() => {
        if (isCalendarLayer(document.activeElement)) return;
        closeCalendar();
      });
      return;
    }

    closeCalendar();
  };

  const trigger = startAdornment !== undefined
    ? startAdornment
    : (
      <IconButton
        type="button"
        icon={Calendar}
        variant="clear"
        color="neutral"
        size="sm"
        aria-label={openCalendarLabel}
        {...pt?.iconButton}
        disabled={disabled || pt?.iconButton?.disabled}
      />
    );

  return (
    <Input
      {...inputProps}
      value={text}
      onChange={handleTextChange}
      placeholder={placeholder}
      disabled={disabled}
      pt={{
        input: {
          autoComplete: 'off',
          ...pt?.input,
        },
      }}
      onFocus={(event) => {
        if (!suppressOpenOnFocusRef.current) {
          openFromInput();
        }
        pt?.input?.onFocus?.(event);
        onFocus?.(event);
      }}
      onClick={(event) => {
        openFromInput();
        pt?.input?.onClick?.(event);
        onClick?.(event);
      }}
      onBlur={handleInputBlur}
      startAdornment={(
        <DatePicker
          mode="single"
          value={value}
          onChange={handleSelect}
          open={open}
          onOpenChange={handleOpenChange}
          disabled={disabledDates}
          triggerProps={{
            ...pt?.trigger,
            ...{ 'data-date-input-trigger': '' },
          } as PopoverTriggerProps}
          positionerProps={{
            align: 'start',
            ...pt?.positioner,
          }}
          calendarProps={pt?.calendar}
          popupProps={{
            initialFocus: () => (openFromInputRef.current ? false : true),
            onMouseDown: (event) => {
              event.preventDefault();
            },
            ...{ 'data-date-input-popup': '' },
          } as PopoverPopupProps}
        >
          {trigger}
        </DatePicker>
      )}
    />
  );
};
