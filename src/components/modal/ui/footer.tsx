import { cn } from '@/utils/cn';

import type { ModalFooterFC, ModalFooterProps } from '../modal.types';

export const ModalFooter: ModalFooterFC = (props: ModalFooterProps) => {
  const { children, start, end } = props;
  const endContent = end ?? children;

  return (
    <div
      className={cn(
        `
          flex shrink-0 items-center gap-3 border-t border-neutral-200
          bg-neutral-50 px-8 py-4
        `,
      )}
    >
      {start && (
        <div className="istok-modal__footer-start flex items-center gap-3">
          {start}
        </div>
      )}
      {endContent && (
        <div className="
          istok-modal__footer-end ml-auto flex items-center gap-3
        "
        >
          {endContent}
        </div>
      )}
    </div>
  );
};
