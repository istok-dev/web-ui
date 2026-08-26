'use client';

import { Check, Minus } from 'lucide-react';
import { useRef, useEffect, useState, useId } from 'react';
import type { ChangeEvent } from 'react';

import { cn } from '@/utils/cn';

import type { CheckboxItemFC } from '../checkbox.types';

export const CheckboxItem: CheckboxItemFC = ({
  label,
  description,
  className,
  classes,
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  indeterminate = false,
  name,
  value,
  readOnly,
  id: propsId,
  pt,
  ...rootProps
}) => {
  const generatedId = useId();
  const inputId = propsId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setIsChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const checkboxChecked = isControlled ? Boolean(checked) : isChecked;
  const isIndeterminate = indeterminate;

  return (
    <label
      {...rootProps}
      htmlFor={inputId}
      className={cn(
        'istok-checkbox__item group flex items-start p-1',
        'gap-(--istok-checkbox-gap)',
        disabled && 'cursor-not-allowed opacity-50',
        !disabled && 'cursor-pointer',
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          {...pt?.input}
          ref={inputRef}
          id={inputId}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          readOnly={readOnly}
          className={cn('sr-only', pt?.input?.className)}
          onChange={handleChange}
        />
        <div
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
            !disabled && [
              checkboxChecked
              && !isIndeterminate
              && 'border-none bg-primary-600',
              !checkboxChecked
              && !isIndeterminate
              && `
                border-neutral-300
                group-hover:border-primary-600
              `,
              isIndeterminate && 'border-primary-600 bg-primary-600',
              'cursor-pointer',
            ],
            disabled && [
              'cursor-not-allowed',
              checkboxChecked || isIndeterminate
                ? 'border-neutral-400 bg-transparent'
                : 'border-neutral-300 bg-transparent',
            ],
          )}
        >
          {isIndeterminate
            ? (
              <Minus
                className={cn(
                  'istok-checkbox__icon transition-all',
                  'size-(--istok-checkbox-icon-size)',
                  'scale-100 opacity-100',
                  disabled ? 'text-neutral-400' : 'text-neutral-50',
                )}
              />
            )
            : (
              <Check
                className={cn(
                  'istok-checkbox__icon transition-all',
                  'size-(--istok-checkbox-icon-size)',
                  checkboxChecked
                    ? 'scale-100 opacity-100'
                    : `scale-0 opacity-0`,
                  disabled ? 'text-neutral-400' : 'text-neutral-50',
                )}
              />
            )}
        </div>
      </div>
      {(label || description) && (
        <div className="min-w-0 flex-1">
          {label && (
            <span
              className={cn(
                'istok-checkbox__item-label block font-medium text-neutral-900',
                `
                  text-(length:--istok-checkbox-label-font-size)
                  leading-(--istok-checkbox-label-line-height)
                `,
                classes?.label,
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <p
              className={cn(
                'istok-checkbox__item-description mt-0.5 block text-neutral-500',
                `
                  text-(length:--istok-checkbox-description-font-size)
                  leading-(--istok-checkbox-description-line-height)
                `,
                classes?.description,
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </label>
  );
};
