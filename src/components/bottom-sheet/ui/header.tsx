import { Drawer } from '@base-ui/react/drawer';
import { X } from 'lucide-react';

import { cn } from '@/utils/cn';

import type {
  BottomSheetHeaderFC,
  BottomSheetHeaderProps,
} from '../bottom-sheet.types';

export const BottomSheetHeader: BottomSheetHeaderFC = (
  props: BottomSheetHeaderProps,
) => {
  const {
    title,
    description,
    children,
    onClose,
    showClose = true,
    closeLabel = 'Закрыть',
  } = props;

  const renderTitle = () => {
    if (title) {
      return (
        <div className="flex min-w-0 flex-col gap-1">
          <Drawer.Title className="
            text-title-md font-bold tracking-[-0.6px] text-text-strong
          "
          >
            {title}
          </Drawer.Title>
          {description && (
            <Drawer.Description className="text-body-md text-text-secondary">
              {description}
            </Drawer.Description>
          )}
        </div>
      );
    }
    return children;
  };

  return (
    <div className="
      flex shrink-0 items-start justify-between gap-4 bg-surface-card px-5 pb-3
    "
    >
      <div className="min-w-0 flex-1">{renderTitle()}</div>
      {showClose && (
        <Drawer.Close
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
                  flex size-10 shrink-0 cursor-pointer items-center
                  justify-center rounded-full bg-neutral-100 text-neutral-600
                  transition-colors
                `,
                'hover:bg-neutral-200',
              )}
            >
              <X className="size-4.5" />
            </button>
          )}
        />
      )}
    </div>
  );
};
