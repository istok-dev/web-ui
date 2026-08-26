import type { ReactNode } from 'react';

export const PROGRESS_COLORS = [
  'primary',
  'accent',
  'success',
  'warning',
  'info',
  'negative',
  'neutral',
] as const;

export type ProgressColor = (typeof PROGRESS_COLORS)[number];

export type ProgressClasses = 'root' | 'track' | 'fill' | 'label';

export type ProgressProps = {
  /** Значение 0–100 */
  value: number;
  label?: ReactNode;
  color?: ProgressColor;
  className?: string;
  classes?: Partial<Record<ProgressClasses, string>>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
