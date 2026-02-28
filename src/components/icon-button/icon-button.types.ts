import { LucideIcon, LucideProps } from "lucide-react";

export type IconButtonShape = "circle" | "square";
export type IconButtonVariant =
  | "primary"
  | "secondary"
  | "clear"
  | "clear-inverse"
  | "opacity";
export type Classes = "root" | "icon";
export type IconButtonSize = "s" | "m" | "l";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: LucideIcon;
  iconProps?: LucideProps;
  shape?: IconButtonShape;
  variant?: IconButtonVariant;
  loading?: boolean;
  defaultSize?: IconButtonSize;
  classes?: Record<Classes, string>;
}
