"use client";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import type { ComponentProps } from "react";
export const Fieldset = FieldsetPrimitive.Root;
export function FieldsetLegend({
  className = "",
  ...props
}: ComponentProps<typeof FieldsetPrimitive.Legend>) {
  return (
    <FieldsetPrimitive.Legend
      className={["mb-3 text-[10px] uppercase tracking-[0.25em] text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
