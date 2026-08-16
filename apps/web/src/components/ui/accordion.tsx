"use client";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;
export const AccordionHeader = AccordionPrimitive.Header;
export function AccordionTrigger({
  className = "",
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      className={[
        "flex w-full items-center justify-between border-b border-border/40 py-3 text-left text-sm text-foreground outline-none transition-colors hover:text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 text-muted transition-transform data-[panel-open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  );
}
export function AccordionContent({
  className = "",
  ...props
}: ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      className={["border-b border-border/40 pb-4 text-sm text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
