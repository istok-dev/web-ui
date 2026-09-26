'use client';

import { useRef, useState } from 'react';

import type { AlertDialogProps } from '../alert-dialog.types';
import { AlertDialog } from '../ui/alert-dialog';

export const useConfirmDialog = () => {
  const [options, setOptions] = useState<AlertDialogProps | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = (nextOptions: AlertDialogProps) => {
    setOptions(nextOptions);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const settle = (result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
  };

  const close = (result: boolean) => {
    settle(result);
    setOptions(null);
  };

  const dialog = options
    ? (
      <AlertDialog
        {...options}
        open
        onOpenChange={(open) => {
          options.onOpenChange?.(open);
          if (!open) {
            close(false);
          }
        }}
        onAction={async () => {
          // Диалог сам закроется после действия и вызовет onOpenChange(false).
          await options.onAction?.();
          settle(true);
        }}
        onCancel={() => {
          options.onCancel?.();
          close(false);
        }}
      />
    )
    : null;

  return { confirm, dialog };
};
