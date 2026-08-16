import type { HTMLAttributes } from "react";
export function Notice({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["border-l border-foreground px-3 py-2 text-sm text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
