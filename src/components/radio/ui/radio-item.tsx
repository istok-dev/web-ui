'use client';

import { Info } from 'lucide-react';
import { useRef, useState } from 'react';

import { cn } from '@/utils/cn';

import { RadioItemFC } from '../radio.types';

export const RadioItem: RadioItemFC = ({
  label,
  description,
  showInfoIcon = false,
  onInfoClick,
  className,
  classes,
  disabled = false,
  checked,
  ...inputProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      setIsChecked(e.target.checked);
    }
    inputProps.onChange?.(e);
  };

  const radioChecked = checked !== undefined ? Boolean(checked) : isChecked;

  return (
    <label
      className={cn(
        `
          istok-radio__item group flex cursor-pointer items-start
          gap-(--istok-radio-gap)
        `,
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
        <input
          ref={inputRef}
          type="radio"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          onChange={handleChange}
          {...inputProps}
        />
        <div
          className={cn(
            `
              flex items-center justify-center rounded-full border-2
              bg-transparent transition-all
            `,
            'size-(--istok-radio-input-size)',
            disabled && 'cursor-not-allowed',
            !disabled && 'cursor-pointer',
            radioChecked
            && !disabled && [
              'border-(--istok-radio-input-bg) bg-(--istok-radio-input-bg)',
            ],
            !radioChecked
            && !disabled && [
              'border-(--istok-radio-input-border)',
              'group-hover:border-(--istok-radio-input-border-hover)',
            ],
            disabled && [
              radioChecked
                ? `
                  border-(--istok-radio-input-border-disabled)
                  bg-(--istok-radio-input-bg-disabled)
                `
                : 'border-(--istok-radio-input-border-disabled)',
            ],
          )}
        >
          <div
            className={cn(
              'size-full rounded-full transition-all',
              radioChecked
                ? 'scale-50 bg-(--istok-radio-input-dot)'
                : 'scale-0',
            )}
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'istok-radio__item-label font-medium text-neutral-900',
              `
                text-(length:--istok-radio-label-font-size)
                leading-(--istok-radio-label-line-height)
              `,
              classes?.label,
            )}
          >
            {label}
          </span>
          {showInfoIcon && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInfoClick?.();
              }}
              className="
                flex size-5 shrink-0 items-center justify-center rounded-full
                border border-positive-300 bg-positive-100 transition-colors
                hover:bg-positive-200
                disabled:opacity-50
              "
              disabled={disabled}
            >
              <Info size={12} className="text-positive-600" />
            </button>
          )}
        </div>
        {description && (
          <p
            className={cn(
              'istok-radio__item-description mt-0.5 text-neutral-500',
              `
                text-(length:--istok-radio-description-font-size)
                leading-(--istok-radio-description-line-height)
              `,
              classes?.description,
            )}
          >
            {description}
          </p>
        )}
      </div>
    </label>
  );
};
