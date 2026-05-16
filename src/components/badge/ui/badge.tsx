import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { BadgeProps, BadgeShape, BadgeSize, BadgeVariant } from '../badge.types';

const sizeClassesMap: Record<BadgeSize, string> = {
  s: 'istok-badge--s',
  m: 'istok-badge--m',
  l: 'istok-badge--l',
};

const variantClassesMap: Record<BadgeVariant, string> = {
  'solid-brand': 'istok-badge--solid-brand',
  'solid-neutral': 'istok-badge--solid-neutral',
  'ghost-brand': 'istok-badge--ghost-brand',
  'ghost-neutral': 'istok-badge--ghost-neutral',
  'opacity-brand': 'istok-badge--opacity-brand',
  'outline-brand': 'istok-badge--outline-brand',
};

const shapeClassesMap: Record<BadgeShape, string> = {
  square: 'istok-badge--square',
  rounded: 'istok-badge--rounded',
};

export const Badge: FC<BadgeProps> = ({
  label,
  startIcon: StartIcon,
  startIconProps,
  endAdornment,
  className,
  defaultSize = 'm',
  variant = 'solid-brand',
  shape = 'square',
}) => {
  return (
    <div
      className={cn(
        'istok-badge flex items-center',
        'h-(--istok-badge-height) gap-(--istok-badge-gap)',
        `px-(--istok-badge-padding-inline) py-(--istok-badge-padding-block)`,
        'rounded-(--istok-badge-radius)',
        `
          text-(length:--istok-badge-font-size)
          leading-(--istok-badge-line-height)
        `,
        'bg-(--istok-badge-bg) text-(--istok-badge-fg)',
        'border border-(--istok-badge-border-color)',
        sizeClassesMap[defaultSize],
        variantClassesMap[variant],
        shapeClassesMap[shape],
        className,
      )}
    >
      {StartIcon && (
        <StartIcon
          {...startIconProps}
          className={cn(
            'istok-badge-start-icon shrink-0',
            'size-(--istok-badge-icon-size)',
            startIconProps?.className,
          )}
        />
      )}
      {label}
      {endAdornment && (
        <span className="istok-badge-end-adornment">{endAdornment}</span>
      )}
    </div>
  );
};
