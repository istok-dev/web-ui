import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type {
  BadgeColor,
  BadgeProps,
  BadgeShape,
  BadgeSize,
  BadgeState,
  BadgeVariant,
} from '../badge.types';

const sizeClassesMap: Record<BadgeSize, string> = {
  sm: 'istok-badge--sm',
  md: 'istok-badge--md',
  lg: 'istok-badge--lg',
};

const variantClassesMap: Record<BadgeVariant, string> = {
  solid: 'istok-badge--solid',
  ghost: 'istok-badge--ghost',
  opacity: 'istok-badge--opacity',
  outline: 'istok-badge--outline',
};

const colorClassesMap: Record<BadgeColor, string> = {
  primary: 'istok-badge--color-primary',
  neutral: 'istok-badge--color-neutral',
  negative: 'istok-badge--color-negative',
  warning: 'istok-badge--color-warning',
  info: 'istok-badge--color-info',
  success: 'istok-badge--color-success',
  accent: 'istok-badge--color-accent',
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
  size = 'md',
  variant = 'solid',
  color = 'primary',
  shape = 'square',
  circle = false,
  render,
  ...otherProps
}) => {
  const state: BadgeState = { size, variant, color, shape, circle };

  const defaultProps: useRender.ElementProps<'div'> = {
    className: cn(
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
      sizeClassesMap[size],
      colorClassesMap[color],
      variantClassesMap[variant],
      !circle && shapeClassesMap[shape],
      circle && [
        'istok-badge--circle w-(--istok-badge-height) justify-center',
      ],
      className,
    ),
    children: (
      <>
        {StartIcon && (
          <StartIcon
            {...startIconProps}
            className={cn(
              'istok-badge__start-icon shrink-0',
              'size-(--istok-badge-icon-size)',
              startIconProps?.className,
            )}
          />
        )}
        {label}
        {endAdornment && (
          <span
            className={cn(
              'istok-badge__end-adornment inline-flex shrink-0 items-center',
              'h-fit leading-none',
            )}
          >
            {endAdornment}
          </span>
        )}
      </>
    ),
  };

  return useRender({
    defaultTagName: 'div',
    render,
    state,
    props: mergeProps<'div'>(defaultProps, otherProps),
  });
};
