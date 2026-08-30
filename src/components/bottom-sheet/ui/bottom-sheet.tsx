'use client';

import { Drawer } from '@base-ui/react/drawer';

import { cn } from '@/utils/cn';

import type { BottomSheetFC, BottomSheetProps } from '../bottom-sheet.types';
import { BottomSheetBody } from './body';
import { BottomSheetFooter } from './footer';
import { BottomSheetHeader } from './header';

export const BottomSheet: BottomSheetFC = (props: BottomSheetProps) => {
  const {
    open,
    onOpenChange,
    children,
    className,
    classes,
    snapPoints,
    snapPoint,
    defaultSnapPoint,
    onSnapPointChange,
    showHandle = true,
    showBackdrop = true,
    ...rest
  } = props;

  return (
    <Drawer.Root
      open={open}
      onOpenChange={nextOpen => onOpenChange(nextOpen)}
      snapPoints={snapPoints}
      snapPoint={snapPoint}
      defaultSnapPoint={defaultSnapPoint}
      onSnapPointChange={
        onSnapPointChange
          ? nextSnapPoint => onSnapPointChange(nextSnapPoint)
          : undefined
      }
    >
      <Drawer.Portal>
        {showBackdrop && (
          <Drawer.Backdrop
            className={cn('istok-bottom-sheet__backdrop', classes?.backdrop)}
          />
        )}
        <Drawer.Viewport
          {...rest}
          className={cn(
            'fixed inset-0 z-100 flex items-end justify-center',
            className,
            classes?.root,
          )}
        >
          <Drawer.Popup
            className={cn('istok-bottom-sheet', classes?.content)}
          >
            {showHandle && (
              <div className="istok-bottom-sheet__handle" aria-hidden />
            )}
            <div className="istok-bottom-sheet__content">{children}</div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;
