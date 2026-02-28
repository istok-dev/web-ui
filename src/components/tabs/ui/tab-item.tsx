import { cn } from "@/utils/cn";

import { TabItemFC, TabItemProps } from "../tabs.type";
import { useTabsContext } from "./tabs-context";

function TabItemComponent<T extends string>({
  value,
  label,
  startIcon: StartIcon,
  startIconProps,
  onClick,
  className,
  disabled = false,
  ...props
}: TabItemProps<T>) {
  const context = useTabsContext<T>();
  const isActive = context.value === value;

  const handleClick = () => {
    if (disabled) return;
    context.onValueChange?.(value);
    onClick?.();
  };

  return (
    <button
      {...props}
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "istok-tab-item",
        "flex items-center justify-center transition-all cursor-pointer relative",
        "h-[var(--istok-tabs-item-height)] px-[var(--istok-tabs-item-padding-inline)] py-[var(--istok-tabs-item-padding-block)]",
        "gap-[var(--istok-tabs-item-gap)] rounded-[var(--istok-tabs-item-radius)]",
        "bg-[var(--istok-tabs-item-bg)]",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0",
        "after:h-[var(--istok-tabs-item-line-underline-height)]",
        {
          "opacity-50 cursor-not-allowed": disabled,
          "istok-tab-item--active after:bg-[var(--istok-tabs-item-line-underline-color)]":
            isActive,
          "bg-[var(--istok-tabs-item-bg-active)]": isActive && !disabled,
          "bg-[var(--istok-tabs-item-bg-disabled-active)]":
            isActive && disabled,
          "bg-[var(--istok-tabs-item-bg-disabled)]": !isActive && disabled,
        },
        className
      )}
    >
      {/* Left Icon */}
      {StartIcon && (
        <div className="flex-shrink-0">
          <StartIcon
            {...startIconProps}
            className={cn(
              "istok-tab-item__start-icon",
              "size-[var(--istok-tabs-item-icon-size)]",
              !disabled &&
                !isActive &&
                "text-[var(--istok-tabs-item-icon-color)]",
              !disabled &&
                isActive &&
                "text-[var(--istok-tabs-item-icon-color-active)]",
              disabled &&
                !isActive &&
                "text-[var(--istok-tabs-item-icon-color-disabled)]",
              disabled &&
                isActive &&
                "text-[var(--istok-tabs-item-icon-color-disabled-active)]",
              startIconProps?.className
            )}
          />
        </div>
      )}

      {/* Text Content */}
      {label && (
        <div className="flex-1 flex flex-col items-start min-w-0">
          <span
            className={cn(
              "istok-tab-item__label truncate w-full",
              "text-(length:--istok-tabs-item-label-font-size) leading-[var(--istok-tabs-item-label-line-height)]",
              !disabled &&
                !isActive &&
                "text-[var(--istok-tabs-item-label-color)]",
              !disabled &&
                isActive &&
                "text-[var(--istok-tabs-item-label-color-active)]",
              disabled &&
                !isActive &&
                "text-[var(--istok-tabs-item-label-color-disabled)]",
              disabled &&
                isActive &&
                "text-[var(--istok-tabs-item-label-color-disabled-active)]"
            )}
          >
            {label}
          </span>
        </div>
      )}
    </button>
  );
}

export const TabItem = TabItemComponent as TabItemFC;
