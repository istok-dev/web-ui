import { LucideIcon } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "clear"
  | "opacity"
  | "clear-inverse"
  | "neutral"
  | "outline"
  | "negative";
export type ButtonSize = "s" | "m" | "l";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: React.ReactNode;
  startIcon?: LucideIcon;
  iconSize?: number;
  variant?: ButtonVariant;
  loading?: boolean;
  defaultSize?: ButtonSize;
}
