'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';

import { cn } from '@/utils/cn';

import type { TabItemFC, TabItemProps } from '../tabs.type';

type TabVisualState = 'idle' | 'active' | 'disabled' | 'disabled-active';

const getVisualState = (active: boolean, disabled: boolean): TabVisualState => {
  if (disabled) return active ? 'disabled-active' : 'disabled';
  return active ? 'active' : 'idle';
};

/* Наведение только у доступной невыбранной вкладки. */
const bgClassesMap: Record<TabVisualState, string> = {
  'idle': 'bg-(--istok-tabs-item-bg) hover:bg-(--istok-tabs-item-bg-hover)',
  'active': 'bg-(--istok-tabs-item-bg-active)',
  'disabled': 'bg-(--istok-tabs-item-bg-disabled)',
  'disabled-active': 'bg-(--istok-tabs-item-bg-disabled-active)',
};

const underlineClassesMap: Record<TabVisualState, string | false> = {
  'idle': false,
  'active': 'after:bg-(--istok-tabs-item-line-underline-color)',
  'disabled': false,
  'disabled-active': 'after:bg-(--istok-tabs-item-line-underline-color-disabled)',
};

const labelClassesMap: Record<TabVisualState, string> = {
  'idle': `
    text-(--istok-tabs-item-label-color)
    group-hover:text-(--istok-tabs-item-label-color-hover)
  `,
  'active': 'text-(--istok-tabs-item-label-color-active)',
  'disabled': 'text-(--istok-tabs-item-label-color-disabled)',
  'disabled-active': 'text-(--istok-tabs-item-label-color-disabled-active)',
};

const iconClassesMap: Record<TabVisualState, string> = {
  'idle': `
    text-(--istok-tabs-item-icon-color)
    group-hover:text-(--istok-tabs-item-icon-color-hover)
  `,
  'active': 'text-(--istok-tabs-item-icon-color-active)',
  'disabled': 'text-(--istok-tabs-item-icon-color-disabled)',
  'disabled-active': 'text-(--istok-tabs-item-icon-color-disabled-active)',
};

function TabItemComponent<T extends string>({
  value,
  label,
  startIcon: StartIcon,
  onClick,
  className,
  disabled = false,
  pt,
  ...props
}: TabItemProps<T>) {
  const { className: startIconClassName, ...startIconPt } = pt?.startIcon ?? {};

  return (
    <BaseTabs.Tab
      {...props}
      value={value}
      disabled={disabled}
      onClick={() => onClick?.()}
      className={({ active }) => {
        const state = getVisualState(active, disabled);

        return cn(
          'istok-tab-item group',
          'relative flex items-center justify-center transition-colors',
          `
            h-(--istok-tabs-item-height) px-(--istok-tabs-item-padding-inline)
            py-(--istok-tabs-item-padding-block)
          `,
          'gap-(--istok-tabs-item-gap) rounded-(--istok-tabs-item-radius)',
          // Перекрываем нижнюю границу группы, чтобы подчёркивание line легло на неё.
          '-mb-(--istok-tabs-list-border-width)',
          `after:absolute after:inset-x-0 after:bottom-0 after:content-['']`,
          'after:h-(--istok-tabs-item-line-underline-height)',
          `
            focus-visible:[box-shadow:inset_0_0_0_2px_var(--focus-ring-color)]
            focus-visible:outline-none
          `,
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          active && 'istok-tab-item--active',
          bgClassesMap[state],
          underlineClassesMap[state],
          className,
        );
      }}
      render={(renderProps, { active }) => {
        const state = getVisualState(active, disabled);

        return (
          <button type="button" {...renderProps}>
            {StartIcon && (
              <span className="shrink-0">
                <StartIcon
                  {...startIconPt}
                  className={cn(
                    'istok-tab-item__start-icon transition-colors',
                    'size-(--istok-tabs-item-icon-size)',
                    iconClassesMap[state],
                    startIconClassName,
                  )}
                />
              </span>
            )}

            {label && (
              <span className="flex min-w-0 flex-1 flex-col items-start">
                <span
                  className={cn(
                    'istok-tab-item__label w-full truncate transition-colors',
                    `
                      text-(length:--istok-tabs-item-label-font-size)
                      leading-(--istok-tabs-item-label-line-height)
                      font-(--istok-tabs-item-label-font-weight)
                      tracking-(--istok-tabs-item-label-letter-spacing)
                    `,
                    labelClassesMap[state],
                  )}
                >
                  {label}
                </span>
              </span>
            )}
          </button>
        );
      }}
    />
  );
}

export const TabItem = TabItemComponent as TabItemFC;
