import type { PropsWithChildren } from 'react';

export type ModalProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classes?: {
      root?: string;
      content?: string;
      backdrop?: string;
    };
  }
>;

export type ModalHeaderProps = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
}>;

export type ModalBodyProps = PropsWithChildren<unknown>;

export type ModalFooterProps = PropsWithChildren<unknown>;

export type ModalHeaderFC = {
  (props: ModalHeaderProps): React.ReactNode;
};

export type ModalBodyFC = {
  (props: ModalBodyProps): React.ReactNode;
};

export type ModalFooterFC = {
  (props: ModalFooterProps): React.ReactNode;
};

export type ModalFC = {
  (props: ModalProps): React.ReactNode;
  Header: ModalHeaderFC;
  Body: ModalBodyFC;
  Footer: ModalFooterFC;
};
