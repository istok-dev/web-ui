import type { LucideIcon, LucideProps } from 'lucide-react';
import type { PropsWithChildren } from 'react';

export type TabsFC = {
  <T extends string = string>(props: TabsProps<T>): React.ReactNode;
  Item: TabItemFC;
};

export type TabsProps<T extends string> = PropsWithChildren<{
  'className'?: string;
  'size'?: TabItemSize;
  'variant'?: TabItemVariant;
  /** Активная вкладка (контролируемый режим) */
  'value'?: T;
  /** Начальная вкладка (неконтролируемый режим) */
  'defaultValue'?: T;
  'onValueChange'?: (value: T) => void;
  /** Подпись для `role="tablist"`, если рядом нет видимого заголовка */
  'aria-label'?: string;
}>;

export const TABS_SIZES = ['sm', 'md', 'lg'] as const;
export const TABS_VARIANTS = ['line', 'inverse', 'solid'] as const;

export type TabItemSize = (typeof TABS_SIZES)[number];
export type TabItemVariant = (typeof TABS_VARIANTS)[number];

export type TabItemPassThrough = {
  startIcon?: LucideProps;
};

export type TabItemProps<T extends string> = Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  'onClick' | 'className'
> & {
  value: T;
  label?: string;
  startIcon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  /** Pass-through для внутренних слотов */
  pt?: TabItemPassThrough;
};

export type TabItemFC = {
  <T extends string = string>(props: TabItemProps<T>): React.ReactNode;
};
