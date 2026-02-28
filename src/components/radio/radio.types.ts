import { PropsWithChildren, ReactNode } from "react";

export type RadioSize = "s" | "m" | "l";

export type RadioItemClasses = "root" | "label" | "description";

export interface RadioItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  description?: string;
  showInfoIcon?: boolean;
  onInfoClick?: () => void;
  className?: string;
  classes?: Partial<Record<RadioItemClasses, string>>;
}

export type RadioProps = PropsWithChildren<{
  defaultSize?: RadioSize;
  className?: string;
}>;

export type RadioItemFC = {
  (props: RadioItemProps): ReactNode;
};

export type RadioFC = {
  (props: RadioProps): ReactNode;
  Item: RadioItemFC;
};
