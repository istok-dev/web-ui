import type { Button as BaseButton } from '@base-ui/react/button';
import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ComponentPropsWithRef } from 'react';

export const ICON_BUTTON_COLORS = [
  'primary',
  'neutral',
  'base',
  'negative',
  'warning',
  'info',
  'success',
  'accent',
] as const;
export const ICON_BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'clear',
  'clear-inverse',
  'opacity',
] as const;
export const ICON_BUTTON_SHAPES = ['circle', 'square'] as const;
export const ICON_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type IconButtonShape = (typeof ICON_BUTTON_SHAPES)[number];
export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];
export type IconButtonColor = (typeof ICON_BUTTON_COLORS)[number];
export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number];

export type Classes = 'root' | 'icon';

export type IconButtonProps = {
  icon: LucideIcon;
  iconProps?: LucideProps;
  shape?: IconButtonShape;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  loading?: boolean;
  size?: IconButtonSize;
  classes?: Partial<Record<Classes, string>>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'ref'>
& Pick<ComponentPropsWithRef<typeof BaseButton>, 'ref' | 'nativeButton' | 'render'>;
