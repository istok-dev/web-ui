"use client";

import React, { cloneElement, isValidElement } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { cn } from "@/utils/cn";
import { TooltipProps, TooltipPlacement } from "../tooltip.types";

const placementMap: Record<
  TooltipPlacement,
  {
    side: "top" | "bottom" | "left" | "right";
    align: "start" | "center" | "end";
  }
> = {
  top: { side: "top", align: "center" },
  "top-start": { side: "top", align: "start" },
  "top-end": { side: "top", align: "end" },
  bottom: { side: "bottom", align: "center" },
  "bottom-start": { side: "bottom", align: "start" },
  "bottom-end": { side: "bottom", align: "end" },
  left: { side: "left", align: "center" },
  right: { side: "right", align: "center" },
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  description,
  placement = "top",
  offset = 8,
  showArrow = true,
  open,
  onOpenChange,
  popupClassName,
  disabled = false,
  delay = 50,
}) => {
  const { side, align } = placementMap[placement];

  if (disabled || (!title && !description)) {
    return <>{children}</>;
  }

  return (
    <BaseTooltip.Root open={open} onOpenChange={onOpenChange}>
      <BaseTooltip.Trigger
        className={cn("istok-tooltip__trigger", "flex w-fit")}
        delay={delay}
        render={(triggerProps) => {
          if (isValidElement(children)) {
            const child = children as React.ReactElement;
            return cloneElement(child, {
              ...triggerProps,
              ...(child.props as Record<string, unknown>),
            });
          }
          return <button {...triggerProps}>{children}</button>;
        }}
      >
        {children}
      </BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} align={align} sideOffset={offset}>
          <BaseTooltip.Popup
            className={cn(
              "istok-tooltip",
              "bg-neutral-900 text-neutral-100",
              "py-4 px-4 rounded-xl max-w-[320px]",
              popupClassName
            )}
          >
            {showArrow && (
              <BaseTooltip.Arrow
                className={cn(
                  "istok-tooltip__arrow absolute w-2 h-2 fill-neutral-900",
                  "data-[side=top]:-bottom-1 data-[side=top]:rotate-45 data-[side=top]:bg-neutral-900",
                  "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=bottom]:bg-neutral-900",
                  "data-[side=left]:-right-1 data-[side=left]:rotate-45 data-[side=left]:bg-neutral-900",
                  "data-[side=right]:-left-1 data-[side=right]:rotate-45 data-[side=right]:bg-neutral-900"
                )}
              />
            )}
            <div className={cn("istok-tooltip__content flex flex-col gap-1")}>
              {title && (
                <div
                  className={cn(
                    "istok-tooltip__title font-medium text-control-m"
                  )}
                >
                  {title}
                </div>
              )}
              {description && (
                <div className={cn("istok-tooltip__description text-body-m")}>
                  {description}
                </div>
              )}
            </div>
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
};
