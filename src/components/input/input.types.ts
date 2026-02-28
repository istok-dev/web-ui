import { LucideIcon } from "lucide-react";

export type InputSize = 's' | 'm' | 'l';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startIcon?: LucideIcon;
  className?: string;
  inputClassName?: string;
  defaultSize?: InputSize;
  variant?: "neutral" | "solid" | "outline" | "opacity";
}
