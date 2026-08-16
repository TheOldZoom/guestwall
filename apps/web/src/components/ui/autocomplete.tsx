"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Search, X } from "lucide-react";
import type { ComponentProps } from "react";

export const Autocomplete = AutocompletePrimitive.Root;

export function AutocompleteInput({
  className = "",
  ...props
}: ComponentProps<typeof AutocompletePrimitive.Input>) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <AutocompletePrimitive.Input
        className={[
          "w-full border border-border/40 bg-transparent py-2 pl-8 pr-8 text-sm outline-none transition-colors",
          "hover:border-foreground/60",
          "focus:border-foreground focus-visible:ring-1 focus-visible:ring-foreground/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      <AutocompletePrimitive.Clear
        aria-label="Clear"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        <X className="size-3.5" aria-hidden="true" />
      </AutocompletePrimitive.Clear>
    </div>
  );
}

export function AutocompletePopup({
  className = "",
  ...props
}: ComponentProps<typeof AutocompletePrimitive.Popup>) {
  return (
    <AutocompletePrimitive.Popup
      className={[
        "z-50 min-w-(--anchor-width) border border-border bg-background p-1 shadow-lg shadow-background/50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function AutocompleteEmpty({
  className = "",
  children = "No results",
  ...props
}: ComponentProps<typeof AutocompletePrimitive.Empty>) {
  return (
    <AutocompletePrimitive.Empty
      className={["px-2 py-1.5 text-sm text-muted", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Empty>
  );
}

export function AutocompleteContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof AutocompletePrimitive.List>) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner sideOffset={6}>
        <AutocompletePopup>
          <AutocompleteEmpty />
          <AutocompletePrimitive.List
            className={["max-h-64 overflow-auto", className].filter(Boolean).join(" ")}
            {...props}
          >
            {children}
          </AutocompletePrimitive.List>
        </AutocompletePopup>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

export function AutocompleteItem({
  className = "",
  children,
  ...props
}: ComponentProps<typeof AutocompletePrimitive.Item>) {
  return (
    <AutocompletePrimitive.Item
      className={[
        "cursor-pointer px-2 py-1.5 text-sm text-muted outline-none transition-colors",
        "data-selected:text-foreground",
        "data-highlighted:bg-foreground data-highlighted:!text-background",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  );
}
