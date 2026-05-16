'use client';

import { useEffect, useRef } from 'react';
import type { FC } from 'react';

import type { ClickAwayListenerProps } from '../click-away-listener.types';

export const ClickAwayListener: FC<ClickAwayListenerProps> = (props) => {
  const { children, onAwayClick, disabled = false } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (elementRef.current && !elementRef.current.contains(target)) {
        onAwayClick(event);
      }
    };

    document.addEventListener('mousedown', handleClickAway, true);
    document.addEventListener('touchstart', handleClickAway, true);

    return () => {
      document.removeEventListener('mousedown', handleClickAway, true);
      document.removeEventListener('touchstart', handleClickAway, true);
    };
  }, [onAwayClick, disabled]);

  return <div ref={elementRef}>{children}</div>;
};
