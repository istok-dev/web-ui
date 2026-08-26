import type { LucideIcon } from 'lucide-react';

export const INPUT_SIZES = ['sm', 'md', 'lg'] as const;
export const INPUT_VARIANTS = ['neutral', 'solid', 'outline', 'opacity'] as const;

export type InputSize = (typeof INPUT_SIZES)[number];
export type InputVariant = (typeof INPUT_VARIANTS)[number];

export type InputPassThrough = {
  input?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;
};

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startIcon?: LucideIcon;
  className?: string;
  size?: InputSize;
  variant?: InputVariant;
  pt?: InputPassThrough;
}
& Pick<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'disabled' | 'type'>
& Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
