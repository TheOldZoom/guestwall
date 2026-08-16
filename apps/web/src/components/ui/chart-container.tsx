import type { HTMLAttributes } from "react";
export function ChartContainer({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="img"
      className={["border border-border/40 p-4 text-muted", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
