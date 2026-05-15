import { LucideIcon } from 'lucide-react';

export type InputSize = 's' | 'm' | 'l';

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startIcon?: LucideIcon;
  className?: string;
  inputClassName?: string;
  defaultSize?: InputSize;
  variant?: 'neutral' | 'solid' | 'outline' | 'opacity';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
