import { ModalBodyFC } from "../modal.types";

export const ModalBody: ModalBodyFC = (props) => {
  const { children } = props;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-neutral-50">
      {children}
    </div>
  );
};
