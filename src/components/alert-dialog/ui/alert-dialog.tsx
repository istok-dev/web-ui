'use client';

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import type { AlertDialogRoot } from '@base-ui/react/alert-dialog';
import { AlertTriangle, Info, Trash2 } from 'lucide-react';
import {
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type FC,
  type MouseEvent,
} from 'react';

import { Button, type ButtonColor, type ButtonProps } from '@/components/button';
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

/** Base UI Close прокидывает HTML `color?: string`, который конфликтует с ButtonColor. */
const closePropsForButton = (closeProps: object): ButtonProps => {
  const { color: _color, ...rest } = closeProps as {
    color?: unknown;
  } & ButtonProps;
  return rest;
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
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const actionsRef = useRef<AlertDialogRoot.Actions | null>(null);
  const Icon = icon ?? DEFAULT_ICONS[variant];

  const handleOpenChange = (
    nextOpen: boolean,
    eventDetails: AlertDialogRoot.ChangeEventDetails,
  ) => {
    if (!nextOpen && (eventDetails.reason === 'escape-key' || eventDetails.reason === 'outside-press')) {
      onCancel?.();
    }
    onOpenChange?.(nextOpen);
  };

  const handleBackdropPointer = (event: MouseEvent<HTMLDivElement>) => {
    if (!dismissOnBackdrop || event.target !== event.currentTarget) {
      return;
    }
    onCancel?.();
    actionsRef.current?.close();
  };

  return (
    <BaseAlertDialog.Root
      open={open}
      onOpenChange={handleOpenChange}
      actionsRef={actionsRef}
    >
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="
          istok-alert-dialog fixed inset-0 z-40
          bg-(--istok-alert-dialog-backdrop)
        "
        />
        <BaseAlertDialog.Viewport
          className="
            istok-alert-dialog fixed inset-0 z-50 flex items-center
            justify-center p-(--istok-alert-dialog-viewport-padding)
          "
          onClick={handleBackdropPointer}
        >
          <BaseAlertDialog.Popup
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initialFocus={cancelRef}
            className={cn(
              `
                istok-alert-dialog w-full max-w-(--istok-alert-dialog-max-width)
                rounded-(--istok-alert-dialog-radius)
                bg-(--istok-alert-dialog-bg) p-(--istok-alert-dialog-padding)
                shadow-(--istok-alert-dialog-shadow)
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
                    id={titleId}
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
                    id={descriptionId}
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
                <BaseAlertDialog.Close
                  render={closeProps => (
                    <Button
                      {...closePropsForButton(closeProps)}
                      variant="primary"
                      color={ACTION_COLOR[variant]}
                      size="md"
                      {...pt?.actionButton}
                      onClick={(e) => {
                        onAction?.();
                        pt?.actionButton?.onClick?.(e);
                        (
                          closeProps as ButtonHTMLAttributes<HTMLButtonElement>
                        ).onClick?.(e);
                      }}
                      className={cn(
                        'w-(--istok-alert-dialog-action-width)',
                        pt?.actionButton?.className,
                      )}
                    >
                      {actionLabel}
                    </Button>
                  )}
                />
                <BaseAlertDialog.Close
                  render={closeProps => (
                    <Button
                      {...closePropsForButton(closeProps)}
                      variant="secondary"
                      size="md"
                      {...pt?.cancelButton}
                      ref={cancelRef}
                      onClick={(e) => {
                        onCancel?.();
                        pt?.cancelButton?.onClick?.(e);
                        (
                          closeProps as ButtonHTMLAttributes<HTMLButtonElement>
                        ).onClick?.(e);
                      }}
                      className={cn(
                        'w-(--istok-alert-dialog-action-width)',
                        pt?.cancelButton?.className,
                      )}
                    >
                      {cancelLabel}
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
