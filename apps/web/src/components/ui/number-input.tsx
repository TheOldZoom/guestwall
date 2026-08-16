"use client";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import type { ComponentProps } from "react";
export const NumberInput = NumberFieldPrimitive.Root;
export function NumberInputGroup({
  className = "",
  children,
  ...props
}: ComponentProps<typeof NumberFieldPrimitive.Group>) {
  return (
    <NumberFieldPrimitive.Group
      className={["flex border border-border/40 focus-within:border-foreground", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </NumberFieldPrimitive.Group>
  );
}
export function NumberInputField({
  className = "",
  ...props
}: ComponentProps<typeof NumberFieldPrimitive.Input>) {
  return (
    <NumberFieldPrimitive.Input
      className={["min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function NumberInputDecrement({
  className = "",
  children,
  ...props
}: ComponentProps<typeof NumberFieldPrimitive.Decrement>) {
  return (
    <NumberFieldPrimitive.Decrement
      className={[
        "border-r border-border/40 px-2 text-muted transition-colors hover:text-foreground disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ?? <Minus className="size-3.5" />}
    </NumberFieldPrimitive.Decrement>
  );
}
export function NumberInputIncrement({
  className = "",
  children,
  ...props
}: ComponentProps<typeof NumberFieldPrimitive.Increment>) {
  return (
    <NumberFieldPrimitive.Increment
      className={[
        "border-l border-border/40 px-2 text-muted transition-colors hover:text-foreground disabled:opacity-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ?? <Plus className="size-3.5" />}
    </NumberFieldPrimitive.Increment>
  );
}
