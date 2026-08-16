"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";

export const Select = SelectPrimitive.Root;

export function SelectTrigger({
  className = "",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={[
        "flex min-h-9 w-full items-center justify-between gap-2 border border-border/40 bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors",
        "hover:border-foreground/60",
        "focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground/40",
        "data-[popup-open]:border-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="text-muted data-[popup-open]:rotate-180">
        <ChevronDown className="size-4" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export const SelectValue = SelectPrimitive.Value;

export function SelectPopup({
  className = "",
  ...props
}: ComponentProps<typeof SelectPrimitive.Popup>) {
  return (
    <SelectPrimitive.Popup
      className={[
        "z-50 min-w-[var(--anchor-width)] border border-border bg-background p-1 shadow-lg shadow-background/50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function SelectContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.List>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner sideOffset={6}>
        <SelectPopup>
          <SelectPrimitive.List
            className={["max-h-64 overflow-auto", className].filter(Boolean).join(" ")}
            {...props}
          >
            {children}
          </SelectPrimitive.List>
        </SelectPopup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className = "",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={[
        "flex cursor-pointer items-center justify-between gap-3 px-2 py-1.5 text-sm text-muted outline-none transition-colors",
        "data-[selected]:text-foreground",
        "data-[highlighted]:bg-foreground data-[highlighted]:!text-background",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="text-current">
        <Check className="size-3.5" aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
