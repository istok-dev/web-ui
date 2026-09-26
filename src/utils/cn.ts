import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { ACCORDION_SIZES } from '../components/accordion/accordion.types';
import { ALERT_DIALOG_ALIGNS, ALERT_DIALOG_VARIANTS } from '../components/alert-dialog/alert-dialog.types';
import { AVATAR_SHAPES, AVATAR_SIZES } from '../components/avatar/avatar.types';
import { BADGE_COLORS, BADGE_SHAPES, BADGE_SIZES, BADGE_VARIANTS } from '../components/badge/badge.types';
import { BREADCRUMBS_SIZES } from '../components/breadcrumbs/breadcrumbs.types';
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '../components/button/button.types';
import { CARD_PADDINGS, CARD_RADIUS, CARD_VARIANTS } from '../components/card/card.types';
import { CHECKBOX_SIZES } from '../components/checkbox/checkbox.types';
import {
  ICON_BUTTON_COLORS,
  ICON_BUTTON_SHAPES,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_VARIANTS,
} from '../components/icon-button/icon-button.types';
import { INPUT_SIZES, INPUT_VARIANTS } from '../components/input/input.types';
import { LOGO_SIZES } from '../components/logo/logo.types';
import { MENU_ITEM_SIZES, MENU_ITEM_VARIANTS } from '../components/menu/menu.type';
import { NUMBER_INPUT_SIZES, NUMBER_INPUT_VARIANTS } from '../components/number-input/number-input.types';
import { PROGRESS_COLORS } from '../components/progress/progress.types';
import { RADIO_SIZES } from '../components/radio/radio.types';
import { RADIO_CARD_SIZES } from '../components/radio-card/radio-card.types';
import { SELECT_SIZES, SELECT_VARIANTS } from '../components/select/select.types';
import { SETTING_ROW_VARIANTS } from '../components/setting-row/setting-row.types';
import { SWITCH_SIZES } from '../components/switch/switch.types';
import { TABS_SIZES, TABS_VARIANTS } from '../components/tabs/tabs.type';
import { TAG_COLORS, TAG_SIZES, TAG_VARIANTS } from '../components/tag/tag.types';
import { TEXTAREA_SIZES, TEXTAREA_VARIANTS } from '../components/textarea/textarea.types';

/** `modifiers('istok-button--', ['sm', 'md'])` → `['istok-button--sm', 'istok-button--md']` */
const modifiers = (prefix: string, values: readonly string[]) =>
  values.map(value => `${prefix}${value}`);

/**
 * Группы взаимоисключающих модификаторов: из двух классов одной группы
 * `twMerge` оставляет последний, поэтому `className` может переопределить
 * размер/вариант компонента. Группы строятся из тех же массивов констант,
 * что и типы пропов, — новый размер или вариант попадает сюда автоматически.
 */
export const classGroups = {
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
  'accordion-size': modifiers('istok-accordion--', ACCORDION_SIZES),
  'alert-dialog-variant': modifiers('istok-alert-dialog--', ALERT_DIALOG_VARIANTS),
  'alert-dialog-align': modifiers('istok-alert-dialog--', ALERT_DIALOG_ALIGNS),
  'avatar-size': modifiers('istok-avatar--', AVATAR_SIZES),
  'avatar-shape': modifiers('istok-avatar--', AVATAR_SHAPES),
  'badge-size': modifiers('istok-badge--', BADGE_SIZES),
  'badge-variant': modifiers('istok-badge--', BADGE_VARIANTS),
  'badge-color': modifiers('istok-badge--color-', BADGE_COLORS),
  'badge-shape': modifiers('istok-badge--', BADGE_SHAPES),
  'breadcrumbs-size': modifiers('istok-breadcrumbs--', BREADCRUMBS_SIZES),
  'button-size': modifiers('istok-button--', BUTTON_SIZES),
  'button-variant': modifiers('istok-button--', BUTTON_VARIANTS),
  'button-color': modifiers('istok-button--color-', BUTTON_COLORS),
  'card-padding': modifiers('istok-card--padding-', CARD_PADDINGS),
  'card-radius': modifiers('istok-card--radius-', CARD_RADIUS),
  'card-variant': modifiers('istok-card--', CARD_VARIANTS),
  'checkbox-size': modifiers('istok-checkbox--', CHECKBOX_SIZES),
  'icon-button-size': modifiers('istok-icon-button--', ICON_BUTTON_SIZES),
  'icon-button-variant': modifiers('istok-icon-button--', ICON_BUTTON_VARIANTS),
  'icon-button-color': modifiers('istok-icon-button--color-', ICON_BUTTON_COLORS),
  'icon-button-shape': modifiers('istok-icon-button--', ICON_BUTTON_SHAPES),
  'input-size': modifiers('istok-input--', INPUT_SIZES),
  'input-variant': modifiers('istok-input__input--', INPUT_VARIANTS),
  'logo-size': modifiers('istok-logo--', LOGO_SIZES),
  'menu-item-size': modifiers('istok-menu-item--', MENU_ITEM_SIZES),
  'menu-item-variant': modifiers('istok-menu-item--', MENU_ITEM_VARIANTS),
  'number-input-size': modifiers('istok-number-input--', NUMBER_INPUT_SIZES),
  'number-input-variant': modifiers('istok-number-input__input--', NUMBER_INPUT_VARIANTS),
  'progress-color': modifiers('istok-progress--color-', PROGRESS_COLORS),
  'radio-size': modifiers('istok-radio--', RADIO_SIZES),
  'radio-card-size': modifiers('istok-radio-card--', RADIO_CARD_SIZES),
  'select-size': modifiers('istok-select--', SELECT_SIZES),
  'select-variant': modifiers('istok-select--', SELECT_VARIANTS),
  'setting-row-variant': modifiers('istok-setting-row--', SETTING_ROW_VARIANTS),
  'switch-size': modifiers('istok-switch--', SWITCH_SIZES),
  'tabs-size': modifiers('istok-tabs--', TABS_SIZES),
  'tabs-variant': modifiers('istok-tabs--', TABS_VARIANTS),
  'tag-size': modifiers('istok-tag--', TAG_SIZES),
  'tag-variant': modifiers('istok-tag--', TAG_VARIANTS),
  'tag-color': modifiers('istok-tag--color-', TAG_COLORS),
  'textarea-size': modifiers('istok-textarea--', TEXTAREA_SIZES),
  'textarea-variant': modifiers('istok-textarea--', TEXTAREA_VARIANTS),
};

type ClassGroupId = keyof typeof classGroups;

const twMerge = extendTailwindMerge<ClassGroupId>({
  extend: {
    classGroups,
  },
});

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};
