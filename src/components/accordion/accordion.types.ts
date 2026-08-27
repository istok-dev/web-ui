import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';

export type AccordionValue = string | string[] | undefined;

export const ACCORDION_SIZES = ['sm', 'md', 'lg'] as const;

export type AccordionSize = (typeof ACCORDION_SIZES)[number];

export type AccordionRootProps = {
  children: ReactNode;
  className?: string;
  /** Контролируемое значение: открытый value (строка или массив при multiple) */
  value?: AccordionValue;
  /** Начальное значение в неконтролируемом режиме */
  defaultValue?: AccordionValue;
  /** Колбэк при смене открытого пункта */
  onValueChange?: (value: AccordionValue) => void;
  /** Разрешить несколько открытых пунктов */
  multiple?: boolean;
  size?: AccordionSize;
};

export type AccordionItemProps = {
  /** Уникальный идентификатор пункта (для value/defaultValue корня) */
  value: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  iconProps?: LucideProps;
  children: ReactNode;
  className?: string;
};
