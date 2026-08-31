import type { LucideIcon, LucideProps } from 'lucide-react';
import type { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type MenuFC = {
  (props: MenuProps): ReactNode;
  Item: MenuItemFC;
  Separator: MenuSeparatorFC;
};

type MenuClasses = 'header';

export type MenuProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  header?: ReactNode;
  classes?: Partial<Record<MenuClasses, string>>;
  /** Without popup surface styles */
  unstyled?: boolean;
}>;

export const MENU_ITEM_SIZES = ['sm', 'md', 'lg'] as const;
export const MENU_ITEM_VARIANTS = ['base', 'brand', 'danger'] as const;

export type MenuItemSize = (typeof MENU_ITEM_SIZES)[number];
export type MenuItemVariant = (typeof MENU_ITEM_VARIANTS)[number];
export type MenuItemClasses = 'label';

export type MenuItemProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  endIcon?: LucideIcon;
  endIconProps?: LucideProps;
  variant?: MenuItemVariant;
  onClick?: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  size?: MenuItemSize;
  classes?: Partial<Record<MenuItemClasses, string>>;
};

export type MenuItemFC = {
  (props: MenuItemProps): ReactNode;
};

export type MenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export type MenuSeparatorFC = {
  (props: MenuSeparatorProps): ReactNode;
};
