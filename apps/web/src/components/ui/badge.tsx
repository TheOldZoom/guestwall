import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "muted";
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.15em]",
        variant === "default" && "border-foreground bg-foreground text-background",
        variant === "outline" && "border-border/40 text-foreground",
        variant === "muted" && "border-border/40 text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
