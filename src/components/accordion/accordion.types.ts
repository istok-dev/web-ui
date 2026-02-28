import { LucideIcon, LucideProps } from "lucide-react";
import { ReactNode } from "react";

export type AccordionValue = string | string[] | undefined;

export interface AccordionRootProps {
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
}

export interface AccordionItemProps {
  /** Уникальный идентификатор пункта (для value/defaultValue корня) */
  value: string;
  title: ReactNode;
  icon?: LucideIcon;
  iconProps?: LucideProps;
  children: ReactNode;
  className?: string;
}
