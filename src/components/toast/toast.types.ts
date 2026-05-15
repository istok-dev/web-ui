export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export type Toast = {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
};

export type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  removeToast: (id: string) => void;
};
