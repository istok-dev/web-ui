import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

import type {
  MenuItemProps,
  MenuItemSize,
  MenuItemVariant,
  MenuSeparatorProps,
} from '../menu/menu.type';

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
  trigger?: ReactNode;
  className?: string;
  style?: CSSProperties;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  header?: ReactNode;
  classes?: Partial<Record<DropdownClasses, string>>;
  positionerProps?: {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'bottom' | 'left' | 'right';
    sideOffset?: number;
    alignOffset?: number;
    className?: string;
  };
}>;

export const DROPDOWN_SUBMENU_SIDES = ['left', 'right'] as const;

export type DropdownSubmenuSide = (typeof DROPDOWN_SUBMENU_SIDES)[number];

export type DropdownItemProps = MenuItemProps & {
  /**
   * Close dropdown after click.
   * @default true
   */
  closeOnClick?: boolean;
};

export type DropdownItemFC = {
  (props: DropdownItemProps): ReactNode;
};

export type DropdownSeparatorProps = MenuSeparatorProps;

export type DropdownSeparatorFC = {
  (props: DropdownSeparatorProps): ReactNode;
};

export type DropdownSubmenuProps = Omit<DropdownItemProps, 'endIcon' | 'endIconProps' | 'closeOnClick'> & {
  children: ReactNode;
  /** @default 'right' */
  side?: DropdownSubmenuSide;
  endIcon?: MenuItemProps['endIcon'];
  endIconProps?: MenuItemProps['endIconProps'];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

export type DropdownSubmenuFC = {
  (props: DropdownSubmenuProps): ReactNode;
};

export type DropdownItemSize = MenuItemSize;
export type DropdownItemVariant = MenuItemVariant;

export {
  MENU_ITEM_SIZES as DROPDOWN_ITEM_SIZES,
  MENU_ITEM_VARIANTS as DROPDOWN_ITEM_VARIANTS,
} from '../menu/menu.type';
