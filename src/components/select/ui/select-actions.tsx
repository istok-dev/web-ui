'use client';

import type { FC } from 'react';

import { cn } from '@/utils/cn';

import { toAriaChecked, type SelectionState } from './select.utils';
import { CheckboxIndicator } from '../../checkbox';

type SelectActionsProps = {
  /** Состояние «выбрать все» относительно видимых опций; `undefined` — кнопка скрыта */
  selectAllState?: SelectionState;
  onSelectAll: () => void;
  selectAllLabel: string;
  /** Показывать кнопку сброса */
  canClear: boolean;
  onClear: () => void;
  clearLabel: string;
};

export const SelectActions: FC<SelectActionsProps> = ({
  selectAllState,
  onSelectAll,
  selectAllLabel,
  canClear,
  onClear,
  clearLabel,
}) => (
  <div className="istok-select__actions flex items-center justify-between p-2.5">
    {selectAllState && (
      <button
        type="button"
        role="checkbox"
        aria-checked={toAriaChecked(selectAllState)}
        onClick={onSelectAll}
        className="
          group flex cursor-pointer items-center gap-1.5 text-control-md
          text-neutral-900 transition-colors
        "
      >
        <CheckboxIndicator
          size="sm"
          checked={selectAllState === 'all'}
          indeterminate={selectAllState === 'some'}
        />
        {selectAllLabel}
      </button>
    )}
    {canClear && (
      <button
        type="button"
        onClick={onClear}
        className={cn(
          `
            cursor-pointer text-control-md text-primary-700 transition-colors
            hover:text-neutral-900
          `,
          !selectAllState && 'ml-auto',
        )}
      >
        {clearLabel}
      </button>
    )}
  </div>
);
