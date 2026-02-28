import { cn } from "@/utils/cn";

import {
  DropdownItemFC,
  DropdownItemSize,
  DropdownItemVariant,
} from "../dropdown.type";

const sizeClassesMap: Record<DropdownItemSize, string> = {
  s: "istok-dropdown-item--s",
  m: "istok-dropdown-item--m",
  l: "istok-dropdown-item--l",
};

const variantClassesMap: Record<DropdownItemVariant, string> = {
  brand: "istok-dropdown-item--brand",
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
  defaultSize = "m",
  variant = "brand",
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
        "istok-dropdown-item w-full flex items-center text-left transition-colors",
        "h-[var(--istok-dropdown-item-height)] px-[var(--istok-dropdown-item-px)] py-[var(--istok-dropdown-item-py)] gap-[var(--istok-dropdown-item-gap)]",
        "bg-[var(--istok-dropdown-item-bg)] text-[var(--istok-dropdown-item-fg)]",
        !disabled && [
          "cursor-pointer",
          "hover:bg-[var(--istok-dropdown-item-bg-hover)] hover:text-[var(--istok-dropdown-item-fg-hover)]",
          "active:bg-[var(--istok-dropdown-item-bg-active)] active:text-[var(--istok-dropdown-item-fg-active)]",
        ],
        { "opacity-50 cursor-not-allowed": disabled },
        sizeClassesMap[defaultSize],
        variantClassesMap[variant],
        className
      )}
    >
      {StartIcon && (
        <div className="flex-shrink-0">
          <StartIcon
            {...startIconProps}
            className={cn(
              "istok-dropdown-item__start-icon",
              "size-[var(--istok-dropdown-item-icon-size)] text-[var(--istok-dropdown-item-start-icon)]",
              startIconProps?.className
            )}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col items-start min-w-0">
        <span
          className={cn(
            "istok-dropdown-item__label truncate w-full",
            "text-[length:var(--istok-dropdown-item-label-font)] leading-[var(--istok-dropdown-item-label-line-height)]",
            classes?.label
          )}
        >
          {label}
        </span>
      </div>

      {EndIcon && (
        <div className="flex-shrink-0">
          <EndIcon
            {...endIconProps}
            className={cn(
              "istok-dropdown-item-end-icon",
              "size-[var(--istok-dropdown-item-icon-size)] text-[var(--istok-dropdown-item-end-icon)]",
              endIconProps?.className
            )}
          />
        </div>
      )}
    </button>
  );
};
