import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

import { ModalFC } from "../modal.types";
import { ModalBody } from "./body";
import { ModalHeader } from "./header";

export const Modal: ModalFC = (props) => {
  const { isOpen, onClose, children, className, classes, ...rest } = props;

  if (!isOpen) return null;

  const modalContent = (
    <div
      {...rest}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        className,
        classes?.root
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={cn("absolute inset-0 bg-neutral-900/80", classes?.backdrop)}
        onClick={() => {
          onClose();
        }}
      ></div>

      <div
        className={cn(
          "relative w-full max-w-5xl bg-neutral-50 rounded-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200",
          classes?.content
        )}
      >
        {children}
      </div>
    </div>
  );

  if (typeof window === "undefined") {
    return modalContent;
  }

  return createPortal(modalContent, document.body);
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
