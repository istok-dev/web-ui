'use client';

import { ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

import { BottomSheet } from '../../bottom-sheet';
import type { DropdownSubmenuFC } from '../dropdown.type';
import { useDropdownContext } from './dropdown-context';
import { DropdownItem } from './dropdown-item';

export const DropdownSubmenu: DropdownSubmenuFC = ({
  children,
  label,
  className,
  contentClassName,
  contentStyle,
  side = 'right',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  endIcon,
  disabled = false,
  onClick,
  ...itemProps
}) => {
  const { presentation } = useDropdownContext();
  const isSheet = presentation === 'sheet';

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;
  const submenuId = useId();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleOpen = () => {
    if (disabled || isSheet) {
      return;
    }
    clearCloseTimer();
    setOpen(true);
  };

  const handleClose = () => {
    if (isSheet) {
      return;
    }
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  useEffect(() => () => clearCloseTimer(), []);

  const trigger = (
    <DropdownItem
      {...itemProps}
      label={label}
      disabled={disabled}
      closeOnClick={false}
      endIcon={endIcon ?? ChevronRight}
      className={cn(open && !isSheet && 'bg-(--istok-dropdown-item-bg-hover)', className)}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? submenuId : undefined}
      onClick={() => {
        if (disabled) {
          return;
        }
        setOpen(!open);
        onClick?.();
      }}
      onKeyDown={(event) => {
        if (disabled || isSheet) {
          return;
        }
        if (event.key === 'ArrowRight' && side === 'right') {
          event.preventDefault();
          setOpen(true);
        }
        if (event.key === 'ArrowLeft' && side === 'left') {
          event.preventDefault();
          setOpen(true);
        }
        if (event.key === 'ArrowLeft' && side === 'right' && open) {
          event.preventDefault();
          setOpen(false);
        }
        if (event.key === 'ArrowRight' && side === 'left' && open) {
          event.preventDefault();
          setOpen(false);
        }
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
        }
      }}
    />
  );

  if (isSheet) {
    return (
      <>
        {trigger}
        <BottomSheet open={open} onOpenChange={setOpen} showBackdrop={false}>
          <BottomSheet.Header title={label} />
          <BottomSheet.Body>
            <div
              id={submenuId}
              role="menu"
              className={cn('-mx-2 flex flex-col', contentClassName)}
              style={contentStyle}
            >
              {children}
            </div>
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          handleClose();
        }
      }}
    >
      {trigger}
      {open && (
        <div
          id={submenuId}
          role="menu"
          className={cn(
            'absolute z-50',
            side === 'right'
              ? 'top-0 left-full pl-1.5'
              : 'top-0 right-full pr-1.5',
          )}
        >
          <div
            className={cn('relative istok-dropdown', contentClassName)}
            style={contentStyle}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
