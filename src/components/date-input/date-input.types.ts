import type { PopoverTriggerProps } from '@base-ui/react/popover';
import type { DayPickerProps } from 'react-day-picker';

import type { CalendarProps } from '../calendar';
import type { IconButtonProps } from '../icon-button';
import type { InputPassThrough, InputProps } from '../input/input.types';

export type DateInputPassThrough = {
  /** Нативный input */
  input?: InputPassThrough['input'];
  /** Кнопка открытия календаря */
  iconButton?: Omit<IconButtonProps, 'icon' | 'type'>;
  /** Trigger DatePicker (Popover) */
  trigger?: PopoverTriggerProps;
  /** Positioner попапа календаря */
  positioner?: {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'bottom' | 'left' | 'right';
    sideOffset?: number;
    alignOffset?: number;
    className?: string;
  };
  /** Календарь (DayPicker) */
  calendar?: Omit<
    CalendarProps,
    | 'mode'
    | 'selected'
    | 'onSelect'
    | 'required'
    | 'disabled'
    | 'locale'
    | 'numberOfMonths'
  >;
};

export type DateInputProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'onChange' | 'type' | 'pt'
> & {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  /** Заблокированные даты в календаре */
  disabledDates?: DayPickerProps['disabled'];
  /** Управление открытием календаря */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** aria-label кнопки открытия календаря */
  openCalendarLabel?: string;
  pt?: DateInputPassThrough;
};
