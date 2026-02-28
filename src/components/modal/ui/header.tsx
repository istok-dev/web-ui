import { X } from "lucide-react";

import { ModalHeaderFC } from "../modal.types";

export const ModalHeader: ModalHeaderFC = (props) => {
  const { title, children, onClose } = props;

  const renderTitle = () => {
    if (title) {
      return <h3 className="text-xl font-bold text-white">{title}</h3>;
    }
    return children;
  };

  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D8] bg-[#2F3E28]">
      <div className="flex items-center gap-4">{renderTitle()}</div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-[#3A4B32] rounded-full text-[#A3B19A] hover:text-white cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};
