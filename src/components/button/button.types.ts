import { Button as BaseButton } from '@base-ui/react/button';
import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithRef } from 'react';

export type ButtonVariant
  = | 'primary'
    | 'secondary'
    | 'clear'
    | 'text'
    | 'opacity'
    | 'clear-inverse'
    | 'outline';

export type ButtonColor
  = | 'primary'
    | 'neutral'
    | 'negative'
    | 'warning'
    | 'info'
    | 'success'
    | 'accent';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

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
