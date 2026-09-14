'use client';

import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type {
  TextareaProps,
  TextareaSize,
  TextareaVariant,
} from '../textarea.types';

const sizeClassesMap: Record<TextareaSize, string> = {
  sm: 'istok-textarea--sm',
  md: 'istok-textarea--md',
  lg: 'istok-textarea--lg',
  xl: 'istok-textarea--xl',
};

const variantClassesMap: Record<TextareaVariant, string> = {
  neutral: 'istok-textarea--neutral',
  solid: 'istok-textarea--solid',
  filled: 'istok-textarea--filled',
};

const resizeClassesMap = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

export const Textarea: FC<TextareaProps> = ({
  value,
  onChange,
  className,
  size = 'md',
  variant = 'neutral',
  rows = 3,
  resize = 'vertical',
  placeholder,
  disabled = false,
  id,
  name,
  readOnly,
  maxLength,
  pt,
  ...rootProps
}) => {
  return (
    <div
      {...rootProps}
      className={cn(
        'istok-textarea',
        sizeClassesMap[size],
        variantClassesMap[variant],
        className,
      )}
    >
      <textarea
        {...pt?.textarea}
        id={id}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        className={cn(
          'istok-textarea__field w-full transition-colors outline-none',
          'rounded-(--istok-textarea-radius)',
          'min-h-(--istok-textarea-min-height)',
          'px-(--istok-textarea-padding-x) py-(--istok-textarea-padding-y)',
          `
            text-(length:--istok-textarea-font-size)
            leading-(--istok-textarea-line-height)
          `,
          'bg-(--istok-textarea-bg) text-(--istok-textarea-fg)',
          `
            [border-width:var(--istok-textarea-border-width)]
            border-(--istok-textarea-border-color)
          `,
          !disabled && 'hover:bg-(--istok-textarea-bg-hover)',
          `
            focus:border-(--istok-textarea-border-focus)
            focus:bg-(--istok-textarea-bg-focus)
            focus:[box-shadow:var(--istok-textarea-focus-shadow)]
          `,
          `aria-invalid:[box-shadow:inset_0_0_0_2px_var(--color-negative-500)]`,
          'placeholder:text-(--istok-textarea-placeholder)',
          'disabled:cursor-not-allowed disabled:opacity-100',
          resizeClassesMap[resize],
          pt?.textarea?.className,
        )}
      />
    </div>
  );
};
