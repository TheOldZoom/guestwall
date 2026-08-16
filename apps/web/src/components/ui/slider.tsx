"use client";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import type { ComponentProps } from "react";
export const Slider = SliderPrimitive.Root;
export function SliderControl({
  className = "",
  children,
  ...props
}: ComponentProps<typeof SliderPrimitive.Control>) {
  return (
    <SliderPrimitive.Control
      className={["relative flex h-5 w-full items-center", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </SliderPrimitive.Control>
  );
}
export function SliderTrack({
  className = "",
  children,
  ...props
}: ComponentProps<typeof SliderPrimitive.Track>) {
  return (
    <SliderPrimitive.Track
      className={["h-px w-full bg-border/40", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </SliderPrimitive.Track>
  );
}
export function SliderIndicator({
  className = "",
  ...props
}: ComponentProps<typeof SliderPrimitive.Indicator>) {
  return (
    <SliderPrimitive.Indicator
      className={["h-full bg-foreground", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function SliderThumb({
  className = "",
  ...props
}: ComponentProps<typeof SliderPrimitive.Thumb>) {
  return (
    <SliderPrimitive.Thumb
      className={[
        "size-3 border border-foreground bg-background outline-none focus:ring-1 focus:ring-accent/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
