import { LucideIcon, LucideProps } from "lucide-react";
import { PropsWithChildren } from "react";

export type TabsFC = {
  <T extends string = string>(props: TabsProps<T>): React.ReactNode;
  Item: TabItemFC;
};

export type TabsProps<T extends string> = PropsWithChildren<{
  className?: string;
  size?: TabItemSize;
  variant?: TabItemVariant;
  value?: T;
  onValueChange?: (value: T) => void;
}>;

export type TabItemSize = "s" | "m" | "l";
export type TabItemVariant = "line" | "ghost" | "solid";

export type TabItemProps<T extends string> = React.HTMLAttributes<HTMLButtonElement> & {
  value: T;
  label?: string;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export type TabItemFC = {
  <T extends string = string>(props: TabItemProps<T>): React.ReactNode;
};
