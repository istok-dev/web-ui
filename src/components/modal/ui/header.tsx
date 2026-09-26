import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

import { cn } from '@/utils/cn';

import type { ModalHeaderFC, ModalHeaderProps } from '../modal.types';

export const ModalHeader: ModalHeaderFC = (props: ModalHeaderProps) => {
  const { title, description, children, onClose, closeLabel = 'Закрыть' } = props;

  const renderTitle = () => {
    if (title) {
      return (
        <div className="flex min-w-0 flex-col gap-1">
          <BaseDialog.Title className="
            text-title-lg font-bold tracking-[-0.6px] text-text-strong
          "
          >
            {title}
          </BaseDialog.Title>
          {description && (
            <BaseDialog.Description className="text-body-md text-text-secondary">
              {description}
            </BaseDialog.Description>
          )}
        </div>
      );
    }
    return children;
  };

  return (
    <div className="
      flex shrink-0 items-start justify-between gap-4 bg-surface-card px-8
      pt-[calc(1.25rem+env(safe-area-inset-top,0px))] pb-5
      tablet:pt-5
    "
    >
      <div className="min-w-0 flex-1">{renderTitle()}</div>
      <BaseDialog.Close
        render={closeProps => (
          <button
            {...closeProps}
            type="button"
            aria-label={closeLabel}
            onClick={(e) => {
              onClose?.();
              (
                closeProps as React.ButtonHTMLAttributes<HTMLButtonElement>
              ).onClick?.(e);
            }}
            className={cn(
              `
                flex size-10 shrink-0 cursor-pointer items-center justify-center
                rounded-full bg-neutral-100 text-neutral-600 transition-colors
              `,
              'hover:bg-neutral-200',
            )}
          >
            <X className="size-4.5" />
          </button>
        )}
      />
    </div>
  );
};
