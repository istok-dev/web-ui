import type { PropsWithChildren } from 'react';

export type ModalProps = PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    onClose: () => void;
    classes?: {
      root?: string;
      content?: string;
      backdrop?: string;
    };
  }
>;

export type ModalHeaderProps = PropsWithChildren<{
  title?: string;
  onClose: () => void;
}>;

export type ModalBodyProps = PropsWithChildren<unknown>;

export type ModalHeaderFC = {
  (props: ModalHeaderProps): React.ReactNode;
};

export type ModalFC = {
  (props: ModalProps): React.ReactNode;
  Header: ModalHeaderFC;
  Body: ModalBodyFC;
};

export type ModalBodyFC = {
  (props: ModalBodyProps): React.ReactNode;
};
