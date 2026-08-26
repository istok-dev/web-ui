import type { useRender } from '@base-ui/react/use-render';
import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';

export const BADGE_SIZES = ['sm', 'md', 'lg'] as const;
export const BADGE_VARIANTS = ['solid', 'ghost', 'inverse', 'outline'] as const;
export const BADGE_COLORS = ['primary', 'neutral', 'negative', 'warning', 'info', 'success', 'accent'] as const;
export const BADGE_SHAPES = ['square', 'rounded'] as const;

export type BadgeSize = (typeof BADGE_SIZES)[number];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export type BadgeColor = (typeof BADGE_COLORS)[number];
export type BadgeShape = (typeof BADGE_SHAPES)[number];

export type BadgeState = {
  size: BadgeSize;
  variant: BadgeVariant;
  color: BadgeColor;
  shape: BadgeShape;
  circle: boolean;
};

export type BadgeProps = useRender.ComponentProps<'div', BadgeState> & {
  label: string;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  endAdornment?: ReactNode;
  size?: BadgeSize;
  variant?: BadgeVariant;
  color?: BadgeColor;
  shape?: BadgeShape;
  /** Круглый бейдж без паддингов (иконка или число) */
  circle?: boolean;
};
