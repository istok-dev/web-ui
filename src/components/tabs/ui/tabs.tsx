'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';

import { cn } from '@/utils/cn';

import type { TabItemSize, TabItemVariant, TabsFC, TabsProps } from '../tabs.type';
import { TabItem } from './tab-item';

const sizeClassesMap: Record<TabItemSize, string> = {
  sm: 'istok-tabs--sm',
  md: 'istok-tabs--md',
  lg: 'istok-tabs--lg',
};

const variantClassesMap: Record<TabItemVariant, string> = {
  line: 'istok-tabs--line',
  inverse: 'istok-tabs--inverse',
  solid: 'istok-tabs--solid',
};

function TabsComponent<T extends string>(props: TabsProps<T>) {
  const {
    children,
    className,
    size = 'md',
    variant = 'line',
    value,
    defaultValue,
    onValueChange,
    'aria-label': ariaLabel,
  } = props;

  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={next => onValueChange?.(next as T)}
      className={cn(
        'istok-tabs',
        sizeClassesMap[size],
        variantClassesMap[variant],
      )}
    >
      <BaseTabs.List
        aria-label={ariaLabel}
        className={cn(
          'istok-tabs__list items-center',
          '[display:var(--istok-tabs-list-display)]',
          `
            rounded-(--istok-tabs-list-radius) bg-(--istok-tabs-list-bg)
            p-(--istok-tabs-list-padding)
          `,
          `
            border-b-(length:--istok-tabs-list-border-width)
            border-(--istok-tabs-list-border)
          `,
          className,
        )}
      >
        {children}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}

export const Tabs = TabsComponent as TabsFC;
Tabs.Item = TabItem;
