'use client';

import {
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import React, { useEffect } from 'react';

import { cn } from '@/utils/cn';

import { Toast as ToastType } from '../toast.types';

type ToastProps = {
  toast: ToastType;
  onRemove: (id: string) => void;
};

const variantStyles = {
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

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const variant = toast.variant ?? 'info';
  const Icon = variantIcons[variant];

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={cn(
        `
          flex max-w-125 min-w-75 items-center gap-3 rounded-xl border px-4 py-3
          shadow-lg
        `,
        variantStyles[variant],
      )}
      style={{
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <Icon size={20} className="shrink-0" />
      <p className="flex-1 text-body-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
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
