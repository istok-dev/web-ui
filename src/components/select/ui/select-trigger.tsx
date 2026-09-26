'use client';

import { Combobox } from '@base-ui/react/combobox';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { ChevronDown, X } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import { Tag } from '../../tag';
import type { SelectOption, SelectSize } from '../select.types';

/** Сколько тегов рендерить в триггере; остальные сворачиваются в «+N» */
const MAX_TRIGGER_TAGS = 10;

const tagSizeClassesMap: Record<SelectSize, string> = {
  sm: 'istok-tag--sm',
  md: 'istok-tag--md',
  lg: 'istok-tag--lg',
  xl: 'istok-tag--lg',
};

type SelectTriggerProps = {
  selected: SelectOption[];
  multiple: boolean;
  placeholder: string;
  size: SelectSize;
  disabled: boolean;
  showClear: boolean;
  clearLabel: string;
  onClear: () => void;
  startIcon?: LucideIcon;
  startIconProps?: LucideProps;
  className?: string;
};

/**
 * Кнопка-триггер и кнопка очистки. Очистка лежит рядом, а не внутри триггера,
 * чтобы не вкладывать интерактивный элемент в `<button>`.
 */
export const SelectTrigger: FC<SelectTriggerProps> = ({
  selected,
  multiple,
  placeholder,
  size,
  disabled,
  showClear,
  clearLabel,
  onClear,
  startIcon: StartIcon,
  startIconProps,
  className,
}) => {
  const hasValue = selected.length > 0;
  const canClear = showClear && hasValue && !disabled;

  return (
    <>
      <Combobox.Trigger
        className={cn(
          `
            istok-select__trigger flex w-full cursor-pointer items-center gap-2
            overflow-hidden text-left transition-all
          `,
          `
            h-(--istok-select-trigger-height)
            rounded-(--istok-select-trigger-radius)
            px-(--istok-select-trigger-padding-x)
            py-(--istok-select-trigger-padding-y)
          `,
          `
            border border-(--istok-select-trigger-border)
            bg-(--istok-select-trigger-bg) text-(--istok-select-trigger-fg)
          `,
          `
            focus:border-(--istok-select-trigger-border-focus)
            focus:bg-(--istok-select-trigger-bg-focus)
            focus:[box-shadow:var(--istok-select-trigger-focus-shadow)]
            focus:outline-none
          `,
          `aria-invalid:[box-shadow:inset_0_0_0_2px_var(--color-negative-500)]`,
          'data-popup-open:[&>.istok-select__chevron]:rotate-180',
          !disabled && 'hover:bg-(--istok-select-trigger-bg-hover)',
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        {StartIcon && (
          <StartIcon
            {...startIconProps}
            className={cn(
              `
                istok-select__start-icon shrink-0
                text-(--istok-select-trigger-start-icon)
              `,
              'size-(--istok-select-start-icon-size)',
              startIconProps?.className,
            )}
          />
        )}
        <span className="
          istok-select__value relative flex min-h-6 min-w-0 flex-1 items-center
          overflow-hidden
        "
        >
          {!hasValue && (
            <span
              className="
                istok-select__placeholder truncate
                text-(length:--istok-select-placeholder-font)
                text-(--istok-select-trigger-placeholder)
              "
            >
              {placeholder}
            </span>
          )}
          {hasValue && multiple && (
            <span className="flex items-center gap-1">
              {selected.slice(0, MAX_TRIGGER_TAGS).map(option => (
                <Tag
                  key={option.value}
                  variant="ghost"
                  color="primary"
                  render={<span />}
                  className={cn(
                    'istok-select__value-tag whitespace-nowrap',
                    tagSizeClassesMap[size],
                  )}
                >
                  {option.label}
                </Tag>
              ))}
              {selected.length > MAX_TRIGGER_TAGS && (
                <span className="
                  istok-select__value-more shrink-0 text-control-sm
                  text-neutral-500
                "
                >
                  +
                  {selected.length - MAX_TRIGGER_TAGS}
                </span>
              )}
            </span>
          )}
          {hasValue && !multiple && (
            <span className="truncate text-(length:--istok-select-value-font)">
              {selected[0]?.label}
            </span>
          )}
        </span>
        {/* Место под кнопку очистки, которая позиционирована поверх триггера */}
        {canClear && <span aria-hidden className="size-5 shrink-0" />}
        <ChevronDown
          aria-hidden
          className="
            istok-select__chevron size-(--istok-select-chevron-size) shrink-0
            text-(--istok-select-trigger-fg) transition-transform
          "
        />
      </Combobox.Trigger>
      {canClear && (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={onClear}
          className="
            istok-select__clear absolute top-1/2
            right-[calc(var(--istok-select-trigger-padding-x)+var(--istok-select-chevron-size)+0.5rem)]
            -translate-y-1/2 cursor-pointer rounded-sm p-0.5 text-neutral-500
            transition-colors
            hover:bg-neutral-200 hover:text-neutral-700
            focus-visible:[box-shadow:0_0_0_2px_var(--focus-ring-color)]
            focus-visible:outline-none
          "
        >
          <X className="size-4" />
        </button>
      )}
    </>
  );
};
