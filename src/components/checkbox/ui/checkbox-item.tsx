'use client';

import { useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { cn } from '@/utils/cn';

import type { CheckboxItemFC } from '../checkbox.types';
import { CheckboxIndicator } from './checkbox-indicator';

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
  required,
  id: propsId,
  ref,
  pt,
  ...rootProps
}) => {
  const generatedId = useId();
  const inputId = propsId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

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
        classes?.root,
      )}
    >
      <span className="relative flex items-center justify-center">
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
          required={required}
          className={cn('peer sr-only', pt?.input?.className)}
          onChange={handleChange}
        />
        <CheckboxIndicator
          checked={checkboxChecked}
          indeterminate={indeterminate}
          disabled={disabled}
        />
      </span>
      {(label || description) && (
        <span className="min-w-0 flex-1">
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
            <span
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
            </span>
          )}
        </span>
      )}
    </label>
  );
};
