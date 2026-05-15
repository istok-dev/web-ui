import { ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { LucideIcon, LucideProps } from 'lucide-react';

export type IconButtonShape = 'circle' | 'square';
export type IconButtonVariant
  = | 'primary'
    | 'secondary'
    | 'clear'
    | 'clear-inverse'
    | 'opacity';
export type IconButtonColor
  = | 'primary'
    | 'neutral'
    | 'negative'
    | 'warning'
    | 'info'
    | 'success'
    | 'accent';
export type Classes = 'root' | 'icon';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = {
  icon: LucideIcon;
  iconProps?: LucideProps;
  shape?: IconButtonShape;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  loading?: boolean;
  size?: IconButtonSize;
  classes?: Record<Classes, string>;
  render?: BaseButtonProps['render'];
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
