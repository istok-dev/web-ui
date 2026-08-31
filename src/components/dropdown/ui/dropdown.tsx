'use client';

import { Popover } from '@base-ui/react/popover';
import { cloneElement, isValidElement, useCallback, useMemo, useState } from 'react';
import type { MouseEvent, ReactElement } from 'react';

import { cn } from '@/utils/cn';
import { useMediaQuery } from '@/utils/use-media-query';

import { BottomSheet } from '../../bottom-sheet';
import { Menu } from '../../menu';
import type { DropdownFC } from '../dropdown.type';
import { DROPDOWN_MOBILE_MEDIA_QUERY } from '../dropdown.type';
import { DropdownProvider } from './dropdown-context';
import { DropdownItem } from './dropdown-item';
import { DropdownSeparator } from './dropdown-separator';
import { DropdownSubmenu } from './dropdown-submenu';

export const Dropdown: DropdownFC = (props) => {
  const {
    children,
    trigger,
    className,
    style,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    header,
    classes,
    positionerProps,
  } = props;

  const isMobile = useMediaQuery(DROPDOWN_MOBILE_MEDIA_QUERY);
  const isAdaptive
    = openProp !== undefined
      || onOpenChange !== undefined
      || defaultOpen
      || trigger !== undefined;

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

  const isSheet = isAdaptive && isMobile;

  const contextValue = useMemo(
    () => ({
      closeRoot,
      isSheet,
    }),
    [closeRoot, isSheet],
  );

  const menu = (
    <DropdownProvider value={contextValue}>
      <Menu
        className={className}
        style={style}
        header={header}
        classes={classes}
        unstyled={isSheet}
      >
        {children}
      </Menu>
    </DropdownProvider>
  );

  if (!isAdaptive) {
    return menu;
  }

  const triggerElement = isValidElement(trigger)
    ? trigger as ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>
    : undefined;

  if (isSheet) {
    const mobileTrigger = triggerElement
      // eslint-disable-next-line @eslint-react/no-clone-element
      ? cloneElement(triggerElement, {
        onClick: (event: MouseEvent<HTMLElement>) => {
          triggerElement.props.onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(true);
          }
        },
      })
      : null;

    return (
      <>
        {mobileTrigger}
        <BottomSheet open={open} onOpenChange={setOpen}>
          <BottomSheet.Body>
            {menu}
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  }

  if (triggerElement) {
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger render={triggerElement} nativeButton={false} />
        <Popover.Portal>
          <Popover.Positioner
            align="start"
            side="bottom"
            sideOffset={8}
            {...positionerProps}
            className={cn('z-50', positionerProps?.className)}
          >
            <Popover.Popup
              className="border-0 bg-transparent p-0 shadow-none outline-none"
            >
              {menu}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  if (!open) {
    return null;
  }

  return menu;
};

Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Submenu = DropdownSubmenu;
