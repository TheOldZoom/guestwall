"use client";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import type { ComponentProps } from "react";
export interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  className?: string;
}
export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={[
        "flex size-4 items-center justify-center border border-border/40 text-background outline-none transition-colors duration-150 data-[checked]:border-foreground data-[checked]:bg-foreground focus-visible:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3" aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
