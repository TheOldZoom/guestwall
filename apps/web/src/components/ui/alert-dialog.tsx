"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type { ComponentProps } from "react";
import { Button, type ButtonProps } from "./button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogClose = AlertDialogPrimitive.Close;
export const AlertDialogTitle = AlertDialogPrimitive.Title;
export const AlertDialogDescription = AlertDialogPrimitive.Description;

export function AlertDialogContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Popup>) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-background/80" />
      <AlertDialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <AlertDialogPrimitive.Popup
          role="alertdialog"
          className={[
            "w-full max-w-md border border-border bg-background p-5 outline-none",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogFooter({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={["mt-5 flex items-center justify-end gap-2", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function AlertDialogAction({
  variant = "default",
  size = "sm",
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Close> & ButtonProps) {
  return (
    <AlertDialogPrimitive.Close render={<Button variant={variant} size={size} />} {...props} />
  );
}

export function AlertDialogCancel({
  variant = "outline",
  size = "sm",
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Close> & ButtonProps) {
  return (
    <AlertDialogPrimitive.Close render={<Button variant={variant} size={size} />} {...props} />
  );
}
