import { Button as BaseButton } from '@base-ui/react/button';
import { Loader2 } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from '../button.types';

const sizeClassesMap: Record<ButtonSize, string> = {
  sm: 'istok-button--sm',
  md: 'istok-button--md',
  lg: 'istok-button--lg',
  xl: 'istok-button--xl',
};

const colorClassesMap: Record<ButtonColor, string> = {
  primary: 'istok-button--color-primary',
  neutral: 'istok-button--color-neutral',
  base: 'istok-button--color-base',
  negative: 'istok-button--color-negative',
  warning: 'istok-button--color-warning',
  info: 'istok-button--color-info',
  success: 'istok-button--color-success',
  accent: 'istok-button--color-accent',
};

const variantClassesMap: Record<ButtonVariant, string> = {
  'primary': 'istok-button--primary',
  'secondary': 'istok-button--secondary',
  'clear': 'istok-button--clear',
  'text': 'istok-button--text',
  'clear-inverse': 'istok-button--clear-inverse',
  'opacity': 'istok-button--opacity',
  'outline': 'istok-button--outline',
  'gradient': 'istok-button--gradient',
};

export const Button: FC<ButtonProps> = ({
  children,
  startIcon: StartIcon,
  className,
  variant = 'primary',
  color = 'primary',
  disabled = false,
  loading = false,
  size = 'md',
  rounded = false,
  type = 'button',
  render,
  classes,
  nativeButton,
  ref,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <BaseButton
      {...rest}
      ref={ref}
      render={render}
      nativeButton={nativeButton ?? render === undefined}
      disabled={isDisabled}
      type={type}
      className={cn(
        'istok-button',
        'inline-flex items-center justify-center whitespace-nowrap',
        'transition-all',
        `px-(--istok-button-padding-inline) py-(--istok-button-padding-block)`,
        'h-(--istok-button-height) rounded-(--istok-button-radius)',
        'gap-(--istok-button-gap)',
        `
          text-(length:--istok-button-font-size)
          leading-(--istok-button-line-height) font-(--istok-button-font-weight)
          tracking-(--istok-button-letter-spacing)
        `,
        'border',
        !isDisabled && [
          'cursor-pointer',
          'bg-(--istok-button-bg) text-(--istok-button-fg)',
          'border-(--istok-button-border-color)',
          `
            hover:border-(--istok-button-border-color-hover)
            hover:bg-(--istok-button-bg-hover)
            hover:text-(--istok-button-fg-hover)
          `,
          `
            active:border-(--istok-button-border-color-active)
            active:bg-(--istok-button-bg-active)
            active:text-(--istok-button-fg-active)
          `,
        ],
        isDisabled && [
          'cursor-not-allowed opacity-100',
          `
            border-(--istok-button-border-color-disabled)
            bg-(--istok-button-bg-disabled) text-(--istok-button-fg-disabled)
          `,
        ],
        {
          'rounded-full': rounded,
        },
        sizeClassesMap[size],
        colorClassesMap[color],
        variantClassesMap[variant],
        classes?.root,
        className,
      )}
    >
      {loading
        ? (
          <Loader2
            className={cn(
              'istok-button__icon animate-spin',
              'size-(--istok-button-icon-size)',
              classes?.icon,
            )}
          />
        )
        : (
          StartIcon && (
            <StartIcon
              className={cn(
                'istok-button__icon',
                'size-(--istok-button-icon-size)',
                classes?.icon,
              )}
            />
          )
        )}
      {children}
    </BaseButton>
  );
};
