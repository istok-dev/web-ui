'use client';

import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import { cn } from '@/utils/cn';

import type {
  SwitchFieldListProps,
  SwitchFieldProps,
  SwitchProps,
  SwitchSize,
} from '../switch.types';

const sizeClassesMap: Record<SwitchSize, string> = {
  sm: 'istok-switch--sm',
  md: 'istok-switch--md',
  lg: 'istok-switch--lg',
};

const SwitchRoot: FC<SwitchProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  className,
  pt,
  ...rootProps
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
      {...rootProps}
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
        {...pt?.input}
        type="checkbox"
        role="switch"
        aria-checked={isChecked}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        className={cn('istok-switch__input sr-only', pt?.input?.className)}
      />
      <span className="istok-switch__track">
        <span className="istok-switch__thumb" />
      </span>
    </label>
  );
};

const SwitchField: FC<SwitchFieldProps> = ({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  size = 'md',
  disabled = false,
  className,
  classes,
  pt,
  ...rootProps
}) => {
  return (
    <div
      {...rootProps}
      className={cn(
        'istok-switch-field flex items-center gap-4 py-3',
        disabled && 'opacity-50',
        className,
        classes?.root,
      )}
    >
      <div
        className={cn(
          'istok-switch-field__content flex min-w-0 flex-1 flex-col gap-0.5',
          classes?.content,
        )}
      >
        <span
          className={cn(
            `
              istok-switch-field__label text-control-md font-medium
              text-neutral-950
            `,
            classes?.label,
          )}
        >
          {label}
        </span>
        {description && (
          <span
            className={cn(
              `
                istok-switch-field__description text-[13px]/4.5
                tracking-[-0.15px] text-neutral-500
              `,
              classes?.description,
            )}
          >
            {description}
          </span>
        )}
      </div>
      <div
        className={cn(
          'istok-switch-field__control shrink-0',
          classes?.control,
        )}
      >
        <SwitchRoot
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          size={size}
          disabled={disabled}
          pt={pt}
        />
      </div>
    </div>
  );
};

const SwitchFieldList: FC<SwitchFieldListProps> = ({
  children,
  className,
  ...rootProps
}) => {
  return (
    <div
      {...rootProps}
      className={cn(
        'istok-switch-field-list flex flex-col divide-y divide-neutral-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

type SwitchComponent = FC<SwitchProps> & {
  Field: typeof SwitchField;
  FieldList: typeof SwitchFieldList;
};

export const Switch = SwitchRoot as SwitchComponent;
Switch.Field = SwitchField;
Switch.FieldList = SwitchFieldList;
