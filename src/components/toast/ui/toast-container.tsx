'use client';

import React from 'react';

import { Toast } from './toast';
import { useToast } from '../use-toast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="
      pointer-events-none fixed top-4 right-4 z-150 flex flex-col gap-3
    "
    >
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
};
