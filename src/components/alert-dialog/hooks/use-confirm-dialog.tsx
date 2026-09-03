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

  const close = (result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setOptions(null);
  };

  const dialog = options
    ? (
      <AlertDialog
        open
        onOpenChange={(open) => {
          if (!open) {
            close(false);
          }
        }}
        {...options}
        onAction={() => close(true)}
        cancelLabel={options.cancelLabel ?? 'Отмена'}
        onCancel={() => close(false)}
      />
    )
    : null;

  return { confirm, dialog };
};
