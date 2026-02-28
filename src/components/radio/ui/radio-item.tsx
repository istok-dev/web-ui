"use client";

import React, { useRef, useEffect, useState } from "react";
import { Info } from "lucide-react";

import { cn } from "@/utils/cn";
import { RadioItemFC } from "../radio.types";

export const RadioItem: RadioItemFC = ({
  label,
  description,
  showInfoIcon = false,
  onInfoClick,
  className,
  classes,
  disabled = false,
  checked,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(checked ?? false);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      setIsChecked(e.target.checked);
    }
    inputProps.onChange?.(e);
  };

  const radioChecked = checked !== undefined ? checked : isChecked;

  return (
    <label
      className={cn(
        "istok-radio__item flex items-start gap-[var(--istok-radio-gap)] cursor-pointer group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          ref={inputRef}
          type="radio"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          onChange={handleChange}
          {...inputProps}
        />
        <div
          className={cn(
            "flex items-center justify-center rounded-full border-2 bg-transparent transition-all",
            "size-[var(--istok-radio-input-size)]",
            disabled && "cursor-not-allowed",
            !disabled && "cursor-pointer",
            radioChecked &&
              !disabled && [
                "border-[var(--istok-radio-input-bg)] bg-[var(--istok-radio-input-bg)]",
              ],
            !radioChecked &&
              !disabled && [
                "border-[var(--istok-radio-input-border)]",
                "group-hover:border-[var(--istok-radio-input-border-hover)]",
              ],
            disabled && [
              radioChecked
                ? "border-[var(--istok-radio-input-border-disabled)] bg-[var(--istok-radio-input-bg-disabled)]"
                : "border-[var(--istok-radio-input-border-disabled)]",
            ]
          )}
        >
          <div
            className={cn(
              "w-full h-full rounded-full transition-all",
              radioChecked
                ? "bg-[var(--istok-radio-input-dot)] scale-50"
                : "scale-0"
            )}
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "istok-radio__item-label font-medium text-neutral-900",
              "text-(length:--istok-radio-label-font-size) leading-[var(--istok-radio-label-line-height)]",
              classes?.label
            )}
          >
            {label}
          </span>
          {showInfoIcon && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInfoClick?.();
              }}
              className="size-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center shrink-0 hover:bg-green-200 transition-colors disabled:opacity-50"
              disabled={disabled}
            >
              <Info size={12} className="text-green-600" />
            </button>
          )}
        </div>
        {description && (
          <p
            className={cn(
              "istok-radio__item-description text-neutral-500 mt-0.5",
              "text-(length:--istok-radio-description-font-size) leading-[var(--istok-radio-description-line-height)]",
              classes?.description
            )}
          >
            {description}
          </p>
        )}
      </div>
    </label>
  );
};
