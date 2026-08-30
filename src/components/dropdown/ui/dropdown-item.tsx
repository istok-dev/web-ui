'use client';

import { cn } from '@/utils/cn';

import type { DropdownItemFC, DropdownItemSize, DropdownItemVariant } from '../dropdown.type';
import { useDropdownContext } from './dropdown-context';

const sizeClassesMap: Record<DropdownItemSize, string> = {
  sm: 'istok-dropdown-item--sm',
  md: 'istok-dropdown-item--md',
  lg: 'istok-dropdown-item--lg',
};

const variantClassesMap: Record<DropdownItemVariant, string> = {
  base: 'istok-dropdown-item--base',
  brand: 'istok-dropdown-item--brand',
  danger: 'istok-dropdown-item--danger',
};

export const DropdownItem: DropdownItemFC = ({
  label,
  startIcon: StartIcon,
  startIconProps,
  endIcon: EndIcon,
  endIconProps,
  onClick,
  className,
  disabled = false,
  size = 'md',
  variant = 'base',
  classes,
  closeOnClick = true,
  ...props
}) => {
  const { closeRoot } = useDropdownContext();

  return (
    <button
      {...props}
      type="button"
      onClick={() => {
        if (disabled) {
          return;
        }
        onClick?.();
        if (closeOnClick) {
          closeRoot();
        }
      }}
      disabled={disabled}
      className={cn(
        `
          flex w-full items-center rounded-(--istok-dropdown-item-radius)
          text-left font-medium transition-colors istok-dropdown-item
        `,
        `
          h-(--istok-dropdown-item-height) gap-(--istok-dropdown-item-gap)
          px-(--istok-dropdown-item-px) py-(--istok-dropdown-item-py)
        `,
        `bg-(--istok-dropdown-item-bg) text-(--istok-dropdown-item-fg)`,
        !disabled && [
          'cursor-pointer',
          `
            hover:bg-(--istok-dropdown-item-bg-hover)
            hover:text-(--istok-dropdown-item-fg-hover)
          `,
          `
            active:bg-(--istok-dropdown-item-bg-active)
            active:text-(--istok-dropdown-item-fg-active)
          `,
        ],
        { 'cursor-not-allowed opacity-50': disabled },
        sizeClassesMap[size],
        variantClassesMap[variant],
        className,
      )}
    >
      {StartIcon && (
        <div className="shrink-0">
          <StartIcon
            {...startIconProps}
            className={cn(
              'istok-dropdown-item__start-icon',
              `
                size-(--istok-dropdown-item-icon-size)
                text-(--istok-dropdown-item-icon-fg)
              `,
              startIconProps?.className,
            )}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col items-start">
        <span
          className={cn(
            'istok-dropdown-item__label w-full truncate',
            `
              text-(length:--istok-dropdown-item-label-font)
              leading-(--istok-dropdown-item-label-line-height)
            `,
            classes?.label,
          )}
        >
          {label}
        </span>
      </div>

      {EndIcon && (
        <div className="shrink-0">
          <EndIcon
            {...endIconProps}
            className={cn(
              'istok-dropdown-item-end-icon',
              `
                size-(--istok-dropdown-item-icon-size)
                text-(--istok-dropdown-item-icon-fg)
              `,
              endIconProps?.className,
            )}
          />
        </div>
      )}
    </button>
  );
};
