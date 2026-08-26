export type NumberInputSize = 'sm' | 'md' | 'lg';

export type NumberInputVariant = 'neutral' | 'solid' | 'outline';

export type Classes = 'root' | 'group' | 'input';

export type NumberInputProps = {
  value?: number | null;
  onValueChange?: (value: number | null) => void;
  defaultValue?: number;
  /** Суффикс (например, единица измерения "P", "₽") */
  suffix?: React.ReactNode;
  className?: string;
  size?: NumberInputSize;
  variant?: NumberInputVariant;
  /** Состояние ошибки (красная обводка) */
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number | 'any';
  smallStep?: number;
  largeStep?: number;
  placeholder?: string;
  name?: string;
  id?: string;
  locale?: Intl.LocalesArgument;
  format?: Intl.NumberFormatOptions;
  allowWheelScrub?: boolean;
  snapOnStep?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onValueCommitted?: (value: number | null) => void;
  classes?: Record<Classes, string>;
};
