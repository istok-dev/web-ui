import type { DrawerRoot } from '@base-ui/react/drawer';
import type { PropsWithChildren, ReactNode } from 'react';

export type BottomSheetSnapPoint = DrawerRoot.SnapPoint;

export type BottomSheetProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Snap points for sheet height (fractions 0–1, px, or rem). */
    snapPoints?: BottomSheetSnapPoint[];
    snapPoint?: BottomSheetSnapPoint | null;
    defaultSnapPoint?: BottomSheetSnapPoint | null;
    onSnapPointChange?: (snapPoint: BottomSheetSnapPoint | null) => void;
    /** Show drag handle at the top. @default true */
    showHandle?: boolean;
    /** Show backdrop overlay. Set false for nested sheets. @default true */
    showBackdrop?: boolean;
    classes?: {
      root?: string;
      content?: string;
      backdrop?: string;
    };
  }
>;

export type BottomSheetHeaderProps = PropsWithChildren<{
  title?: string;
  description?: string;
  onClose?: () => void;
  /** Show close button. @default true */
  showClose?: boolean;
}>;

export type BottomSheetBodyProps = PropsWithChildren<unknown>;

export type BottomSheetFooterProps = PropsWithChildren<{
  start?: ReactNode;
  end?: ReactNode;
}>;

export type BottomSheetHeaderFC = {
  (props: BottomSheetHeaderProps): React.ReactNode;
};

export type BottomSheetBodyFC = {
  (props: BottomSheetBodyProps): React.ReactNode;
};

export type BottomSheetFooterFC = {
  (props: BottomSheetFooterProps): React.ReactNode;
};

export type BottomSheetFC = {
  (props: BottomSheetProps): React.ReactNode;
  Header: BottomSheetHeaderFC;
  Body: BottomSheetBodyFC;
  Footer: BottomSheetFooterFC;
};
