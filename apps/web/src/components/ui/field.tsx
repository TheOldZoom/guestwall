"use client";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import type { ComponentProps } from "react";
export const Field = FieldPrimitive.Root;
export function FieldLabel({
  className = "",
  ...props
}: ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Label
      className={["text-[10px] uppercase tracking-[0.25em] text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function FieldDescription({
  className = "",
  ...props
}: ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      className={["mt-1 text-xs text-muted", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function FieldError({
  className = "",
  ...props
}: ComponentProps<typeof FieldPrimitive.Error>) {
  return (
    <FieldPrimitive.Error
      className={["mt-1 text-xs text-foreground", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export const FieldControl = FieldPrimitive.Control;
