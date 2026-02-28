import { MouseEvent } from "react";
import { LucideIcon, LucideProps } from "lucide-react";

export type TagSize = "s" | "m" | "l";
export type TagVariant =
  | "solid-brand"
  | "solid-neutral"
  | "solid-black"
  | "ghost-brand"
  | "ghost-neutral";

export interface TagProps {
  children: React.ReactNode;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void;
  closeIconProps?: LucideProps;
  className?: string;
  defaultSize?: TagSize;
  variant?: TagVariant;
}
