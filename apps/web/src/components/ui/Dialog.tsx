"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  maxWidth?: string;
  panelClassName?: string;
  zIndex?: string;
  children: ReactNode;
}

export function Dialog({
  open,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  maxWidth = "max-w-sm",
  panelClassName = "",
  zIndex = "z-50",
  children,
}: DialogProps) {
  const prevOverflow = useRef<string>("");

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow.current;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 ${zIndex} flex items-center justify-center bg-background/80 backdrop-blur-sm`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onClick={(e) => e.stopPropagation()}
        className={[
          "w-full mx-4 border border-border bg-background p-6",
          maxWidth,
          panelClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogCloseButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close dialog"
      className={[
        "px-3 py-1.5 text-sm border border-border/40 text-muted hover:border-foreground hover:text-foreground transition shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      ×
    </button>
  );
}
