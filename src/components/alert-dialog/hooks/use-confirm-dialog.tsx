import { useRef, useState } from 'react';

import { AlertDialogProps } from '../alert-dialog.types';
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
        icon={options.icon}
        title={options.title}
        text={options.text}
        variant={options.variant}
        actionLabel={options.actionLabel}
        onAction={() => close(true)}
        cancelLabel="Отмена"
        onCancel={() => close(false)}
      />
    )
    : null;

  return { confirm, dialog };
};
