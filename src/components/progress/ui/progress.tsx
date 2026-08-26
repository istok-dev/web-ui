import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { ProgressColor, ProgressProps } from '../progress.types';

const colorClassesMap: Record<ProgressColor, string> = {
  primary: 'istok-progress--color-primary',
  accent: 'istok-progress--color-accent',
  success: 'istok-progress--color-success',
  warning: 'istok-progress--color-warning',
  info: 'istok-progress--color-info',
  negative: 'istok-progress--color-negative',
  neutral: 'istok-progress--color-neutral',
};

export const Progress: FC<ProgressProps> = ({
  value,
  label,
  color = 'primary',
  className,
  classes,
  ...rootProps
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      {...rootProps}
      className={cn(
        'istok-progress flex items-center gap-3',
        colorClassesMap[color],
        className,
        classes?.root,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          `
            istok-progress__track min-w-0 flex-1 overflow-hidden rounded-full
            h-(--istok-progress-height) bg-(--istok-progress-track)
          `,
          classes?.track,
        )}
      >
        <div
          className={cn(
            `
              istok-progress__fill h-full rounded-full
              bg-(--istok-progress-fill)
            `,
            classes?.fill,
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {label != null && label !== false && (
        <span
          className={cn(
            `
              istok-progress__label shrink-0 text-[13px]/4.5 tracking-[-0.15px]
              text-neutral-800
            `,
            classes?.label,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};
