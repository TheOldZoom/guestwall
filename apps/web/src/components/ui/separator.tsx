"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import type { ComponentProps } from "react";

export interface SeparatorProps extends ComponentProps<typeof SeparatorPrimitive> {
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  className = "",
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      className={[
        "shrink-0 bg-border/40",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
