"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Check, Info, TriangleAlert, X } from "lucide-react";

type ToastVariant = "default" | "success" | "error" | "warning";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (options: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();

      const newToast: Toast = {
        id,
        duration: 4000,
        variant: "default",
        ...options,
      };

      setToasts((current) => [...current, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        window.setTimeout(() => {
          dismiss(id);
        }, newToast.duration);
      }
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }

  return context;
}

interface ToasterProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-0 z-[99999] flex items-end justify-center p-4 sm:items-end sm:justify-end"
    >
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </div>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const Icon =
    toast.variant === "success"
      ? Check
      : toast.variant === "error"
        ? TriangleAlert
        : toast.variant === "warning"
          ? TriangleAlert
          : Info;

  return (
    <div
      role="status"
      className={[
        "pointer-events-auto relative flex items-start gap-3 border bg-background p-4 shadow-lg",
        "animate-in fade-in slide-in-from-bottom-2",
        "border-border",
      ].join(" ")}
    >
      <Icon
        className={[
          "mt-0.5 size-4 shrink-0",
          toast.variant === "success" && "text-foreground",
          toast.variant === "error" && "text-destructive",
          toast.variant === "warning" && "text-muted",
          toast.variant === "default" && "text-muted",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        {toast.title && <p className="text-sm font-medium leading-none">{toast.title}</p>}

        {toast.description && (
          <p className={["text-sm text-muted", toast.title && "mt-1.5"].filter(Boolean).join(" ")}>
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-muted transition-colors hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
