import type { useRender } from '@base-ui/react/use-render';
import type { LucideIcon, LucideProps } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';

export const TAG_SIZES = ['sm', 'md', 'lg'] as const;
export const TAG_VARIANTS = ['solid', 'ghost', 'outline', 'soft'] as const;
export const TAG_COLORS = ['primary', 'neutral', 'negative', 'warning', 'info', 'success', 'accent'] as const;

export type Classes = 'root' | 'startIcon' | 'endIcon' | 'content';

export type TagSize = (typeof TAG_SIZES)[number];
export type TagVariant = (typeof TAG_VARIANTS)[number];
export type TagColor = (typeof TAG_COLORS)[number];

export type TagState = {
  size: TagSize;
  variant: TagVariant;
  color: TagColor;
};

export type TagProps = Omit<useRender.ComponentProps<'div', TagState>, 'children'> & {
  children: ReactNode;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  endIconProps?: LucideProps;
  size?: TagSize;
  variant?: TagVariant;
  color?: TagColor;
  classes?: Partial<Record<Classes, string>>;
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
};
