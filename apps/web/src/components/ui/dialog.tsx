"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { Button, type ButtonProps } from "./button";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className = "",
  children,
  showClose = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Popup> & { showClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-background/80" />
      <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <DialogPrimitive.Popup
          role="dialog"
          className={[
            "relative w-full max-w-lg border border-border bg-background p-5 outline-none",
            "max-h-[calc(100vh-2rem)] overflow-y-auto",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {showClose && (
            <DialogPrimitive.Close
              aria-label="Close"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-3 border-transparent"
                />
              }
            >
              <X size={14} strokeWidth={1.25} aria-hidden="true" />
            </DialogPrimitive.Close>
          )}
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={["pr-6", className].filter(Boolean).join(" ")} {...props} />;
}

export function DialogFooter({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={["mt-5 flex items-center justify-end gap-2", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function DialogAction({
  variant = "default",
  size = "sm",
  ...props
}: ComponentProps<typeof DialogPrimitive.Close> & ButtonProps) {
  return <DialogPrimitive.Close render={<Button variant={variant} size={size} />} {...props} />;
}

export function DialogCancel({
  variant = "outline",
  size = "sm",
  ...props
}: ComponentProps<typeof DialogPrimitive.Close> & ButtonProps) {
  return <DialogPrimitive.Close render={<Button variant={variant} size={size} />} {...props} />;
}
