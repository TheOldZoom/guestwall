"use client";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import type { ComponentProps } from "react";
export const HoverCard = PreviewCardPrimitive.Root;
export const HoverCardTrigger = PreviewCardPrimitive.Trigger;
export function HoverCardContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof PreviewCardPrimitive.Popup>) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner sideOffset={6}>
        <PreviewCardPrimitive.Popup
          className={["z-50 w-72 border border-border bg-background p-4", className]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}
