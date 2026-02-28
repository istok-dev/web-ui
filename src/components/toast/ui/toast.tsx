"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Toast as ToastType } from "../toast.types";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const variantStyles = {
  success: "bg-emerald-500 text-white border-emerald-600",
  error: "bg-red-500 text-white border-red-600",
  info: "bg-blue-500 text-white border-blue-600",
  warning: "bg-gold-500 text-olive-900 border-gold-600",
};

const variantIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const Icon = variantIcons[toast.variant || "info"];

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={twMerge(
        "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border min-w-[300px] max-w-[500px]",
        variantStyles[toast.variant || "info"]
      )}
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <Icon size={20} className="shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 hover:opacity-80 transition-opacity"
        aria-label="Закрыть"
      >
        <X size={18} />
      </button>
    </div>
  );
};

