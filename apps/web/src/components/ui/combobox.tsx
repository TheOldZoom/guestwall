"use client";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import type { ComponentProps } from "react";
export const Combobox = ComboboxPrimitive.Root;
export function ComboboxInput({
  className = "",
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Input>) {
  return (
    <ComboboxPrimitive.Input
      className={[
        "w-full border border-border/40 bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function ComboboxPopup({
  className = "",
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return (
    <ComboboxPrimitive.Popup
      className={[
        "z-50 min-w-[var(--anchor-width)] border border-border bg-background p-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function ComboboxContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.List>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner sideOffset={6}>
        <ComboboxPopup>
          <ComboboxPrimitive.List
            className={["max-h-64 overflow-auto", className].filter(Boolean).join(" ")}
            {...props}
          >
            {children}
          </ComboboxPrimitive.List>
        </ComboboxPopup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}
export function ComboboxItem({
  className = "",
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Item>) {
  return (
    <ComboboxPrimitive.Item
      className={[
        "cursor-pointer px-2 py-1.5 text-sm text-muted outline-none transition-colors data-[highlighted]:bg-foreground data-[highlighted]:text-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
