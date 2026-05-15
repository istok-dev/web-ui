'use client';

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { createElement } from 'react';

import { Button } from '@/components/button';
import { cn } from '@/utils/cn';

import type {
  AlertDialogProps,
  AlertDialogVariant,
  AlertDialogAlign,
} from '../alert-dialog.types';

const variantClassesMap: Record<AlertDialogVariant, string> = {
  positive: 'istok-alert-dialog--positive',
  negative: 'istok-alert-dialog--negative',
};

const alignClassesMap: Record<AlertDialogAlign, string> = {
  left: 'istok-alert-dialog--left',
  center: 'istok-alert-dialog--center',
};

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  icon,
  title,
  text,
  variant = 'positive',
  align = 'left',
  cancelLabel = 'Отмена',
  onCancel,
  actionLabel,
  onAction,
  className,
  children,
}) => {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="
          fixed inset-0 z-40 bg-neutral-900/80
        "
        />
        <BaseAlertDialog.Viewport className="
          fixed inset-0 z-50 flex items-center justify-center p-4
        "
        >
          <BaseAlertDialog.Popup
            className={cn(
              `istok-alert-dialog w-full max-w-100 rounded-xl bg-neutral-50 p-4`,
              variantClassesMap[variant],
              alignClassesMap[align],
              className,
            )}
          >
            <div className={cn('flex flex-col gap-4')}>
              <div
                className={cn(
                  'flex gap-3',
                  align === 'center' && 'flex-col items-center',
                )}
              >
                <div className="
                  flex shrink-0 text-(--istok-alert-dialog-icon-color)
                "
                >
                  {createElement(icon, {
                    className: 'size-8',
                  })}
                </div>
                <div
                  className={cn(
                    'flex min-w-0 flex-1 flex-col gap-1',
                    align === 'center' && 'items-center',
                  )}
                >
                  <BaseAlertDialog.Title
                    className={cn(
                      'text-title-md font-bold text-neutral-900',
                      align === 'center' && 'text-center',
                    )}
                  >
                    {title}
                  </BaseAlertDialog.Title>
                  <BaseAlertDialog.Description
                    className={cn(
                      'text-control-md text-neutral-800',
                      align === 'center' && 'text-center',
                    )}
                  >
                    {text}
                  </BaseAlertDialog.Description>
                </div>
              </div>
              {children}
              <div
                className={cn(
                  'flex gap-2',
                  align === 'center' && 'justify-center',
                  align === 'left' && 'justify-end',
                )}
              >
                <BaseAlertDialog.Close
                  render={closeProps => (
                    <Button
                      {...closeProps}
                      color={variant === 'positive' ? 'primary' : 'neutral'}
                      size="md"
                      onClick={(e) => {
                        onCancel?.();
                        (
                          closeProps as React.ButtonHTMLAttributes<HTMLButtonElement>
                        ).onClick?.(e);
                      }}
                      className={cn(align === 'center' && 'flex-1')}
                    >
                      {cancelLabel}
                    </Button>
                  )}
                />
                <BaseAlertDialog.Close
                  render={closeProps => (
                    <Button
                      {...closeProps}
                      color={variant === 'positive' ? 'primary' : 'negative'}
                      size="md"
                      onClick={(e) => {
                        onAction?.();
                        (
                          closeProps as React.ButtonHTMLAttributes<HTMLButtonElement>
                        ).onClick?.(e);
                      }}
                      className={cn(align === 'center' && 'flex-1')}
                    >
                      {actionLabel}
                    </Button>
                  )}
                />
              </div>
            </div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
};
