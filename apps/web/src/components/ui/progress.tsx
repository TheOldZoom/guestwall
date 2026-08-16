"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type { ComponentProps } from "react";

export interface ProgressProps extends Omit<
  ComponentProps<typeof ProgressPrimitive.Root>,
  "className"
> {
  className?: string;
  trackClassName?: string;
  indicatorClassName?: string;
}

export function Progress({
  className = "",
  trackClassName = "",
  indicatorClassName = "",
  value,
  max = 100,
  ...props
}: ProgressProps) {
  const percentage =
    value === null
      ? undefined
      : Math.min(100, Math.max(0, ((value - (props.min ?? 0)) / (max - (props.min ?? 0))) * 100));

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      className={["block w-full", className].filter(Boolean).join(" ")}
      {...props}
    >
      <ProgressPrimitive.Track
        className={["block h-1 w-full overflow-hidden bg-border/40", trackClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <ProgressPrimitive.Indicator
          className={[
            "block h-full bg-foreground transition-[width] duration-150",
            value === null && "w-1/3 animate-pulse",
            indicatorClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={value === null ? undefined : { width: `${percentage}%` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}
