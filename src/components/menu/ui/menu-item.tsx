import { cn } from '@/utils/cn';

import type { MenuItemFC, MenuItemSize, MenuItemVariant } from '../menu.type';

const sizeClassesMap: Record<MenuItemSize, string> = {
  sm: 'istok-menu-item--sm',
  md: 'istok-menu-item--md',
  lg: 'istok-menu-item--lg',
};

const variantClassesMap: Record<MenuItemVariant, string> = {
  base: 'istok-menu-item--base',
  brand: 'istok-menu-item--brand',
  danger: 'istok-menu-item--danger',
};

export const MenuItem: MenuItemFC = ({
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
          istok-menu-item flex w-full items-center
          rounded-(--istok-menu-item-radius) text-left font-medium
          transition-colors
        `,
        `
          h-(--istok-menu-item-height) gap-(--istok-menu-item-gap)
          px-(--istok-menu-item-px) py-(--istok-menu-item-py)
        `,
        `bg-(--istok-menu-item-bg) text-(--istok-menu-item-fg)`,
        !disabled && [
          'cursor-pointer',
          `
            hover:bg-(--istok-menu-item-bg-hover)
            hover:text-(--istok-menu-item-fg-hover)
          `,
          `
            active:bg-(--istok-menu-item-bg-active)
            active:text-(--istok-menu-item-fg-active)
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
              'istok-menu-item__start-icon',
              `
                size-(--istok-menu-item-icon-size)
                text-(--istok-menu-item-icon-fg)
              `,
              startIconProps?.className,
            )}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col items-start">
        <span
          className={cn(
            'istok-menu-item__label w-full truncate',
            `
              text-(length:--istok-menu-item-label-font)
              leading-(--istok-menu-item-label-line-height)
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
              'istok-menu-item__end-icon',
              `
                size-(--istok-menu-item-icon-size)
                text-(--istok-menu-item-icon-fg)
              `,
              endIconProps?.className,
            )}
          />
        </div>
      )}
    </button>
  );
};
