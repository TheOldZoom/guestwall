"use client";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type { ComponentProps } from "react";
export const RadioGroup = RadioGroupPrimitive;
export function Radio({ className = "", ...props }: ComponentProps<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      className={[
        "flex size-4 items-center justify-center border border-border/40 outline-none transition-colors data-[checked]:border-foreground focus-visible:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <RadioPrimitive.Indicator className="size-2 bg-foreground" />
    </RadioPrimitive.Root>
  );
}
