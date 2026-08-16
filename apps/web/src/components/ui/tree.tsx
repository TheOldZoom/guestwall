"use client";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type { ComponentProps } from "react";
export function Tree({
  className = "",
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      className={["text-sm", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function TreeTrigger({
  className = "",
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      className={[
        "w-full px-2 py-1.5 text-left text-muted transition-colors hover:text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function TreeContent({
  className = "",
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel
      className={["ml-3 border-l border-border/40 pl-2", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
