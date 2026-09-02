'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import type { ToastObject } from '@base-ui/react/toast';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

import type { ToastData, ToastVariant } from '../toast.types';

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-positive-500 text-neutral-50 border-positive-600',
  error: 'bg-negative-500 text-neutral-50 border-negative-600',
  info: 'bg-info-500 text-neutral-50 border-info-600',
  warning: 'bg-warning-500 text-neutral-50 border-warning-600',
};

const variantIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

type ToastItemProps = {
  toast: ToastObject<ToastData>;
};

export const ToastItem: FC<ToastItemProps> = ({ toast }) => {
  const variant: ToastVariant = toast.data?.variant ?? 'info';
  const Icon = variantIcons[variant];

  return (
    <BaseToast.Root
      toast={toast}
      className={cn(
        `
          max-w-125 min-w-75 rounded-2xl border shadow-lg
          transition-[transform,opacity] duration-300 ease-out
          data-ending-style:translate-x-full data-ending-style:opacity-0
          data-starting-style:translate-x-full data-starting-style:opacity-0
        `,
        variantStyles[variant],
      )}
    >
      <BaseToast.Content className="flex items-center gap-3 px-4 py-3">
        <Icon size={20} className="shrink-0" />
        <p className="flex-1 text-body-sm font-medium">{toast.title}</p>
        <BaseToast.Close
          className="
            shrink-0 transition-opacity
            hover:opacity-80
          "
          aria-label="Закрыть"
        >
          <X size={18} />
        </BaseToast.Close>
      </BaseToast.Content>
    </BaseToast.Root>
  );
};

type ToastPreviewProps = {
  variant: ToastVariant;
  message: string;
};

export const ToastPreview: FC<ToastPreviewProps> = ({ variant, message }) => {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        `
          flex max-w-125 min-w-75 items-center gap-3 rounded-2xl border px-4
          py-3 shadow-lg
        `,
        variantStyles[variant],
      )}
    >
      <Icon size={20} className="shrink-0" />
      <p className="flex-1 text-body-sm font-medium">{message}</p>
      <button
        type="button"
        className="
          shrink-0 transition-opacity
          hover:opacity-80
        "
        aria-label="Закрыть"
      >
        <X size={18} />
      </button>
    </div>
  );
};
