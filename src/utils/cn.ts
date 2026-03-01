import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<
  | "typography-size"
  | "icon-button-variant"
  | "icon-button-size"
  | "icon-button-shape"
  | "input-variant"
  | "input-size"
  | "button-size"
  | "button-variant"
  | "button-color"
  | "checkbox-size"
  | "badge-size"
  | "badge-variant"
  | "badge-shape"
  | "tag-size"
  | "tag-variant"
  | "tabs-size"
  | "tabs-variant"
  | "avatar-size"
  | "avatar-shape"
  | "breadcrumbs-size"
  | "radio-size"
  | "select-size"
  | "select-variant"
  | "dropdown-item-size"
  | "dropdown-item-variant"
>({
  extend: {
    classGroups: {
      "typography-size": [
        "text-display-l",
        "text-display-m",
        "text-display-s",
        "text-headline-l",
        "text-headline-m",
        "text-headline-s",
        "text-title-l",
        "text-title-m",
        "text-title-s",
        "text-body-l",
        "text-body-m",
        "text-body-s",
        "text-caption-l",
        "text-caption-m",
        "text-caption-s",
        "text-control-l",
        "text-control-m",
        "text-control-s",
      ],
      "avatar-size": ["istok-avatar--s", "istok-avatar--m", "istok-avatar--l"],
      "avatar-shape": ["istok-avatar--circle", "istok-avatar--square"],
      "icon-button-variant": [
        "istok-icon-button--primary",
        "istok-icon-button--secondary",
        "istok-icon-button--clear",
        "istok-icon-button--clear-inverse",
        "istok-icon-button--opacity",
      ],
      "icon-button-size": [
        "istok-icon-button--s",
        "istok-icon-button--m",
        "istok-icon-button--l",
      ],
      "icon-button-shape": [
        "istok-icon-button--circle",
        "istok-icon-button--square",
      ],
      "input-variant": [
        "istok-input__input--neutral",
        "istok-input__input--solid",
        "istok-input__input--outline",
        "istok-input__input--opacity",
      ],
      "input-size": ["istok-input--s", "istok-input--m", "istok-input--l"],
      "button-size": [
        "istok-button--sm",
        "istok-button--md",
        "istok-button--lg",
        "istok-button--xl",
      ],
      "button-color": [
        "istok-button--color-primary",
        "istok-button--color-neutral",
        "istok-button--color-negative",
        "istok-button--color-warning",
        "istok-button--color-info",
        "istok-button--color-success",
        "istok-button--color-accent",
      ],
      "button-variant": [
        "istok-button--primary",
        "istok-button--secondary",
        "istok-button--clear",
        "istok-button--clear-inverse",
        "istok-button--opacity",
        "istok-button--outline",
        "istok-button--text",
      ],
      "checkbox-size": [
        "istok-checkbox--s",
        "istok-checkbox--m",
        "istok-checkbox--l",
      ],
      "badge-size": ["istok-badge--s", "istok-badge--m", "istok-badge--l"],
      "badge-variant": [
        "istok-badge--solid-brand",
        "istok-badge--solid-neutral",
        "istok-badge--ghost-brand",
        "istok-badge--ghost-neutral",
        "istok-badge--opacity-brand",
        "istok-badge--outline-brand",
      ],
      "badge-shape": ["istok-badge--square", "istok-badge--rounded"],
      "tag-size": ["istok-tag--s", "istok-tag--m", "istok-tag--l"],
      "tag-variant": [
        "istok-tag--solid-brand",
        "istok-tag--solid-neutral",
        "istok-tag--solid-black",
        "istok-tag--ghost-brand",
        "istok-tag--ghost-neutral",
      ],
      "tabs-size": ["istok-tabs--s", "istok-tabs--m", "istok-tabs--l"],
      "tabs-variant": [
        "istok-tabs--line",
        "istok-tabs--ghost",
        "istok-tabs--solid",
      ],
      "breadcrumbs-size": ["istok-breadcrumbs--m", "istok-breadcrumbs--l"],
      "radio-size": ["istok-radio--s", "istok-radio--m", "istok-radio--l"],
      "select-size": ["istok-select--s", "istok-select--m", "istok-select--l"],
      "select-variant": ["istok-select--solid", "istok-select--outline"],
      "dropdown-item-size": [
        "istok-dropdown-item--s",
        "istok-dropdown-item--m",
        "istok-dropdown-item--l",
      ],
      "dropdown-item-variant": ["istok-dropdown-item--brand"],
    },
  },
});

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};
