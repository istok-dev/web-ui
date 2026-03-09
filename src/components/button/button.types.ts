import { LucideIcon } from "lucide-react";
import { ButtonProps as BaseButtonProps } from "@base-ui/react/button";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "clear"
  | "text"
  | "opacity"
  | "clear-inverse"
  | "outline";

export type ButtonColor =
  | "primary"
  | "neutral"
  | "negative"
  | "warning"
  | "info"
  | "success"
  | "accent";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type Classes = "root" | "icon";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: React.ReactNode;
  startIcon?: LucideIcon;
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
  size?: ButtonSize;
  rounded?: boolean;
  render?: BaseButtonProps["render"];
  classes?: Record<Classes, string>;
}
