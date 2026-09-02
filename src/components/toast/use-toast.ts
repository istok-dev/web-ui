'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import { useCallback } from 'react';

import type { Toast, ToastData, ToastVariant, UseToastReturn } from './toast.types';

export function useToast(): UseToastReturn {
  const { toasts, add, close } = BaseToast.useToastManager<ToastData>();

  const showToast = useCallback((
    message: string,
    variant: ToastVariant = 'info',
    duration = 3000,
  ) => {
    add({
      title: message,
      timeout: duration,
      data: { variant },
    });
  }, [add]);

  const removeToast = useCallback((id: string) => {
    close(id);
  }, [close]);

  const mappedToasts: Toast[] = toasts.map(toast => ({
    id: toast.id,
    message: typeof toast.title === 'string' ? toast.title : '',
    variant: toast.data?.variant,
    duration: toast.timeout,
  }));

  return { toasts: mappedToasts, showToast, removeToast };
}
