import { X } from 'lucide-react';

import type { ModalHeaderFC, ModalHeaderProps } from '../modal.types';

export const ModalHeader: ModalHeaderFC = (props: ModalHeaderProps) => {
  const { title, children, onClose } = props;

  const renderTitle = () => {
    if (title) {
      return <h3 className="text-title-lg font-bold text-neutral-50">{title}</h3>;
    }
    return children;
  };

  return (
    <div className="
      flex items-center justify-between border-b border-neutral-200
      bg-neutral-900 px-6 py-5
    "
    >
      <div className="flex items-center gap-4">{renderTitle()}</div>
      <button
        onClick={onClose}
        className="
          cursor-pointer rounded-full p-2 text-neutral-400
          hover:bg-neutral-800 hover:text-neutral-50
        "
      >
        <X className="size-6" />
      </button>
    </div>
  );
};
