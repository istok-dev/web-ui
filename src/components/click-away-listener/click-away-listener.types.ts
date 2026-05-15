import { PropsWithChildren } from 'react';

export type ClickAwayListenerProps = PropsWithChildren<{
  onAwayClick: (event: MouseEvent | TouchEvent) => void;
  disabled?: boolean;
}>;
