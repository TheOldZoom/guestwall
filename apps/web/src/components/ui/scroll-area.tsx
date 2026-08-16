"use client";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import type { ComponentProps } from "react";
export const ScrollArea = ScrollAreaPrimitive.Root;
export function ScrollAreaViewport({
  className = "",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport
      className={["h-full w-full", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function ScrollAreaScrollbar({
  className = "",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={["flex bg-border/40 p-px data-[orientation=vertical]:w-2", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="flex-1 bg-foreground" />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
