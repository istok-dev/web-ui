"use client";

import React, { useRef, useEffect, useState } from "react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/utils/cn";
import { CheckboxItemFC } from "../checkbox.types";

export const CheckboxItem: CheckboxItemFC = ({
  label,
  description,
  className,
  classes,
  disabled = false,
  checked,
  indeterminate = false,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(checked || false);

  // Sync internal state with controlled prop
  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  // Sync indeterminate state with input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Handle input change for uncontrolled mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      setIsChecked(e.target.checked);
    }
    inputProps.onChange?.(e);
  };

  // Determine if checkbox is checked (controlled or uncontrolled)
  const checkboxChecked = checked !== undefined ? checked : isChecked;
  const isIndeterminate = indeterminate;

  return (
    <div
      className={cn(
        "istok-checkbox__item p-1 flex items-start group",
        "gap-[var(--istok-checkbox-gap)]",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          onChange={handleChange}
          {...inputProps}
        />
        <div
          className={cn(
            "istok-checkbox__input shrink-0 flex items-center justify-center transition-all",
            "border border-neutral-300 bg-transparent",
            "size-[var(--istok-checkbox-input-size)] rounded-[var(--istok-checkbox-input-radius)]",
            !disabled && [
              checkboxChecked && !isIndeterminate && "border-none bg-brand-600",
              !checkboxChecked &&
                !isIndeterminate &&
                "border-neutral-300 group-hover:border-brand-600",
              isIndeterminate && "border-brand-600 bg-brand-600",
              "cursor-pointer",
            ],
            disabled && [
              "cursor-not-allowed",
              checkboxChecked || isIndeterminate
                ? "border-neutral-400 bg-transparent"
                : "border-neutral-300 bg-transparent",
            ]
          )}
        >
          {isIndeterminate ? (
            <Minus
              className={cn(
                "istok-checkbox__icon transition-all",
                "size-[var(--istok-checkbox-icon-size)]",
                "opacity-100 scale-100",
                disabled ? "text-[#4F4F4F]" : "text-white"
              )}
            />
          ) : (
            <Check
              className={cn(
                "istok-checkbox__icon transition-all",
                "size-[var(--istok-checkbox-icon-size)]",
                checkboxChecked ? "opacity-100 scale-100" : "opacity-0 scale-0",
                disabled ? "text-[#4F4F4F]" : "text-white"
              )}
            />
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <span
              className={cn(
                "istok-checkbox__item-label font-medium text-neutral-900 block",
                "text-(length:--istok-checkbox-label-font-size) leading-[var(--istok-checkbox-label-line-height)]",
                classes?.label
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <p
              className={cn(
                "istok-checkbox__item-description text-neutral-500 mt-0.5 block",
                "text-(length:--istok-checkbox-description-font-size) leading-[var(--istok-checkbox-description-line-height)]",
                classes?.description
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
