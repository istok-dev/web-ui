import React from "react";

import { cn } from "@/utils/cn";

import {
  BadgeProps,
  BadgeShape,
  BadgeSize,
  BadgeVariant,
} from "../badge.types";

const sizeClassesMap: Record<BadgeSize, string> = {
  s: "istok-badge--s",
  m: "istok-badge--m",
  l: "istok-badge--l",
};

const variantClassesMap: Record<BadgeVariant, string> = {
  "solid-brand": "istok-badge--solid-brand",
  "solid-neutral": "istok-badge--solid-neutral",
  "ghost-brand": "istok-badge--ghost-brand",
  "ghost-neutral": "istok-badge--ghost-neutral",
  "opacity-brand": "istok-badge--opacity-brand",
  "outline-brand": "istok-badge--outline-brand",
};

const shapeClassesMap: Record<BadgeShape, string> = {
  square: "istok-badge--square",
  rounded: "istok-badge--rounded",
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  startIcon: StartIcon,
  startIconProps,
  endAdornment,
  className,
  defaultSize = "m",
  variant = "solid-brand",
  shape = "square",
}) => {
  return (
    <div
      className={cn(
        "istok-badge flex items-center",
        "h-[var(--istok-badge-height)] gap-[var(--istok-badge-gap)]",
        "px-[var(--istok-badge-padding-inline)] py-[var(--istok-badge-padding-block)]",
        "rounded-[var(--istok-badge-radius)]",
        "text-(length:--istok-badge-font-size) leading-[var(--istok-badge-line-height)]",
        "bg-[var(--istok-badge-bg)] text-[var(--istok-badge-fg)]",
        "border-1 border-[var(--istok-badge-border-color)]",
        sizeClassesMap[defaultSize],
        variantClassesMap[variant],
        shapeClassesMap[shape],
        className
      )}
    >
      {StartIcon && (
        <StartIcon
          {...startIconProps}
          className={cn(
            "istok-badge-start-icon shrink-0",
            "size-[var(--istok-badge-icon-size)]",
            startIconProps?.className
          )}
        />
      )}
      {label}
      {endAdornment && (
        <span className="istok-badge-end-adornment">{endAdornment}</span>
      )}
    </div>
  );
};
