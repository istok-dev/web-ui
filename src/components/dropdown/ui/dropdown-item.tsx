'use client';

import { useCallback } from 'react';

import { Menu } from '../../menu';
import type { DropdownItemFC } from '../dropdown.type';
import { useDropdownContext } from './dropdown-context';

export const DropdownItem: DropdownItemFC = ({
  onClick,
  closeOnClick = true,
  ...props
}) => {
  const { closeRoot } = useDropdownContext();

  const handleClick = useCallback(async () => {
    await onClick?.();

    if (closeOnClick) {
      closeRoot();
    }
  }, [onClick, closeOnClick, closeRoot]);

  return (
    <Menu.Item
      {...props}
      onClick={handleClick}
    />
  );
};
