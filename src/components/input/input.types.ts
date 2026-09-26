import type { LucideIcon } from 'lucide-react';
import type {
  ChangeEvent,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

export const INPUT_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export const INPUT_VARIANTS = ['neutral', 'solid', 'opacity', 'filled'] as const;

export type InputSize = (typeof INPUT_SIZES)[number];
export type InputVariant = (typeof INPUT_VARIANTS)[number];

export type InputPassThrough = {
  /** Корневой `<div>`-обёртка */
  root?: HTMLAttributes<HTMLDivElement>;
  input?: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;
};

/**
 * Все нативные атрибуты `<input>` (`id`, `name`, `onBlur`, `aria-*`, `required`…)
 * и `ref` попадают на сам `<input>`. `className` и `style` — на корневую обёртку.
 */
export type InputProps = {
  value?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  startIcon?: LucideIcon;
  /** Класс корневой обёртки */
  className?: string;
  /** Стили корневой обёртки */
  style?: CSSProperties;
  size?: InputSize;
  variant?: InputVariant;
  ref?: Ref<HTMLInputElement>;
  pt?: InputPassThrough;
}
& Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'size' | 'className' | 'style'
>;
