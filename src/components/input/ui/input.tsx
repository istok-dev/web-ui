"use client";

import React from "react";

import { cn } from "@/utils/cn";

import { InputProps, InputSize } from "../input.types";

const sizeClassesMap: Record<InputSize, string> = {
  s: "istok-input--s",
  m: "istok-input--m",
  l: "istok-input--l",
};

const variantClassesMap: Record<
  "neutral" | "solid" | "outline" | "opacity",
  string
> = {
  neutral: "istok-input__input--neutral",
  solid: "istok-input__input--solid",
  outline: "istok-input__input--outline",
  opacity: "istok-input__input--opacity",
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  startAdornment,
  endAdornment,
  className,
  inputClassName,
  placeholder,
  defaultSize = "m",
  variant = "neutral",
  startIcon: StartIcon,
  ...inputProps
}) => {
  return (
    <div
      className={cn(
        "istok-input relative",
        sizeClassesMap[defaultSize],
        variantClassesMap[variant],
        className
      )}
    >
      {startAdornment && (
        <div className="istok-input__start-adornment absolute top-1/2 -translate-y-1/2 z-10">
          {startAdornment}
        </div>
      )}
      {StartIcon && (
        <StartIcon
          className={cn(
            "istok-input__start-icon absolute top-1/2 -translate-y-1/2 z-10 text-[var(--istok-input-placeholder)]",
            "size-[var(--istok-input-start-icon-size)] left-[var(--istok-input-start-icon-left)]"
          )}
        />
      )}
      <input
        {...inputProps}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "istok-input__input w-full outline-none transition-all",
          "h-[var(--istok-input-height)] py-[var(--istok-input-padding-y)] rounded-[var(--istok-input-radius)]",
          {
            "pl-[var(--istok-input-pl-with-adornment)]":
              Boolean(startAdornment) && !StartIcon,
            "pl-[var(--istok-input-pl-with-icon)]": Boolean(StartIcon),
            "pl-[var(--istok-input-pl-default)]": !startAdornment && !StartIcon,
            "pr-[var(--istok-input-pr-with-adornment)]": Boolean(endAdornment),
            "pr-[var(--istok-input-pr-with-icon)]":
              Boolean(StartIcon) && !endAdornment,
            "pr-[var(--istok-input-pr-default)]": !endAdornment && !StartIcon,
          },
          "text-(length:--istok-input-font-size) leading-[var(--istok-input-line-height)]",
          "bg-[var(--istok-input-bg)] text-[var(--istok-input-fg)]",
          "[border-width:var(--istok-input-border-width)] border-[var(--istok-input-border-color)]",
          "focus:[border-width:1px] focus:border-[var(--istok-input-border-focus)]",
          "placeholder:text-[var(--istok-input-placeholder)]",
          inputClassName
        )}
      />
      {endAdornment && (
        <div className="istok-input__end-adornment absolute right-4 top-1/2 -translate-y-1/2 z-10">
          {endAdornment}
        </div>
      )}
    </div>
  );
};
