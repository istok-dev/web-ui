'use client';

import { Calendar } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  pt,
  ...inputProps
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [text, setText] = useState(() => formatDate(value));
  const lastEmitted = useRef(value);

  const isOpenControlled
    = controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const setOpen = isOpenControlled ? onOpenChange : setInternalOpen;

  useEffect(() => {
    if (!datesEqual(value, lastEmitted.current)) {
      setText(formatDate(value));
      lastEmitted.current = value;
    }
  }, [value]);

  const emit = (date: Date | undefined) => {
    lastEmitted.current = date;
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

  const trigger = useMemo(() => {
    if (typeof startAdornment !== 'undefined') {
      return startAdornment;
    }

    return (
      <IconButton
        type="button"
        icon={Calendar}
        variant="clear"
        color="neutral"
        size="sm"
        aria-label="Открыть календарь"
        {...pt?.iconButton}
        disabled={disabled || pt?.iconButton?.disabled}
      />
    );
  }, [startAdornment, disabled, pt?.iconButton]);

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
          onBlur: (event) => {
            handleBlur();
            pt?.input?.onBlur?.(event);
          },
        },
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
