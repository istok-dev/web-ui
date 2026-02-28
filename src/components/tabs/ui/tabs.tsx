import { cn } from "@/utils/cn";

import { TabItemSize, TabItemVariant, TabsFC, TabsProps } from "../tabs.type";
import { TabItem } from "./tab-item";
import { TabsContext } from "./tabs-context";

const sizeClassesMap: Record<TabItemSize, string> = {
  s: "istok-tabs--s",
  m: "istok-tabs--m",
  l: "istok-tabs--l",
};

const variantClassesMap: Record<TabItemVariant, string> = {
  line: "istok-tabs--line",
  ghost: "istok-tabs--ghost",
  solid: "istok-tabs--solid",
};

function TabsComponent<T extends string>(props: TabsProps<T>) {
  const {
    children,
    className,
    size = "m",
    variant = "line",
    value,
    onValueChange,
  } = props;

  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div
        className={cn(
          "istok-tabs",
          "flex items-center rounded-[var(--istok-tabs-radius)]",
          sizeClassesMap[size],
          variantClassesMap[variant],
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export const Tabs = TabsComponent as TabsFC;
Tabs.Item = TabItem;
