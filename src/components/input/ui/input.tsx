'use client';

import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { InputProps, InputSize } from '../input.types';

const sizeClassesMap: Record<InputSize, string> = {
  sm: 'istok-input--sm',
  md: 'istok-input--md',
  lg: 'istok-input--lg',
};

const variantClassesMap: Record<
  'neutral' | 'solid' | 'outline' | 'opacity',
  string
> = {
  neutral: 'istok-input__input--neutral',
  solid: 'istok-input__input--solid',
  outline: 'istok-input__input--outline',
  opacity: 'istok-input__input--opacity',
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  startAdornment,
  endAdornment,
  className,
  pt,
  placeholder,
  size = 'md',
  variant = 'neutral',
  startIcon: StartIcon,
  type = 'text',
  disabled = false,
  ...rootProps
}) => {
  return (
    <div
      {...rootProps}
      className={cn(
        'istok-input relative',
        sizeClassesMap[size],
        variantClassesMap[variant],
        className,
      )}
    >
      {startAdornment && (
        <div className="
          istok-input__start-adornment absolute top-1/2 z-10 -translate-y-1/2
        "
        >
          {startAdornment}
        </div>
      )}
      {StartIcon && (
        <StartIcon
          className={cn(
            `
              istok-input__start-icon absolute top-1/2 z-10 -translate-y-1/2
              text-(--istok-input-placeholder)
            `,
            `
              left-(--istok-input-start-icon-left)
              size-(--istok-input-start-icon-size)
            `,
          )}
        />
      )}
      <input
        {...pt?.input}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled || pt?.input?.disabled}
        className={cn(
          'istok-input__input w-full transition-all outline-none',
          `
            h-(--istok-input-height) rounded-(--istok-input-radius)
            py-(--istok-input-padding-y)
          `,
          {
            'pl-(--istok-input-pl-with-adornment)':
              Boolean(startAdornment) && !StartIcon,
            'pl-(--istok-input-pl-with-icon)': Boolean(StartIcon),
            'pl-(--istok-input-pl-default)': !startAdornment && !StartIcon,
            'pr-(--istok-input-pr-with-adornment)': Boolean(endAdornment),
            'pr-(--istok-input-pr-with-icon)':
              Boolean(StartIcon) && !endAdornment,
            'pr-(--istok-input-pr-default)': !endAdornment && !StartIcon,
          },
          `
            text-(length:--istok-input-font-size)
            leading-(--istok-input-line-height)
          `,
          'bg-(--istok-input-bg) text-(--istok-input-fg)',
          `
            [border-width:var(--istok-input-border-width)]
            border-(--istok-input-border-color)
          `,
          `focus:[border-width:1px] focus:border-(--istok-input-border-focus)`,
          'placeholder:text-(--istok-input-placeholder)',
          pt?.input?.className,
        )}
      />
      {endAdornment && (
        <div className="
          istok-input__end-adornment absolute top-1/2 right-4 z-10
          -translate-y-1/2
        "
        >
          {endAdornment}
        </div>
      )}
    </div>
  );
};
