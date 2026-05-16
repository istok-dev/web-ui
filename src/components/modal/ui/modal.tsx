import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

import type { ModalFC, ModalProps } from '../modal.types';
import { ModalBody } from './body';
import { ModalHeader } from './header';

export const Modal: ModalFC = (props: ModalProps) => {
  const { isOpen, onClose, children, className, classes, ...rest } = props;

  if (!isOpen) return null;

  const modalContent = (
    <div
      {...rest}
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center p-4',
        className,
        classes?.root,
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={cn('absolute inset-0 bg-neutral-900/80', classes?.backdrop)}
        onClick={() => {
          onClose();
        }}
      >
      </div>

      <div
        className={cn(
          `
            relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden
            rounded-2xl bg-neutral-50
          `,
          classes?.content,
        )}
      >
        {children}
      </div>
    </div>
  );

  if (typeof window === 'undefined') {
    return modalContent;
  }

  return createPortal(modalContent, document.body);
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
