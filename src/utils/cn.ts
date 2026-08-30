import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<
  | 'typography-size'
  | 'icon-button-variant'
  | 'icon-button-size'
  | 'icon-button-shape'
  | 'input-variant'
  | 'input-size'
  | 'card-padding'
  | 'card-radius'
  | 'card-variant'
  | 'progress-color'
  | 'textarea-variant'
  | 'textarea-size'
  | 'button-size'
  | 'button-variant'
  | 'button-color'
  | 'checkbox-size'
  | 'badge-size'
  | 'badge-variant'
  | 'badge-color'
  | 'badge-shape'
  | 'tag-size'
  | 'tag-variant'
  | 'tag-color'
  | 'tabs-size'
  | 'tabs-variant'
  | 'avatar-size'
  | 'avatar-shape'
  | 'breadcrumbs-size'
  | 'radio-size'
  | 'select-size'
  | 'select-variant'
  | 'dropdown-item-size'
  | 'dropdown-item-variant'
>({
  extend: {
    classGroups: {
      'typography-size': [
        'text-display-lg',
        'text-display-md',
        'text-headline-lg',
        'text-headline-md',
        'text-headline-sm',
        'text-title-lg',
        'text-title-md',
        'text-title-sm',
        'text-body-xl',
        'text-body-lg',
        'text-body-md',
        'text-body-sm',
        'text-body-xs',
        'text-control-xl',
        'text-control-lg',
        'text-control-md',
        'text-control-sm',
        'text-control-xs',
      ],
      'avatar-size': ['istok-avatar--sm', 'istok-avatar--md', 'istok-avatar--lg'],
      'avatar-shape': ['istok-avatar--circle', 'istok-avatar--square'],
      'icon-button-variant': [
        'istok-icon-button--primary',
        'istok-icon-button--secondary',
        'istok-icon-button--clear',
        'istok-icon-button--clear-inverse',
        'istok-icon-button--opacity',
      ],
      'icon-button-size': [
        'istok-icon-button--sm',
        'istok-icon-button--md',
        'istok-icon-button--lg',
      ],
      'icon-button-shape': [
        'istok-icon-button--circle',
        'istok-icon-button--square',
      ],
      'input-variant': [
        'istok-input__input--neutral',
        'istok-input__input--solid',
        'istok-input__input--outline',
        'istok-input__input--opacity',
      ],
      'input-size': ['istok-input--sm', 'istok-input--md', 'istok-input--lg'],
      'card-padding': [
        'istok-card--padding-sm',
        'istok-card--padding-md',
        'istok-card--padding-lg',
      ],
      'card-radius': ['istok-card--radius-xl', 'istok-card--radius-2xl'],
      'card-variant': ['istok-card--default', 'istok-card--soft'],
      'progress-color': [
        'istok-progress--color-primary',
        'istok-progress--color-accent',
        'istok-progress--color-success',
        'istok-progress--color-warning',
        'istok-progress--color-info',
        'istok-progress--color-negative',
        'istok-progress--color-neutral',
      ],
      'textarea-variant': [
        'istok-textarea--neutral',
        'istok-textarea--solid',
        'istok-textarea--outline',
      ],
      'textarea-size': [
        'istok-textarea--sm',
        'istok-textarea--md',
        'istok-textarea--lg',
      ],
      'button-size': [
        'istok-button--sm',
        'istok-button--md',
        'istok-button--lg',
        'istok-button--xl',
      ],
      'button-color': [
        'istok-button--color-primary',
        'istok-button--color-neutral',
        'istok-button--color-negative',
        'istok-button--color-warning',
        'istok-button--color-info',
        'istok-button--color-success',
        'istok-button--color-accent',
      ],
      'button-variant': [
        'istok-button--primary',
        'istok-button--secondary',
        'istok-button--clear',
        'istok-button--clear-inverse',
        'istok-button--opacity',
        'istok-button--outline',
        'istok-button--text',
      ],
      'checkbox-size': [
        'istok-checkbox--sm',
        'istok-checkbox--md',
        'istok-checkbox--lg',
      ],
      'badge-size': ['istok-badge--sm', 'istok-badge--md', 'istok-badge--lg'],
      'badge-color': [
        'istok-badge--color-primary',
        'istok-badge--color-neutral',
        'istok-badge--color-negative',
        'istok-badge--color-warning',
        'istok-badge--color-info',
        'istok-badge--color-success',
        'istok-badge--color-accent',
      ],
      'badge-variant': [
        'istok-badge--solid',
        'istok-badge--ghost',
        'istok-badge--inverse',
        'istok-badge--outline',
      ],
      'badge-shape': ['istok-badge--square', 'istok-badge--rounded'],
      'tag-size': ['istok-tag--sm', 'istok-tag--md', 'istok-tag--lg'],
      'tag-color': [
        'istok-tag--color-primary',
        'istok-tag--color-neutral',
        'istok-tag--color-negative',
        'istok-tag--color-warning',
        'istok-tag--color-info',
        'istok-tag--color-success',
        'istok-tag--color-accent',
      ],
      'tag-variant': ['istok-tag--solid', 'istok-tag--ghost', 'istok-tag--outline'],
      'tabs-size': ['istok-tabs--sm', 'istok-tabs--md', 'istok-tabs--lg'],
      'tabs-variant': [
        'istok-tabs--line',
        'istok-tabs--ghost',
        'istok-tabs--solid',
      ],
      'breadcrumbs-size': ['istok-breadcrumbs--md', 'istok-breadcrumbs--lg'],
      'radio-size': ['istok-radio--sm', 'istok-radio--md', 'istok-radio--lg'],
      'select-size': ['istok-select--sm', 'istok-select--md', 'istok-select--lg'],
      'select-variant': ['istok-select--solid', 'istok-select--outline'],
      'dropdown-item-size': [
        'istok-dropdown-item--sm',
        'istok-dropdown-item--md',
        'istok-dropdown-item--lg',
      ],
      'dropdown-item-variant': [
        'istok-dropdown-item--base',
        'istok-dropdown-item--brand',
        'istok-dropdown-item--danger',
      ],
    },
  },
});

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};
