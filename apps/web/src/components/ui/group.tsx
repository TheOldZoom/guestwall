import type { HTMLAttributes } from "react";
export function Group({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["flex flex-wrap items-center gap-2", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
