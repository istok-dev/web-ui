'use client';

import { Calendar } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { DatePicker } from '@/components/date-picker';
import { IconButton } from '@/components/icon-button';
import { Input } from '@/components/input';

import type { DateInputProps } from '../date-input.types';
import { datesEqual, formatDate, parseDate } from '../parse-date';

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
  pt,
  ...inputProps
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [text, setText] = useState(() => formatDate(value));
  const lastEmittedRef = useRef(value);

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

  const handleSelect = (date: Date | undefined) => {
    setText(formatDate(date));
    emit(date);
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) return;
    setOpen(nextOpen);
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
      onBlur={(event) => {
        handleBlur();
        pt?.input?.onBlur?.(event);
        onBlur?.(event);
      }}
      startAdornment={(
        <DatePicker
          mode="single"
          value={value}
          onChange={handleSelect}
          open={open}
          onOpenChange={handleOpenChange}
          disabled={disabledDates}
          triggerProps={pt?.trigger}
          positionerProps={{
            align: 'start',
            ...pt?.positioner,
          }}
          calendarProps={pt?.calendar}
        >
          {trigger}
        </DatePicker>
      )}
    />
  );
};
