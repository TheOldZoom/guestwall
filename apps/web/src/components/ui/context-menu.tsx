"use client";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import type { ComponentProps } from "react";
export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export function ContextMenuContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Popup>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner>
        <ContextMenuPrimitive.Popup
          className={[
            "z-50 min-w-40 border border-border bg-background p-1 outline-none",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}
export function ContextMenuItem({
  className = "",
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Item>) {
  return (
    <ContextMenuPrimitive.Item
      className={[
        "flex w-full cursor-pointer items-center px-2 py-1.5 text-sm text-muted outline-none transition-colors data-[highlighted]:bg-foreground data-[highlighted]:text-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
