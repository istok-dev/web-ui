'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';

import { cn } from '@/utils/cn';

import type { ModalFC, ModalProps } from '../modal.types';
import { ModalBody } from './body';
import { ModalFooter } from './footer';
import { ModalHeader } from './header';

export const Modal: ModalFC = (props: ModalProps) => {
  const { open, onOpenChange, children, className, classes, ...rest } = props;

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={cn(
            'fixed inset-0 z-100 bg-overlay-scrim',
            classes?.backdrop,
          )}
        />
        <BaseDialog.Viewport
          {...rest}
          className={cn(
            `
              fixed inset-0 z-100 flex items-stretch justify-center
              overflow-hidden p-0
              tablet:items-center tablet:p-4
            `,
            className,
            classes?.root,
          )}
        >
          <BaseDialog.Popup
            className={cn(
              `
                relative flex size-full min-h-0 flex-col overflow-hidden
                rounded-none bg-surface-card
                tablet:h-auto tablet:max-h-[90vh] tablet:max-w-5xl
                tablet:rounded-5xl tablet:shadow-(--shadow-2xl)
              `,
              classes?.content,
            )}
          >
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
