import { cn } from '@/utils/cn';

import type { TabItemSize, TabItemVariant, TabsFC, TabsProps } from '../tabs.type';
import { TabItem } from './tab-item';
import { TabsContext, type TabsContextValue } from './tabs-context';

const sizeClassesMap: Record<TabItemSize, string> = {
  sm: 'istok-tabs--sm',
  md: 'istok-tabs--md',
  lg: 'istok-tabs--lg',
};

const variantClassesMap: Record<TabItemVariant, string> = {
  line: 'istok-tabs--line',
  ghost: 'istok-tabs--ghost',
  solid: 'istok-tabs--solid',
};

function TabsComponent<T extends string>(props: TabsProps<T>) {
  const {
    children,
    className,
    size = 'md',
    variant = 'line',
    value,
    onValueChange,
  } = props;

  return (
    <TabsContext
      value={{ value, onValueChange } as TabsContextValue<string>}
    >
      <div
        className={cn(
          'istok-tabs',
          'flex items-center rounded-(--istok-tabs-radius)',
          sizeClassesMap[size],
          variantClassesMap[variant],
          className,
        )}
      >
        {children}
      </div>
    </TabsContext>
  );
}

export const Tabs = TabsComponent as TabsFC;
Tabs.Item = TabItem;
