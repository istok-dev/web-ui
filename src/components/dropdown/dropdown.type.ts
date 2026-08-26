import type { LucideIcon, LucideProps } from 'lucide-react';
import type { PropsWithChildren } from 'react';

export type DropdownFC = {
  (props: DropdownProps): React.ReactNode;
  Item: DropdownItemFC;
};

export type DropdownProps = PropsWithChildren<{
  className?: string;
}>;

export type DropdownItemSize = 'sm' | 'md' | 'lg';
export type DropdownItemVariant = 'brand';
export type DropdownItemClasses = 'label';

export type DropdownItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  endIcon?: LucideIcon;
  endIconProps?: LucideProps;
  variant?: DropdownItemVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: DropdownItemSize;
  classes?: Partial<Record<DropdownItemClasses, string>>;
};

export type DropdownItemFC = {
  (props: DropdownItemProps): React.ReactNode;
};
