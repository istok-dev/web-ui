import type { Accordion } from '@base-ui/react/accordion';
import type { useRender } from '@base-ui/react/use-render';
import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';

/** Открытые пункты. Строка — сокращение для одного пункта (`'a'` ≡ `['a']`). */
export type AccordionValue = string | string[] | undefined;

export const ACCORDION_SIZES = ['sm', 'md'] as const;

export type AccordionSize = (typeof ACCORDION_SIZES)[number];

export type AccordionItemPassThrough = {
  /** Заголовок пункта (текст) */
  title?: useRender.ComponentProps<'span'>;
  /** Обёртка заголовка (Base UI `Accordion.Header`) */
  header?: Omit<Accordion.Header.Props, 'children'>;
  /** Кнопка открытия (Base UI `Accordion.Trigger`) */
  trigger?: Omit<Accordion.Trigger.Props, 'children'>;
  /** Панель контента (Base UI `Accordion.Panel`) */
  panel?: Omit<Accordion.Panel.Props, 'children'>;
};

export type AccordionRootProps = {
  children: ReactNode;
  className?: string;
  /** Контролируемое значение: открытый value (строка или массив при multiple) */
  value?: AccordionValue;
  /** Начальное значение в неконтролируемом режиме */
  defaultValue?: AccordionValue;
  /** Колбэк при смене открытых пунктов. Всегда получает массив value. */
  onValueChange?: (value: string[]) => void;
  /** Разрешить несколько открытых пунктов. Не влияет на внешний вид. */
  multiple?: boolean;
  /**
   * Держать контент панелей в DOM в закрытом состоянии (скрытие через CSS).
   * По умолчанию панели размонтируются.
   */
  keepMounted?: boolean;
  /**
   * `md` — страницы (паддинг 24). `sm` — мобильный, карточки и модалки (паддинг 16).
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
  /** Pass-through для внутренних слотов */
  pt?: AccordionItemPassThrough;
};
