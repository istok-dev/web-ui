import React from "react";
import { X } from "lucide-react";

import { cn } from "@/utils/cn";

import { TagProps, TagSize, TagVariant } from "../tag.types";

const sizeClassesMap: Record<TagSize, string> = {
  s: "istok-tag--s",
  m: "istok-tag--m",
  l: "istok-tag--l",
};

const variantClassesMap: Record<TagVariant, string> = {
  "solid-brand": "istok-tag--solid-brand",
  "solid-neutral": "istok-tag--solid-neutral",
  "solid-black": "istok-tag--solid-black",
  "ghost-brand": "istok-tag--ghost-brand",
  "ghost-neutral": "istok-tag--ghost-neutral",
};

export const Tag: React.FC<TagProps> = ({
  children,
  startIcon: StartIcon,
  startIconProps,
  onClose,
  closeIconProps,
  className,
  defaultSize = "m",
  variant = "solid-brand",
}) => {
  return (
    <div
      className={cn(
        "istok-tag flex items-center",
        "h-[var(--istok-tag-height)] gap-[var(--istok-tag-gap)]",
        "px-[var(--istok-tag-padding-inline)] py-[var(--istok-tag-padding-block)]",
        "rounded-[var(--istok-tag-radius)]",
        "text-(length:--istok-tag-font-size) leading-[var(--istok-tag-line-height)]",
        "bg-[var(--istok-tag-bg)] text-[var(--istok-tag-fg)]",
        sizeClassesMap[defaultSize],
        variantClassesMap[variant],
        className
      )}
    >
      {StartIcon && (
        <StartIcon
          {...startIconProps}
          className={cn(
            "istok-tag__start-icon shrink-0",
            "size-[var(--istok-tag-icon-size)]",
            startIconProps?.className
          )}
        />
      )}
      <span className="istok-tag__content">{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "istok-tag__close-button flex items-center justify-center cursor-pointer",
            "text-[var(--istok-tag-close-fg)] hover:opacity-80 transition-opacity",
            "size-[var(--istok-tag-icon-size)]"
          )}
          aria-label="Remove tag"
        >
          <X
            {...closeIconProps}
            className={cn(
              "istok-tag__close-icon size-[var(--istok-tag-icon-size)]",
              closeIconProps?.className
            )}
          />
        </button>
      )}
    </div>
  );
};
