'use client';

import {
  createContext,
  use,
  useId,
  useState,
  type FC,
} from 'react';

import { cn } from '@/utils/cn';

import type {
  RadioCardGroupProps,
  RadioCardProps,
  RadioCardSize,
} from '../radio-card.types';

type RadioCardContextValue = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const RadioCardContext = createContext<RadioCardContextValue | null>(null);

const sizeClassesMap: Record<RadioCardSize, string> = {
  m: 'istok-radio-card--m',
  l: 'istok-radio-card--l',
};

const RadioCardRoot: FC<RadioCardProps> = ({
  name: nameProp,
  value,
  checked: checkedProp,
  onChange: onChangeProp,
  label,
  description,
  size = 'm',
  disabled: disabledProp = false,
  children,
  className,
}) => {
  const group = use(RadioCardContext);
  const generatedId = useId();
  const name = nameProp ?? group?.name ?? generatedId;
  const disabled = disabledProp || Boolean(group?.disabled);
  const inGroup = group !== null;

  const [uncontrolledChecked, setUncontrolledChecked] = useState(false);

  const checked = inGroup
    ? group.value === value
    : checkedProp !== undefined
      ? checkedProp
      : uncontrolledChecked;

  const handleChange = () => {
    if (disabled) return;
    if (inGroup) {
      group.onChange?.(value);
    }
    else if (checkedProp === undefined) {
      setUncontrolledChecked(true);
    }
    onChangeProp?.(value);
  };

  return (
    <div
      className={cn(
        'istok-radio-card',
        sizeClassesMap[size],
        className,
      )}
    >
      <label
        className={cn(
          `
            istok-radio-card__card flex cursor-pointer items-start
            gap-(--istok-radio-card-gap) rounded-2xl transition-colors
          `,
          'p-(--istok-radio-card-padding)',
          'bg-(--istok-radio-card-bg)',
          checked && [
            'bg-(--istok-radio-card-bg-checked)',
            '[box-shadow:var(--istok-radio-card-ring-checked)]',
          ],
          !checked && !disabled && 'hover:bg-(--istok-radio-card-bg-hover)',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <span className="
          relative flex size-9 shrink-0 items-center justify-center
        "
        >
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
          />
          <span
            className={cn(
              `
                istok-radio-card__dot size-(--istok-radio-card-dot-size)
                rounded-full transition-colors
              `,
              checked
                ? `
                  bg-(--istok-radio-card-dot-bg-checked)
                  [box-shadow:var(--istok-radio-card-dot-ring-checked)]
                `
                : `
                  bg-(--istok-radio-card-dot-bg)
                  [box-shadow:var(--istok-radio-card-dot-ring)]
                `,
            )}
            aria-hidden
          />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'istok-radio-card__label block font-medium text-neutral-900',
              `
                text-(length:--istok-radio-card-label-font)
                leading-(--istok-radio-card-label-line)
              `,
            )}
          >
            {label}
          </span>
          {description && (
            <span
              className={cn(
                `istok-radio-card__description mt-0.5 block text-neutral-500`,
                `
                  text-(length:--istok-radio-card-description-font)
                  leading-(--istok-radio-card-description-line)
                `,
              )}
            >
              {description}
            </span>
          )}
        </span>
      </label>
      {checked && children
        ? (
          <div
            className="
              istok-radio-card__content mt-3 pl-(--istok-radio-card-dot-slot)
            "
          >
            {children}
          </div>
        )
        : null}
    </div>
  );
};

const RadioCardGroup: FC<RadioCardGroupProps> = ({
  value: valueProp,
  defaultValue,
  onChange,
  name: nameProp,
  gap = 12,
  disabled = false,
  className,
  children,
}) => {
  const generatedId = useId();
  const name = nameProp ?? generatedId;
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolledValue;

  const handleChange = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onChange?.(next);
  };

  const gapStyle = typeof gap === 'number' ? `${gap}px` : gap;

  return (
    <RadioCardContext
      value={{ name, value, onChange: handleChange, disabled }}
    >
      <div
        role="radiogroup"
        className={cn('istok-radio-card-group flex flex-col', className)}
        style={{ gap: gapStyle }}
      >
        {children}
      </div>
    </RadioCardContext>
  );
};

type RadioCardComponent = FC<RadioCardProps> & {
  Group: typeof RadioCardGroup;
};

export const RadioCard = RadioCardRoot as RadioCardComponent;
RadioCard.Group = RadioCardGroup;
