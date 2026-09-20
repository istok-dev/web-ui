import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';

export type AccordionValue = string | string[] | undefined;

export const ACCORDION_SIZES = ['sm', 'md'] as const;

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
  /** Разрешить несколько открытых пунктов. Не влияет на внешний вид. */
  multiple?: boolean;
  /**
   * Держать контент панелей в DOM в закрытом состоянии (скрытие через CSS).
   * По умолчанию панели размонтируются.
   */
  keepMounted?: boolean;
  /**
   * `md` — страницы (паддинг 24). `sm` — мобильный, карточки и модалки (паддинг 16).
   * Ниже 768px `md` использует метрики `sm`.
   */
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
