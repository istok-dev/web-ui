import { Check, Minus } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { CheckboxIndicatorProps, CheckboxSize } from '../checkbox.types';

const sizeClassesMap: Record<CheckboxSize, string> = {
  sm: 'istok-checkbox--sm',
  md: 'istok-checkbox--md',
  lg: 'istok-checkbox--lg',
};

/**
 * Визуальный квадрат чекбокса без нативного input.
 * Используется внутри других интерактивных элементов (пункты списков, кнопки),
 * где вложенный `<input>` сделал бы разметку невалидной.
 */
export const CheckboxIndicator: FC<CheckboxIndicatorProps> = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  size,
  className,
}) => {
  const isOn = checked || indeterminate;

  return (
    <span
      aria-hidden
      className={cn(
        `
          istok-checkbox__input flex shrink-0 items-center justify-center
          transition-all
        `,
        'border border-neutral-300 bg-transparent',
        `
          size-(--istok-checkbox-input-size)
          rounded-(--istok-checkbox-input-radius)
        `,
        'peer-focus-visible:[box-shadow:0_0_0_2px_var(--focus-ring-color)]',
        !disabled && [
          checked && !indeterminate && 'border-none bg-primary-600',
          !isOn && 'group-hover:border-primary-600',
          indeterminate && 'border-primary-600 bg-primary-600',
        ],
        disabled && (isOn ? 'border-neutral-400' : 'border-neutral-300'),
        size && sizeClassesMap[size],
        className,
      )}
    >
      {indeterminate
        ? (
          <Minus
            className={cn(
              'istok-checkbox__icon transition-all',
              'size-(--istok-checkbox-icon-size)',
              disabled ? 'text-neutral-400' : 'text-neutral-50',
            )}
          />
        )
        : (
          <Check
            className={cn(
              'istok-checkbox__icon transition-all',
              'size-(--istok-checkbox-icon-size)',
              checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
              disabled ? 'text-neutral-400' : 'text-neutral-50',
            )}
          />
        )}
    </span>
  );
};
