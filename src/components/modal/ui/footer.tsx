import type { ModalFooterFC, ModalFooterProps } from '../modal.types';

export const ModalFooter: ModalFooterFC = (props: ModalFooterProps) => {
  const { children } = props;

  return (
    <div className="
      flex shrink-0 items-center justify-end gap-3 border-t border-neutral-200
      bg-neutral-50 px-6 py-4
    "
    >
      {children}
    </div>
  );
};
