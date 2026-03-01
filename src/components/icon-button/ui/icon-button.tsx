import React from "react";
import { Loader2 } from "lucide-react";
import { Button as BaseButton } from "@base-ui/react/button";

import { cn } from "@/utils/cn";

import {
  IconButtonColor,
  IconButtonProps,
  IconButtonShape,
  IconButtonSize,
  IconButtonVariant,
} from "../icon-button.types";

const colorClassesMap: Record<IconButtonColor, string> = {
  primary: "istok-icon-button--color-primary",
  neutral: "istok-icon-button--color-neutral",
  negative: "istok-icon-button--color-negative",
  warning: "istok-icon-button--color-warning",
  info: "istok-icon-button--color-info",
  success: "istok-icon-button--color-success",
  accent: "istok-icon-button--color-accent",
};

const variantClassesMap: Record<IconButtonVariant, string> = {
  primary: "istok-icon-button--primary",
  secondary: "istok-icon-button--secondary",
  clear: "istok-icon-button--clear",
  "clear-inverse": "istok-icon-button--clear-inverse",
  opacity: "istok-icon-button--opacity",
};

const sizeClassesMap: Record<IconButtonSize, string> = {
  sm: "istok-icon-button--sm",
  md: "istok-icon-button--md",
  lg: "istok-icon-button--lg",
};

const shapeClassesMap: Record<IconButtonShape, string> = {
  square: "istok-icon-button--square",
  circle: "istok-icon-button--circle",
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  shape = "circle",
  variant = "primary",
  color = "primary",
  className,
  disabled = false,
  loading = false,
  iconProps,
  size = "md",
  classes,
  type = "button",
  ...rest
}) => {
  const { className: iconClassName, ...iconPropsRest } = iconProps || {};
  const isDisabled = disabled || loading;

  return (
    <BaseButton
      {...rest}
      type={type}
      disabled={isDisabled}
      className={cn(
        "istok-icon-button",
        "transition-colors flex items-center justify-center",
        "size-[var(--istok-icon-button-size)] rounded-[var(--istok-icon-button-radius)]",
        "bg-[var(--istok-icon-button-bg)] text-[var(--istok-icon-button-fg)]",
        !isDisabled && [
          "cursor-pointer",
          "hover:bg-[var(--istok-icon-button-bg-hover)] hover:text-[var(--istok-icon-button-fg-hover)]",
          "active:bg-[var(--istok-icon-button-bg-active)] active:text-[var(--istok-icon-button-fg-active)]",
        ],
        {
          "opacity-12 cursor-not-allowed": isDisabled,
        },
        sizeClassesMap[size],
        colorClassesMap[color],
        shapeClassesMap[shape],
        variantClassesMap[variant],
        className,
        classes?.root
      )}
    >
      {loading ? (
        <Loader2
          className={cn(
            "istok-icon-button__icon animate-spin",
            "size-[var(--istok-icon-button-icon-size)]",
            classes?.icon,
            iconClassName
          )}
          {...iconPropsRest}
        />
      ) : (
        <Icon
          className={cn(
            "istok-icon-button__icon",
            "size-[var(--istok-icon-button-icon-size)]",
            classes?.icon,
            iconClassName
          )}
          {...iconPropsRest}
        />
      )}
    </BaseButton>
  );
};
