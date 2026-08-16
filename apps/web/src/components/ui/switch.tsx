"use client";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type { ComponentProps } from "react";
export interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root> {
  className?: string;
}
export function Switch({ className = "", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={[
        "flex h-5 w-9 items-center border border-border/40 p-px outline-none transition-colors duration-150 data-[checked]:border-foreground data-[checked]:bg-foreground focus-visible:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <SwitchPrimitive.Thumb className="size-3.5 bg-foreground transition-transform duration-150 data-[checked]:translate-x-4 data-[checked]:bg-background" />
    </SwitchPrimitive.Root>
  );
}
