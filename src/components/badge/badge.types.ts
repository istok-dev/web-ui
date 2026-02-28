import { ReactNode } from "react";
import { LucideIcon, LucideProps } from "lucide-react";

export type BadgeSize = "s" | "m" | "l";
export type BadgeVariant =
  | "solid-brand"
  | "solid-neutral"
  | "ghost-brand"
  | "ghost-neutral"
  | "opacity-brand"
  | "outline-brand";
export type BadgeShape = "square" | "rounded";

export interface BadgeProps {
  label: string;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  endAdornment?: ReactNode;
  className?: string;
  defaultSize?: BadgeSize;
  variant?: BadgeVariant;
  shape?: BadgeShape;
}
