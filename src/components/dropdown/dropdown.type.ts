import type { LucideIcon, LucideProps } from 'lucide-react';
import type { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type DropdownFC = {
  (props: DropdownProps): ReactNode;
  Item: DropdownItemFC;
  Separator: DropdownSeparatorFC;
  Submenu: DropdownSubmenuFC;
};

type DropdownClasses = 'header';

/** Below `--breakpoint-tablet` (768px). */
export const DROPDOWN_MOBILE_MEDIA_QUERY = '(max-width: 767px)';

export type DropdownProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  /** Controlled open state. With `onOpenChange`, enables adaptive panel / BottomSheet. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Optional header above items, separated by a border. */
  header?: ReactNode;
  classes?: Partial<Record<DropdownClasses, string>>;
}>;

export const DROPDOWN_ITEM_SIZES = ['sm', 'md', 'lg'] as const;
export const DROPDOWN_ITEM_VARIANTS = ['base', 'brand', 'danger'] as const;
export const DROPDOWN_SUBMENU_SIDES = ['left', 'right'] as const;

export type DropdownItemSize = (typeof DROPDOWN_ITEM_SIZES)[number];
export type DropdownItemVariant = (typeof DROPDOWN_ITEM_VARIANTS)[number];
export type DropdownSubmenuSide = (typeof DROPDOWN_SUBMENU_SIDES)[number];
export type DropdownItemClasses = 'label';

export type DropdownItemProps = HTMLAttributes<HTMLButtonElement> & {
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
  /**
   * Close the root dropdown / sheet after click.
   * @default true
   */
  closeOnClick?: boolean;
};

export type DropdownItemFC = {
  (props: DropdownItemProps): ReactNode;
};

export type DropdownSeparatorProps = HTMLAttributes<HTMLDivElement>;

export type DropdownSeparatorFC = {
  (props: DropdownSeparatorProps): ReactNode;
};

export type DropdownSubmenuProps = Omit<DropdownItemProps, 'endIcon' | 'endIconProps' | 'closeOnClick'> & {
  children: ReactNode;
  /** @default 'right' */
  side?: DropdownSubmenuSide;
  endIcon?: LucideIcon;
  endIconProps?: LucideProps;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

export type DropdownSubmenuFC = {
  (props: DropdownSubmenuProps): ReactNode;
};
