import { cn } from '@/utils/cn';

import type { DropdownItemFC, DropdownItemSize, DropdownItemVariant } from '../dropdown.type';

const sizeClassesMap: Record<DropdownItemSize, string> = {
  s: 'istok-dropdown-item--s',
  m: 'istok-dropdown-item--m',
  l: 'istok-dropdown-item--l',
};

const variantClassesMap: Record<DropdownItemVariant, string> = {
  brand: 'istok-dropdown-item--brand',
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
  defaultSize = 'm',
  variant = 'brand',
  classes,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
          istok-dropdown-item flex w-full items-center text-left
          transition-colors
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
        sizeClassesMap[defaultSize],
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
                text-(--istok-dropdown-item-start-icon)
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
                text-(--istok-dropdown-item-end-icon)
              `,
              endIconProps?.className,
            )}
          />
        </div>
      )}
    </button>
  );
};
