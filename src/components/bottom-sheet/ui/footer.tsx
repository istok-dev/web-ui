import { cn } from '@/utils/cn';

import type {
  BottomSheetFooterFC,
  BottomSheetFooterProps,
} from '../bottom-sheet.types';

export const BottomSheetFooter: BottomSheetFooterFC = (
  props: BottomSheetFooterProps,
) => {
  const { children, start, end } = props;
  const endContent = end ?? children;

  return (
    <div
      className={cn(
        `
          flex shrink-0 items-center gap-3 border-t border-neutral-200
          bg-neutral-50 px-5 py-4
        `,
      )}
    >
      {start && (
        <div className="flex items-center gap-3">{start}</div>
      )}
      {endContent && (
        <div className="ml-auto flex items-center gap-3">{endContent}</div>
      )}
    </div>
  );
};
