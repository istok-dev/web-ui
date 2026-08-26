'use client';

import { createContext } from 'react';

import { cn } from '@/utils/cn';

import type { CheckboxFC, CheckboxSize } from '../checkbox.types';
import { CheckboxItem } from './checkbox-item';

const sizeClassesMap: Record<CheckboxSize, string> = {
  sm: 'istok-checkbox--sm',
  md: 'istok-checkbox--md',
  lg: 'istok-checkbox--lg',
};

export const CheckboxContext = createContext<CheckboxSize>('md');

export const Checkbox: CheckboxFC = (props) => {
  const { children, size = 'md', className } = props;

  return (
    <CheckboxContext value={size}>
      <div
        className={cn(
          'istok-checkbox space-y-2',
          sizeClassesMap[size],
          className,
        )}
      >
        {children}
      </div>
    </CheckboxContext>
  );
};

Checkbox.Item = CheckboxItem;
