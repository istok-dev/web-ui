import { Button as BaseButton } from '@base-ui/react/button';
import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithRef } from 'react';

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'clear',
  'text',
  'opacity',
  'clear-inverse',
  'outline',
  'gradient',
] as const;
export const BUTTON_COLORS = [
  'primary',
  'neutral',
  'base',
  'negative',
  'warning',
  'info',
  'success',
  'accent',
] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonColor = (typeof BUTTON_COLORS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export type Classes = 'root' | 'icon';

export type ButtonProps = {
  children?: React.ReactNode;
  startIcon?: LucideIcon;
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
  size?: ButtonSize;
  rounded?: boolean;
  classes?: Record<Classes, string>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'ref'>
& Pick<ComponentPropsWithRef<typeof BaseButton>, 'ref' | 'nativeButton' | 'render'>;
