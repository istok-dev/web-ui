'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import type { FC, ReactNode } from 'react';

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => (
  <BaseToast.Provider limit={10} timeout={3000}>
    {children}
  </BaseToast.Provider>
);
