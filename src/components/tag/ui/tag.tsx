import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { X } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { TagColor, TagProps, TagSize, TagState, TagVariant } from '../tag.types';

const sizeClassesMap: Record<TagSize, string> = {
  sm: 'istok-tag--sm',
  md: 'istok-tag--md',
  lg: 'istok-tag--lg',
};

const variantClassesMap: Record<TagVariant, string> = {
  solid: 'istok-tag--solid',
  ghost: 'istok-tag--ghost',
  outline: 'istok-tag--outline',
};

const colorClassesMap: Record<TagColor, string> = {
  primary: 'istok-tag--color-primary',
  neutral: 'istok-tag--color-neutral',
  negative: 'istok-tag--color-negative',
  warning: 'istok-tag--color-warning',
  info: 'istok-tag--color-info',
  success: 'istok-tag--color-success',
  accent: 'istok-tag--color-accent',
};

export const Tag: FC<TagProps> = ({
  children,
  startIcon: StartIcon,
  startIconProps,
  onRemove,
  endIconProps,
  classes,
  className,
  size = 'md',
  variant = 'solid',
  color = 'primary',
  render,
  ...otherProps
}) => {
  const state: TagState = { size, variant, color };

  const defaultProps: useRender.ElementProps<'div'> = {
    className: cn(
      'istok-tag flex items-center',
      'h-(--istok-tag-height) gap-(--istok-tag-gap)',
      `px-(--istok-tag-padding-inline) py-(--istok-tag-padding-block)`,
      'rounded-(--istok-tag-radius)',
      `
        text-(length:--istok-tag-font-size) leading-(--istok-tag-line-height)
        font-[number:var(--istok-tag-font-weight)]
      `,
      'bg-(--istok-tag-bg) text-(--istok-tag-fg)',
      'border border-(--istok-tag-border-color)',
      sizeClassesMap[size],
      colorClassesMap[color],
      variantClassesMap[variant],
      classes?.root,
      className,
    ),
    children: (
      <>
        {StartIcon && (
          <StartIcon
            {...startIconProps}
            className={cn(
              'istok-tag__start-icon shrink-0',
              'size-(--istok-tag-icon-size)',
              startIconProps?.className,
              classes?.startIcon,
            )}
          />
        )}
        <span className={cn('istok-tag__content', classes?.content)}>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              `
                istok-tag__close-button flex cursor-pointer items-center
                justify-center
              `,
              `
                text-(--istok-tag-close-fg) transition-opacity
                hover:opacity-80
              `,
              'size-(--istok-tag-icon-size)',
              endIconProps?.className,
              classes?.endIcon,
            )}
            aria-label="Remove tag"
          >
            <X
              {...endIconProps}
              className={cn(
                'istok-tag__close-icon size-(--istok-tag-icon-size)',
              )}
            />
          </button>
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
