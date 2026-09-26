'use client';

import { useRender } from '@base-ui/react/use-render';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';

import type { ClickAwayListenerProps } from '../click-away-listener.types';

export const ClickAwayListener: FC<ClickAwayListenerProps> = ({
  onAwayClick,
  disabled = false,
  render,
  ref,
  ...props
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  // Последний колбэк храним в ref, чтобы inline-функция не переподписывала
  // слушатель документа на каждом рендере.
  const onAwayClickRef = useRef(onAwayClick);

  useEffect(() => {
    onAwayClickRef.current = onAwayClick;
  });

  useEffect(() => {
    if (disabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      const element = elementRef.current;
      if (element && !element.contains(event.target as Node)) {
        onAwayClickRef.current(event);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [disabled]);

  return useRender({
    defaultTagName: 'div',
    render,
    ref: ref ? [elementRef, ref] : elementRef,
    props,
  });
};
