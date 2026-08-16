"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ComponentProps, ReactElement, ReactNode } from "react";

export interface TooltipProps extends Omit<
  ComponentProps<typeof TooltipPrimitive.Root>,
  "children"
> {
  children: ReactElement;
  content: ReactNode;
  side?: ComponentProps<typeof TooltipPrimitive.Positioner>["side"];
  align?: ComponentProps<typeof TooltipPrimitive.Positioner>["align"];
  className?: string;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  className = "",
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...props}>
      <TooltipPrimitive.Trigger render={children} />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner side={side} align={align} sideOffset={8}>
          <TooltipPrimitive.Popup
            role="tooltip"
            className={[
              "z-50 border border-border bg-background px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-foreground",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
