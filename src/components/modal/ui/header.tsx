import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';

import type { ModalHeaderFC, ModalHeaderProps } from '../modal.types';

export const ModalHeader: ModalHeaderFC = (props: ModalHeaderProps) => {
  const { title, children, onClose } = props;

  const renderTitle = () => {
    if (title) {
      return (
        <BaseDialog.Title className="
          text-title-lg font-bold tracking-[-0.6px] text-(--text-strong)
        "
        >
          {title}
        </BaseDialog.Title>
      );
    }
    return children;
  };

  return (
    <div className="
      flex items-start justify-between bg-(--surface-card) px-6 py-5
    "
    >
      <div className="flex items-center gap-4">{renderTitle()}</div>
      <BaseDialog.Close
        render={closeProps => (
          <button
            {...closeProps}
            onClick={(e) => {
              onClose?.();
              (
                closeProps as React.ButtonHTMLAttributes<HTMLButtonElement>
              ).onClick?.(e);
            }}
            className="
              cursor-pointer rounded-full p-2 text-neutral-400
              hover:bg-neutral-800 hover:text-neutral-50
            "
          >
            <X className="size-6" />
          </button>
        )}
      />
    </div>
  );
};
