'use client';

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import type { AlertDialogRoot } from '@base-ui/react/alert-dialog';
import { AlertTriangle, Info, Trash2 } from 'lucide-react';
import { useRef, useState, type FC, type MouseEvent } from 'react';

import { Button, type ButtonColor } from '@/components/button';
import { cn } from '@/utils/cn';

import type {
  AlertDialogProps,
  AlertDialogVariant,
  AlertDialogAlign,
} from '../alert-dialog.types';

const variantClassesMap: Record<AlertDialogVariant, string> = {
  negative: 'istok-alert-dialog--negative',
  warning: 'istok-alert-dialog--warning',
  info: 'istok-alert-dialog--info',
};

const alignClassesMap: Record<AlertDialogAlign, string> = {
  left: 'istok-alert-dialog--left',
  center: 'istok-alert-dialog--center',
};

const DEFAULT_ICONS = {
  negative: Trash2,
  warning: AlertTriangle,
  info: Info,
} as const;

const ACTION_COLOR: Record<AlertDialogVariant, ButtonColor> = {
  negative: 'negative',
  warning: 'warning',
  info: 'primary',
};

export const AlertDialog: FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  icon,
  title,
  text,
  variant = 'negative',
  align = 'left',
  cancelLabel = 'Отмена',
  onCancel,
  actionLabel,
  onAction,
  dismissOnBackdrop = false,
  className,
  children,
  pt,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const actionsRef = useRef<AlertDialogRoot.Actions | null>(null);
  // Ref, а не только state: проверка нужна синхронно внутри обработчиков,
  // которые вызываются до следующего рендера.
  const pendingRef = useRef(false);
  const [pending, setPending] = useState(false);
  const Icon = icon ?? DEFAULT_ICONS[variant];

  const setPendingState = (next: boolean) => {
    pendingRef.current = next;
    setPending(next);
  };

  const close = () => actionsRef.current?.close();

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: AlertDialogRoot.ChangeEventDetails,
  ) => {
    // Пока выполняется асинхронное действие, закрыть диалог нельзя.
    if (!nextOpen && pendingRef.current) {
      eventDetails.cancel();
      return;
    }
    if (!nextOpen && eventDetails.reason === 'escape-key') {
      onCancel?.();
    }
    onOpenChange?.(nextOpen);
  };

  const handleBackdropPointer = (event: MouseEvent<HTMLDivElement>) => {
    if (
      !dismissOnBackdrop
      || pendingRef.current
      || event.target !== event.currentTarget
    ) {
      return;
    }
    onCancel?.();
    close();
  };

  const handleAction = async (event: MouseEvent<HTMLButtonElement>) => {
    pt?.actionButton?.onClick?.(event);
    if (event.defaultPrevented) return;

    const result = onAction?.();
    if (result instanceof Promise) {
      setPendingState(true);
      try {
        await result;
      }
      catch (error) {
        // Диалог остаётся открытым, чтобы действие можно было повторить.
        setPendingState(false);
        reportError(error);
        return;
      }
      setPendingState(false);
    }
    close();
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    pt?.cancelButton?.onClick?.(event);
    if (event.defaultPrevented) return;

    onCancel?.();
    close();
  };

  return (
    <BaseAlertDialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      actionsRef={actionsRef}
    >
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="
          fixed inset-0 z-100 bg-(--istok-alert-dialog-backdrop)
          istok-alert-dialog
        "
        />
        <BaseAlertDialog.Viewport
          className="
            fixed inset-0 z-100 flex items-center justify-center
            p-(--istok-alert-dialog-viewport-padding) istok-alert-dialog
          "
          onClick={handleBackdropPointer}
        >
          <BaseAlertDialog.Popup
            initialFocus={cancelRef}
            aria-busy={pending || undefined}
            className={cn(
              `
                w-full max-w-(--istok-alert-dialog-max-width)
                rounded-(--istok-alert-dialog-radius)
                bg-(--istok-alert-dialog-bg) p-(--istok-alert-dialog-padding)
                shadow-(--istok-alert-dialog-shadow) istok-alert-dialog
              `,
              variantClassesMap[variant],
              alignClassesMap[align],
              className,
            )}
          >
            <div className="flex flex-col gap-(--istok-alert-dialog-gap)">
              <div
                className="
                  flex
                  [flex-direction:var(--istok-alert-dialog-header-direction)]
                  [align-items:var(--istok-alert-dialog-header-align)]
                  gap-(--istok-alert-dialog-header-gap)
                "
              >
                <div
                  className="
                    flex size-(--istok-alert-dialog-icon-circle-size) shrink-0
                    items-center justify-center
                    rounded-(--istok-alert-dialog-icon-circle-radius)
                    bg-(--istok-alert-dialog-icon-bg)
                    text-(--istok-alert-dialog-icon-color)
                  "
                >
                  <Icon className="size-(--istok-alert-dialog-icon-size)" />
                </div>
                <div
                  className="
                    flex min-w-0 flex-1 flex-col
                    gap-(--istok-alert-dialog-title-gap)
                    pt-(--istok-alert-dialog-text-offset)
                    [text-align:var(--istok-alert-dialog-text-align)]
                  "
                >
                  <BaseAlertDialog.Title
                    className="
                      text-(length:--istok-alert-dialog-title-font-size)
                      leading-(--istok-alert-dialog-title-line-height)
                      font-(--istok-alert-dialog-title-font-weight)
                      tracking-(--istok-alert-dialog-title-letter-spacing)
                      text-(--istok-alert-dialog-title-color)
                    "
                  >
                    {title}
                  </BaseAlertDialog.Title>
                  <BaseAlertDialog.Description
                    className="
                      text-(length:--istok-alert-dialog-body-font-size)
                      leading-(--istok-alert-dialog-body-line-height)
                      text-(--istok-alert-dialog-body-color)
                    "
                  >
                    {text}
                  </BaseAlertDialog.Description>
                </div>
              </div>
              {children}
              <div
                className="
                  flex
                  [flex-direction:var(--istok-alert-dialog-actions-direction)]
                  gap-(--istok-alert-dialog-actions-gap)
                "
              >
                <Button
                  variant="primary"
                  color={ACTION_COLOR[variant]}
                  size="md"
                  {...pt?.actionButton}
                  loading={pending || pt?.actionButton?.loading}
                  onClick={(event) => {
                    void handleAction(event);
                  }}
                  className={cn(
                    'w-(--istok-alert-dialog-action-width)',
                    pt?.actionButton?.className,
                  )}
                >
                  {actionLabel}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  {...pt?.cancelButton}
                  ref={cancelRef}
                  disabled={pending || pt?.cancelButton?.disabled}
                  onClick={handleCancel}
                  className={cn(
                    'w-(--istok-alert-dialog-action-width)',
                    pt?.cancelButton?.className,
                  )}
                >
                  {cancelLabel}
                </Button>
              </div>
            </div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
};
