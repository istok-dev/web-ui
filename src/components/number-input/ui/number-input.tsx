'use client';

import { NumberField } from '@base-ui/react/number-field';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { NumberInputProps, NumberInputSize, NumberInputVariant } from '../number-input.types';

const sizeClassesMap: Record<NumberInputSize, string> = {
  s: 'istok-number-input--s',
  m: 'istok-number-input--m',
  l: 'istok-number-input--l',
};

const variantClassesMap: Record<NumberInputVariant, string> = {
  neutral: 'istok-number-input__input--neutral',
  solid: 'istok-number-input__input--solid',
  outline: 'istok-number-input__input--outline',
};

export const NumberInput: FC<NumberInputProps> = ({
  value,
  onValueChange,
  defaultValue,
  suffix,
  className,
  defaultSize = 'm',
  variant = 'neutral',
  invalid = false,
  disabled,
  readOnly,
  required,
  min,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  smallStep,
  largeStep,
  placeholder,
  name,
  id,
  locale,
  format,
  allowWheelScrub,
  snapOnStep,
  inputRef,
  onValueCommitted,
  classes,
}) => {
  return (
    <NumberField.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      min={min}
      max={max}
      step={step}
      smallStep={smallStep}
      largeStep={largeStep}
      name={name}
      id={id}
      locale={locale}
      format={format}
      allowWheelScrub={allowWheelScrub}
      snapOnStep={snapOnStep}
      inputRef={inputRef}
      onValueCommitted={onValueCommitted}
      className={cn(
        'istok-number-input',
        sizeClassesMap[defaultSize],
        {
          'istok-number-input--invalid': invalid,
          'istok-number-input--has-suffix': Boolean(suffix),
        },
        className,
      )}
    >
      <NumberField.Group
        className={cn(
          'istok-number-input__group',
          'flex w-full overflow-hidden transition-all outline-none',
          {
            'pointer-events-none border-neutral-200 bg-neutral-100 opacity-60':
              disabled,
          },
          classes?.group,
        )}
      >
        <div className="istok-number-input__input-wrap">
          <NumberField.Input
            placeholder={placeholder}
            className={cn(
              'istok-number-input__input',
              variantClassesMap[variant],
              'istok-number-input__input--no-end-adornment',
              classes?.input,
            )}
          />
          {suffix != null && (
            <span className="istok-number-input__suffix">{suffix}</span>
          )}
        </div>
        <div className="istok-number-input__spinners">
          <NumberField.Increment className="istok-number-input__increment">
            <ChevronUp className="istok-number-input__spinner-icon" />
          </NumberField.Increment>
          <NumberField.Decrement className="istok-number-input__decrement">
            <ChevronDown className="istok-number-input__spinner-icon" />
          </NumberField.Decrement>
        </div>
      </NumberField.Group>
    </NumberField.Root>
  );
};
