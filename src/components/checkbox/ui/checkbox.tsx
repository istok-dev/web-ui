'use client';

import { createContext } from 'react';

import { cn } from '@/utils/cn';

import { CheckboxFC, CheckboxSize } from '../checkbox.types';
import { CheckboxItem } from './checkbox-item';

const sizeClassesMap: Record<CheckboxSize, string> = {
  s: 'istok-checkbox--s',
  m: 'istok-checkbox--m',
  l: 'istok-checkbox--l',
};

export const CheckboxContext = createContext<CheckboxSize>('m');

export const Checkbox: CheckboxFC = (props) => {
  const { children, defaultSize = 'm', className } = props;

  return (
    <CheckboxContext value={defaultSize}>
      <div
        className={cn(
          'istok-checkbox space-y-2',
          sizeClassesMap[defaultSize],
          className,
        )}
      >
        {children}
      </div>
    </CheckboxContext>
  );
};

Checkbox.Item = CheckboxItem;
