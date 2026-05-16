'use client';

import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';

import { cn } from '@/utils/cn';

import type { SwitchProps, SwitchSize } from '../switch.types';

const sizeClassesMap: Record<SwitchSize, string> = {
  sm: 'istok-switch--sm',
  md: 'istok-switch--md',
  lg: 'istok-switch--lg',
};

export const Switch: FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  className,
  ...inputProps
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={cn(
        'istok-switch',
        sizeClassesMap[size],
        {
          'istok-switch--checked': isChecked,
          'istok-switch--disabled': disabled,
        },
        className,
      )}
    >
      <input
        type="checkbox"
        role="switch"
        aria-checked={isChecked}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        className="istok-switch__input sr-only"
        {...inputProps}
      />
      <span className="istok-switch__track">
        <span className="istok-switch__thumb" />
      </span>
    </label>
  );
};
