'use client';

import { useCallback, useMemo, useState } from 'react';

import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/utils/use-media-query';

import { BottomSheet } from '../../bottom-sheet';
import {
  DROPDOWN_MOBILE_MEDIA_QUERY,
  type DropdownFC,
} from '../dropdown.type';
import { DropdownProvider, type DropdownPresentation } from './dropdown-context';
import { DropdownItem } from './dropdown-item';
import { DropdownSeparator } from './dropdown-separator';
import { DropdownSubmenu } from './dropdown-submenu';

export const Dropdown: DropdownFC = (props) => {
  const {
    children,
    className,
    style,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    header,
    classes,
  } = props;

  const isMobile = useMediaQuery(DROPDOWN_MOBILE_MEDIA_QUERY);
  const isAdaptive
    = openProp !== undefined || onOpenChange !== undefined || defaultOpen;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const closeRoot = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const presentation: DropdownPresentation
    = isAdaptive && isMobile ? 'sheet' : 'panel';

  const contextValue = useMemo(
    () => ({
      presentation,
      closeRoot,
    }),
    [presentation, closeRoot],
  );

  const headerBlock = header
    ? (
      <div className={cn('mb-1.5 shrink-0', classes?.header)}>
        <div className="px-3 py-2">{header}</div>
        <div className="mx-3 h-px bg-neutral-200" aria-hidden />
      </div>
    )
    : null;

  const panel = (
    <div className={cn('relative istok-dropdown', className)} style={style}>
      {headerBlock}
      {children}
    </div>
  );

  if (!isAdaptive) {
    return (
      <DropdownProvider value={contextValue}>
        {panel}
      </DropdownProvider>
    );
  }

  if (presentation === 'sheet') {
    return (
      <DropdownProvider value={contextValue}>
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheet.Body>
            <div className={cn('-mx-2 flex flex-col', className)} style={style}>
              {headerBlock}
              {children}
            </div>
          </BottomSheet.Body>
        </BottomSheet>
      </DropdownProvider>
    );
  }

  if (!open) {
    return null;
  }

  return (
    <DropdownProvider value={contextValue}>
      {panel}
    </DropdownProvider>
  );
};

Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Submenu = DropdownSubmenu;
