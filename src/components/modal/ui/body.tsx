import type { ModalBodyFC, ModalBodyProps } from '../modal.types';

export const ModalBody: ModalBodyFC = (props: ModalBodyProps) => {
  const { children } = props;

  return (
    <div className="flex-1 scrollbar overflow-y-auto bg-neutral-50 px-8 py-6">
      {children}
    </div>
  );
};
