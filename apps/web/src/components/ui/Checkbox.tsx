"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

export const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={[
        "h-4 w-4 shrink-0 rounded-none border border-border/40 bg-transparent text-foreground focus:ring-1 focus:ring-accent/60 outline-none transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";
