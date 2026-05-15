import { createContext, use } from 'react';

export type TabsContextValue<T extends string = string> = {
  value?: T;
  onValueChange?: (value: T) => void;
};

export const TabsContext = createContext<
  TabsContextValue<string> | undefined
>(undefined);

export const useTabsContext = <
  T extends string = string,
>(): TabsContextValue<T> => {
  const context = use(TabsContext);
  if (!context) {
    throw new Error('Tab.Item must be used within Tabs component');
  }
  return context as unknown as TabsContextValue<T>;
};
