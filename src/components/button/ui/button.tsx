import React from "react";
import { Loader2 } from "lucide-react";
import { Button as BaseButton } from "@base-ui/react/button";

import { cn } from "@/utils/cn";

import {
  ButtonColor,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "../button.types";

const sizeClassesMap: Record<ButtonSize, string> = {
  sm: "istok-button--sm",
  md: "istok-button--md",
  lg: "istok-button--lg",
  xl: "istok-button--xl",
};

const colorClassesMap: Record<ButtonColor, string> = {
  primary: "istok-button--color-primary",
  neutral: "istok-button--color-neutral",
  negative: "istok-button--color-negative",
  warning: "istok-button--color-warning",
  info: "istok-button--color-info",
  success: "istok-button--color-success",
  accent: "istok-button--color-accent",
};

const variantClassesMap: Record<ButtonVariant, string> = {
  primary: "istok-button--primary",
  secondary: "istok-button--secondary",
  clear: "istok-button--clear",
  text: "istok-button--text",
  "clear-inverse": "istok-button--clear-inverse",
  opacity: "istok-button--opacity",
  outline: "istok-button--outline",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  startIcon: StartIcon,
  iconSize = 16,
  className,
  variant = "primary",
  color = "primary",
  disabled = false,
  loading = false,
  size = "md",
  rounded = false,
  type = "button",
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <BaseButton
      {...rest}
      disabled={isDisabled}
      type={type}
      className={cn(
        "istok-button",
        "inline-flex items-center justify-center whitespace-nowrap",
        "transition-all",
        "px-[var(--istok-button-padding-inline)] py-[var(--istok-button-padding-block)]",
        "h-[var(--istok-button-height)] rounded-[var(--istok-button-radius)]",
        "gap-[var(--istok-button-gap)]",
        "text-(length:--istok-button-font-size) leading-[var(--istok-button-line-height)]",
        "bg-[var(--istok-button-bg)] text-[var(--istok-button-fg)]",
        "border-1 border-[var(--istok-button-border-color)]",
        !isDisabled && [
          "cursor-pointer",
          "hover:bg-[var(--istok-button-bg-hover)] hover:text-[var(--istok-button-fg-hover)] hover:border-[var(--istok-button-border-color-hover)]",
          "active:bg-[var(--istok-button-bg-active)] active:text-[var(--istok-button-fg-active)] active:border-[var(--istok-button-border-color-active)]",
        ],
        {
          "opacity-12 cursor-not-allowed": isDisabled,
          "rounded-full": rounded,
        },
        sizeClassesMap[size],
        colorClassesMap[color],
        variantClassesMap[variant],
        className
      )}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : (
        StartIcon && <StartIcon size={iconSize} />
      )}
      {children}
    </BaseButton>
  );
};
