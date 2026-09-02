'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import type { FC } from 'react';

import type { ToastData } from '../toast.types';
import { ToastItem } from './toast';

export const ToastContainer: FC = () => {
  const { toasts } = BaseToast.useToastManager<ToastData>();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className="
        pointer-events-none fixed top-4 right-4 z-150 flex flex-col gap-3
      "
      >
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
};
