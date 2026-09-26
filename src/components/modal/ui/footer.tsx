'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '@/utils/cn';

import type { ModalFooterFC, ModalFooterProps } from '../modal.types';

export const ModalFooter: ModalFooterFC = (props: ModalFooterProps) => {
  const { children, start, end, render, className, ...otherProps } = props;
  const endContent = end ?? children;

  const defaultProps: useRender.ElementProps<'div'> = {
    className: cn(
      `
        flex shrink-0 items-center gap-3 border-t border-neutral-200
        bg-neutral-50 px-8 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]
        tablet:pb-4
      `,
      className,
    ),
    children: (
      <>
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
      </>
    ),
  };

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(defaultProps, otherProps),
  });
};
