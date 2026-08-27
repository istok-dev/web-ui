'use client';

import { useState, type FC, type MouseEvent } from 'react';

import { cn } from '@/utils/cn';

import { Switch } from '../../switch';
import type { SettingRowProps, SettingRowVariant } from '../setting-row.types';

const variantClassesMap: Record<SettingRowVariant, string> = {
  filled: 'istok-setting-row--filled',
  plain: 'istok-setting-row--plain',
};

export const SettingRow: FC<SettingRowProps> = ({
  label,
  description,
  control,
  checked: checkedProp,
  defaultChecked,
  onChange,
  variant = 'filled',
  disabled = false,
  className,
}) => {
  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const checked = isControlled ? checkedProp : internalChecked;
  const hasCustomControl = control !== undefined;

  const setChecked = (next: boolean) => {
    if (disabled) return;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const handleRowClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || hasCustomControl) return;
    const target = e.target as HTMLElement;
    if (target.closest('input, button, a, label')) return;
    setChecked(!checked);
  };

  return (
    <div
      onClick={handleRowClick}
      className={cn(
        'istok-setting-row flex items-center gap-4',
        variantClassesMap[variant],
        variant === 'filled' && [
          'rounded-(--istok-setting-row-radius)',
          'bg-(--istok-setting-row-bg)',
          'p-(--istok-setting-row-padding)',
        ],
        variant === 'plain' && [
          'bg-(--istok-setting-row-bg)',
          `
            px-(--istok-setting-row-padding-inline)
            py-(--istok-setting-row-padding-block)
          `,
          '[border-top:var(--istok-setting-row-border-top)]',
        ],
        !hasCustomControl && !disabled && 'cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <div className="istok-setting-row__content min-w-0 flex-1">
        <div className="
          istok-setting-row__label text-control-md font-medium text-neutral-950
        "
        >
          {label}
        </div>
        {description && (
          <div className="
            istok-setting-row__description mt-0.5 text-body-sm text-neutral-500
          "
          >
            {description}
          </div>
        )}
      </div>
      <div
        className="istok-setting-row__control shrink-0"
        onClick={e => e.stopPropagation()}
      >
        {hasCustomControl
          ? control
          : (
            <Switch
              checked={checked}
              onChange={setChecked}
              disabled={disabled}
              size="lg"
            />
          )}
      </div>
    </div>
  );
};
